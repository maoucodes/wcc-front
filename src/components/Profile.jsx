import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success && response.data.data) {
          setUserData(response.data.data);
          setError(null);
        } else {
          setError(response.data.message || 'No data received from server');
        }
      } catch (error) {
        console.error("Error details:", error.response?.data || error);
        
        if (error.response?.data?.error === 'Token expired') {
          localStorage.removeItem("token");
          navigate("/signin");
        } else if (error.response?.status === 401) {
          setError('Session expired. Please sign in again.');
          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }, 2000);
        } else {
          setError(error.response?.data?.message || 'Failed to fetch user data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const navigationCards = [
    {
      title: "Events",
      description: "Explore and participate in upcoming college events",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: "/events"
    },
    {
      title: "Library",
      description: "Access study materials and resources",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      link: "/library"
    },
    {
      title: "Blogs",
      description: "Read and share knowledge with the community",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
        </svg>
      ),
      link: "/blogs"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>No user data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen y-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Profile Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 text-white shadow-xl">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-5xl font-bold shadow-lg ring-4 ring-white/10">
              {userData.username?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {userData.name}
              </h1>
              <p className="text-blue-300 text-lg">
                {userData.email}
              </p>
              <p className="text-gray-400 mt-1">
                @{userData.username}
              </p>
            </div>
          </div>

          {/* Academic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg">
              <h3 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Year
              </h3>
              <p className="text-xl font-semibold">{userData.year}</p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg">
              <h3 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Class
              </h3>
              <p className="text-xl font-semibold">{userData.class}</p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg">
              <h3 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Branch
              </h3>
              <p className="text-xl font-semibold">{userData.branch}</p>
            </div>
          </div>

          {/* Contact & Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg">
              <h3 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Mobile
              </h3>
              <p className="text-xl font-semibold">{userData.mobile}</p>
            </div>
            <div className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg">
              <h3 className="text-blue-300 text-sm font-medium mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Role
              </h3>
              <p className="text-xl font-semibold capitalize">{userData.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {navigationCards.map((card, index) => (
              <Link 
                key={index}
                to={card.link}
                className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl p-4 backdrop-blur-sm shadow-lg group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-all duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-blue-300/80">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
