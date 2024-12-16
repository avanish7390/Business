import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 py-10">
      <div className="max-w-4xl mx-auto p-5 bg-white rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 pt-28">
          <Link
            to='/'
            className="text-xl font-semibold text-center block text-gray-800 mb-6"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">Get Biz</span>
          </Link>
          <p className="text-gray-600 text-sm md:text-base">
            We are a team of professionals dedicated to providing the best services. Our mission is to connect you with the best businesses in your area. Sign up now to join us!
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Your Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Username" className="text-gray-700" />
              <TextInput
                type="text"
                id="username"
                placeholder="Choose a username"
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" className="text-gray-700" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" value="Password" className="text-gray-700" />
              <TextInput
                type="password"
                id="password"
                placeholder="Create a password"
                onChange={handleChange}
                className="mt-2"
                required
              />
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
              type="submit" 
              pill 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </Button>

            <OAuth />

            <div className="flex justify-center items-center gap-2 text-sm mt-4">
              <span className="text-gray-600">Already have an account?</span>
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </div>
          </form>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
