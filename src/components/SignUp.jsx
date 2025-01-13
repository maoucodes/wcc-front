import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLock, FiMail, FiUser, FiPhone } from "react-icons/fi";
import { register } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react"; // useEffect was missing

// Logger utility
const logger = {
  info: (message, data) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
    // You can integrate with error tracking services here
    // e.g., Sentry, LogRocket, etc.
  },
  warning: (message, data) => {
    console.warn(`[WARNING] ${message}`, data);
  }
};

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    year: "",
    class: "",
    branch: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "mobile") {
      const value = e.target.value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, mobile: value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    logger.info('Form field updated', { field: e.target.name });
  };

  const loadRazorpay = () => {
    logger.info('Loading Razorpay SDK');
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
      script.onload = () => {
        logger.info('Razorpay SDK loaded successfully');
        resolve(true);
      };
      
      script.onerror = () => {
        logger.error('Failed to load Razorpay SDK');
        resolve(false);
      };
      
      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (response, userData) => {
    logger.info('Payment success callback initiated', { paymentId: response?.razorpay_payment_id });
    
    try {
      if (!response || !response.razorpay_payment_id) {
        throw new Error("Invalid payment response");
      }

      if (!userData) {
        throw new Error("No user data found");
      }

      // Add payment details to user data
      const userDataWithPayment = {
        ...userData,
        paymentId: response.razorpay_payment_id,
        paymentTimestamp: new Date().toISOString()
      };

      logger.info('Attempting user registration with payment details', {
        paymentId: response.razorpay_payment_id,
        email: userData.email
      });

      // Register user after successful payment
      const data = await register(userDataWithPayment);
      
      if (!data || !data.user) {
        throw new Error("Invalid registration response");
      }

      logger.info('User registration successful', { userId: data.user.id });

      // Update user context
      updateUser(data.user);
      
      // Ensure Razorpay modal is closed
      if (window.Razorpay && window.Razorpay.close) {
        window.Razorpay.close();
        logger.info('Razorpay modal closed');
      }

      // Show success overlay and redirect
      setShowSuccessOverlay(true);
      setTimeout(() => {
        setShowSuccessOverlay(false);
        navigate("/signin");
      }, 2000);

    } catch (error) {
      logger.error('Error in payment success handler:', error);
      setError("Failed to complete registration. Please try again.");
      
      // Ensure modal is closed even on error
      if (window.Razorpay && window.Razorpay.close) {
        window.Razorpay.close();
      }
    } finally {
      setIsLoading(false);
      setPaymentInitiated(false);
    }
  };

  const handlePayment = async (userData) => {
    logger.info('Initiating payment process', { email: userData.email });
    
    try {
      const res = await loadRazorpay();

      if (!res) {
        throw new Error('Razorpay SDK failed to load');
      }

      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        throw new Error('Razorpay key not found');
      }

      setPaymentInitiated(true);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: "500",
        currency: "INR",
        name: "WeCodeCrunchers",
        description: "Community Membership Registration",
        image: "your_logo_url",
        handler: function (response) {
          handlePaymentSuccess(response, userData);
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.mobile ? `+91${userData.mobile}` : '',
        },
        theme: {
          color: "#3B82F6"
        },
        modal: {
          ondismiss: function() {
            logger.info('Payment modal dismissed');
            setIsLoading(false);
            setPaymentInitiated(false);
            setError("Payment cancelled. Please try again.");
            // Ensure modal is closed
            if (window.Razorpay && window.Razorpay.close) {
              window.Razorpay.close();
            }
          },
          escape: true,
          animation: true
        }
      };

      logger.info('Creating Razorpay instance');
      const paymentObject = new window.Razorpay(options);
      
      // Add event listeners for payment flow
      paymentObject.on('payment.failed', function(response) {
        logger.error('Payment failed', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
        setPaymentInitiated(false);
      });

      // Open payment modal
      paymentObject.open();
      logger.info('Payment modal opened');

    } catch (error) {
      logger.error('Error in payment initialization:', error);
      setError(error.message || "Failed to initialize payment. Please try again.");
      setIsLoading(false);
      setPaymentInitiated(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    logger.info('Form submission initiated');

    if (paymentInitiated) {
      logger.warning('Payment already in progress');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Validation checks
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Validate mobile number
      if (formData.mobile.length !== 10) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }

      logger.info('Form validation passed, initiating payment');
      await handlePayment(formData);

    } catch (error) {
      logger.error('Form submission error:', error);
      setError(error.message || "Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  // Payment timeout handler
  useEffect(() => {
    let timeoutId;
    
    if (paymentInitiated) {
      timeoutId = setTimeout(() => {
        if (paymentInitiated) {
          logger.warning('Payment timeout reached');
          setPaymentInitiated(false);
          setIsLoading(false);
          setError("Payment timeout. Please try again.");
          
          // Attempt to close Razorpay modal
          if (window.Razorpay && window.Razorpay.close) {
            window.Razorpay.close();
          }
        }
      }, 300000); // 5 minute timeout
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [paymentInitiated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[85%] sm:w-full max-w-md relative">
        <div className="relative bg-gray-900/50 backdrop-blur-xl p-6 sm:p-10 -mt-20 rounded-2xl shadow-2xl ring-1 ring-white/10 transform transition-all duration-300 hover:ring-white/20">
          <div className="mb-4 text-center space-y-4">
            <h2 className="text-xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <p className="text-xs sm:text-sm text-gray-400">Join Community</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg animate-shake">
              <p className="text-red-400 text-xs sm:text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
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

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
            <div className="space-y-3 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      minLength="3"
                      className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                      placeholder="Unique username"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                      placeholder="Your name"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                      placeholder="Email address"
                      autoComplete="on"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <span className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-xs sm:text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="w-full pl-16 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                    placeholder="Enter 10-digit number"
                    autoComplete="on"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Class</label>
                  <select
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <option value="">Select Class</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Branch</label>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    required
                    className="w-full py-2 px-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-gray-400 text-xs sm:text-sm">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>

        {showSuccessOverlay && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-gray-900/90 p-6 rounded-2xl shadow-2xl ring-1 ring-white/10 max-w-md w-[90%] relative">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-md"></div>
                  <div className="relative bg-gray-900 rounded-full p-3">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 text-center mt-2">
                Registration Successful!
              </h3>
              <p className="text-gray-300 text-sm mb-6 text-center">
                Your account has been created successfully. Redirecting to login page...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
