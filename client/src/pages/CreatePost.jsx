import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'uncategorized',
    phoneNumber: '',
    address: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    image: '',
  });
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    try {
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        () => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      navigate(`/post/${data.slug}`);
    } catch {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Title"
          required
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <Select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="uncategorized">Select a category</option>
          <option value="Retail">Retail</option>
          <option value="Services">Services</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
        </Select>
        <TextInput
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          required
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          required
          onChange={handleInputChange}
        />
        <TextInput
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          required
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          placeholder="State"
          name="state"
          value={formData.state}
          required
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          placeholder="City"
          name="city"
          value={formData.city}
          required
          onChange={handleInputChange}
        />
        <TextInput
          type="text"
          placeholder="Pincode"
          name="pincode"
          value={formData.pincode}
          required
          onChange={handleInputChange}
        />
        <FileInput
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          onClick={handleUploadImage}
          disabled={!!imageUploadProgress}
        >
          {imageUploadProgress ? (
            <CircularProgressbar
              value={imageUploadProgress}
              text={`${imageUploadProgress || 0}%`}
            />
          ) : (
            'Upload Image'
          )}
        </Button>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="uploaded"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          required
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
