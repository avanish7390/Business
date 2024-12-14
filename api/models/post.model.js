import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,10}$/.test(v); // Validate international phone number format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@gmail\.com$/.test(v); // Ensures email ends with @gmail.com
        },
        message: (props) => `${props.value} is not a valid Gmail address! Email must be in the format example@gmail.com`,
      },
    },
    
    state: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    pincode: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[1-9][0-9]{5}$/.test(v); // Indian pincode validation (6 digits)
        },
        message: (props) => `${props.value} please enter valid pincode!`,
      },
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
