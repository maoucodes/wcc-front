import { useState, useEffect } from "react";
import {
  FiUsers,
  FiBook,
  FiCalendar,
  FiAward,
  FiHome,
  FiEdit,
  FiSettings,
  FiLogOut,
  FiUserPlus,
  FiLogIn,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";
import { FaFileSignature } from "react-icons/fa";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    if (!user && path !== "/" && path !== "/signin" && path !== "/signup") {
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    // if you want to change the width of the navbar then change the padding of below line
    <div className="sticky top-3 z-50 max-w-[1480px] mx-auto w-full px-2">
      <nav
        className={`bg-black/20 backdrop-blur-lg rounded-xl transition-all duration-300 border border-white/10 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img
                    src={Logo}
                    alt="WCC Logo"
                    className="h-7 sm:h-10 w-auto transition-all duration-300 hover:scale-110 hover:rotate-6 animate-float"
                  />
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  onClick={handleNavigation("/")}
                  className="flex items-center text-white hover:text-blue-400 transition-colors"
                >
                  <FiHome className="mr-1" /> Home
                </Link>
                <Link
                  to="/events"
                  onClick={handleNavigation("/events")}
                  className="flex items-center text-white hover:text-blue-400 transition-colors"
                >
                  <FiCalendar className="mr-1" /> Events
                </Link>
                <Link
                  to="/library"
                  onClick={handleNavigation("/library")}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FiBook className="mr-1" /> Library
                </Link>
                <Link
                  to="/blogs"
                  onClick={handleNavigation("/blogs")}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FiEdit className="mr-1" /> Blogs
                </Link>
                <Link
                  to="/community"
                  onClick={handleNavigation("/community")}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FiUsers className="mr-1" /> Community
                </Link>
                {/* <Link
                  to="/leaderboard"
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                >
                  <FiAward className="mr-1" /> Leaderboard
                </Link> */}

                <div className="flex items-center space-x-4">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md"
                      >
                        <FiUsers className="mr-1" /> Profile
                      </Link>
                      {/* {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center text-gray-300 hover:text-purple-400 transition-colors px-3 py-2 rounded-md"
                        >
                          <FiSettings className="mr-1" />
                          Admin
                        </Link>
                      )} */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-white bg-red-500 hover:bg-red-600 transition-colors px-3 py-1 rounded-md"
                      >
                        <FiLogOut className="mr-1" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors px-3 py-2 rounded-md"
                      >
                        <FiLogIn className="mr-1" />
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        <FiUserPlus className="mr-1" />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="hidden md:block"></div> */}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6 transform transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-x-0 top-16 z-30 transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="-mx-1 p-2">
            <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-lg ring-1 ring-white/10 overflow-hidden">
              <div className="relative px-3 py-4 space-y-1 text-xs">
                <Link
                  to="/"
                  onClick={handleNavigation("/")}
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiHome className="mr-3 w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                  <span className="font-medium">Home</span>
                </Link>

                <Link
                  to="/events"
                  onClick={handleNavigation("/events")}
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiCalendar className="mr-3 w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  <span className="font-medium">Events</span>
                </Link>

                <Link
                  to="/library"
                  onClick={handleNavigation("/library")}
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiBook className="mr-3 w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
                  <span className="font-medium">Library</span>
                </Link>

                <Link
                  to="/blogs"
                  onClick={handleNavigation("/blogs")}
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiEdit className="mr-3 w-5 h-5 text-pink-400 group-hover:text-pink-300" />
                  <span className="font-medium">Blogs</span>
                </Link>

                <Link
                  to="/community"
                  onClick={handleNavigation("/community")}
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiUsers className="mr-3 w-5 h-5 text-green-400 group-hover:text-green-300" />
                  <span className="font-medium">Community</span>
                </Link>

                {/* <Link
                  to="/leaderboard"
                  className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FiAward className="mr-3 w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
                  <span className="font-medium">Leaderboard</span>
                </Link> */}

                {/* Divider */}
                <div className="my-4 border-t p-2 border-white/10"></div>

                {/* Conditionally render Sign In/Profile link for mobile */}
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <FiUsers className="mr-3 w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    {/* {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200"
                      >
                        <FiSettings className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    )} */}
                    <button
                      onClick={handleLogout}
                      className="group flex items-center px-4 py-3 rounded-xl text-white hover:bg-white/10 transition-all duration-200 w-full text-left"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 w-5 h-5 text-red-400 group-hover:text-red-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signin"
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <style>{`
        @keyframes float {
          0% {
            transform: translateX(3px);
          }
          50% {
            transform: translateY(-1px);
          }
          100% {
            transform: translateX(3px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        // .animate-float:hover {
        //   animation: none;
        //   filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
        // }
      `}</style>
    </div>
  );
};

export default Navbar;
