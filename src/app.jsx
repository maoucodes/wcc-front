import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/homepage";
import ProjectsPage from "./pages/projects";
import EventsPage from "./pages/events";
import CommunityPage from "./pages/community";
import ResourcesPage from "./pages/resources";
import LibraryPage from "./pages/library";
import BlogsPage from "./pages/blogs";
import SignInPage from "./pages/signin";
import JoinCommunity from "./pages/joinCommunity";
import SignUpPage from "./pages/signup";
// import LeaderboardPage from "./pages/leaderboard";
// import AdminPage from "./pages/admin/admin";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfilePage from "./pages/userProfile";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/joincommunity" element={<JoinCommunity />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            /> */}
            {/* <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
