import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FiLock, FiMail } from "react-icons/fi";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordResetPopup, setShowPasswordResetPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const data = await login(email, password);
      if (data && data.user) {
        updateUser(data.user);
        navigate(location.state?.from || "/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordResetClick = () => {
    setShowPasswordResetPopup(true);
  };

  const handlePasswordReset = async () => {
    try {
      // Add your password reset logic here
      setShowPasswordResetPopup(false);
      setError("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[85%] sm:w-full max-w-md relative">
        <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 sm:p-10 -mt-36 rounded-2xl shadow-2xl ring-1 ring-white/10 transform transition-all duration-300 hover:ring-white/20">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md"></div>
            </div>
          </div>

          <div className="mb-4 text-center space-y-2">
            <h2 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Sign in to continue your journey
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-shake">
              <p className="text-red-400 text-xs sm:text-sm flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-4">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                    autoComplete="off"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-3 w-3 sm:h-4 sm:w-4 rounded border-gray-700 bg-gray-800/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="remember-me" className="ml-2 text-gray-300">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={handlePasswordResetClick}
                className="text-blue-400 hover:text-pink-400 transition-colors duration-200"
              >
                Reset password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-400 text-xs sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {showPasswordResetPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-gray-900/90 p-6 rounded-2xl shadow-2xl ring-1 ring-white/10 max-w-md w-[90%] relative">
            <h3 className="text-xl font-bold text-white mb-4 text-center mt-2">
              Reset Your Password
            </h3>
            <p className="text-gray-300 text-sm mb-6 text-center">
              Please enter your email address to receive a password reset link.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg bg-gray-800 text-white"
            />
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={handlePasswordReset}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors duration-200"
              >
                Send Link
              </button>
              <button
                onClick={() => setShowPasswordResetPopup(false)}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
