import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill in all fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
            Join our community of professionals dedicated to offering the best services. Sign in to discover top-rated businesses in your area!
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                placeholder="*********"
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
                'Sign In'
              )}
            </Button>

            <OAuth />

            <div className="flex justify-center items-center gap-2 text-sm mt-4">
              <span className="text-gray-600">Don't have an account?</span>
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
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
