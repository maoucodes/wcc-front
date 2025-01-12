import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const EventsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-white mt-4">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const upcomingEvents = [
    {
      id: 1,
      title: "Web Development Workshop",
      date: "Jan 16",
      time: "2:00 PM - 4:00 PM",
      description:
        "Learn the fundamentals of modern web development with our expert instructors.",
      type: "Workshop",
      skillLevel: "Beginner",
      capacity: "60 seats",
    },
    {
      id: 2,
      title: "AI Seminar",
      date: "Jan 20",
      time: "9:00 AM - 2:00 PM",
      description:
        "Join us for a discussion on the future of Artificial Intelligence.",
      type: "Competition",
      skillLevel: "All Levels",
      capacity: "60 seats",
    },
    {
      id: 3,
      title: "React Advanced Patterns",
      date: "Jan 22",
      time: "3:00 PM - 5:00 PM",
      description: "Deep dive into advanced React patterns and best practices.",
      type: "Workshop",
      skillLevel: "Advanced",
      capacity: "25 seats",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
          Upcoming Events
        </h1>
        <hr className="border-white/10 mb-4" />

        <p className="text-xs sm:text-xl text-white mb-8 text-center underline">
          Dates can be tentative
        </p>

        {/* Event Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <button className="text-xs sm:text-lg px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            All Events
          </button>
          <button className="text-xs sm:text-lg px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Workshops
          </button>
          <button className="text-xs sm:text-lg px-5 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Hackathons
          </button>
          {/* <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Meetups
          </button> */}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 text-white p-3 rounded-lg text-center min-w-[80px]">
                  <div className="text-xl sm:text-2xl font-bold">
                    {event.date.split(" ")[1]}
                  </div>
                  <div className="text-sm sm:text-xl">
                    {event.date.split(" ")[0]}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-300 mb-4">
                    {event.description}
                  </p>
                  {/* <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                      {event.type}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                      {event.skillLevel}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                      {event.capacity}
                    </span>
                  </div> */}
                  <div className="flex items-center text-gray-400 text-xs sm:text-base">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {event.time}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-sm sm:text-base w-full px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all">
                  Register Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="fixed inset-0 overflow-hidden pointer-events-none"> */}
      {/* Full-screen blue background */}
      {/* <div className="fixed w-full h-full bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div> */}

      {/* Full-screen purple background */}
      {/* <div className="fixed w-full h-full bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow"></div> */}

      {/* Animated lines */}
      {/* <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right"></div>
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-1/4"></div>
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right top-2/4"></div>
          <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-3/4"></div>
        </div>
      </div> */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>

        {/* Animated lines */}
        <div className="absolute top-10 left-0 w-full h-full">
          {/* <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-1/4 right-0"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right top-2/4"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-3/4 right-0"></div> */}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
