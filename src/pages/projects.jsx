import React from 'react';
import Navbar from '../components/Navbar';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Community Chat App",
      description: "A real-time chat application built with React and Firebase.",
      status: "In Progress",
      tech: ["React", "Firebase", "Tailwind CSS"],
      contributors: 4,
      openRoles: ["Frontend Developer", "UI Designer"],
    },
    {
      id: 2,
      title: "Code Learning Platform",
      description: "Interactive platform for learning programming through hands-on exercises.",
      status: "Planning",
      tech: ["Next.js", "Node.js", "MongoDB"],
      contributors: 2,
      openRoles: ["Backend Developer", "Content Writer"],
    },
    {
      id: 3,
      title: "Developer Portfolio Generator",
      description: "Tool to create beautiful developer portfolios with minimal setup.",
      status: "Active",
      tech: ["Vue.js", "Express", "PostgreSQL"],
      contributors: 3,
      openRoles: ["Full Stack Developer"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">Community Projects</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
            Start New Project
          </button>
        </div>

        {/* Project Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            All Projects
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Active
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            In Progress
          </button>
          <button className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
            Planning
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white/5 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, index) => (
                  <span key={index} className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Contributors and Roles */}
              <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  {project.contributors} Contributors
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {project.openRoles.length} Open Roles
                </div>
              </div>

              {/* Open Roles */}
              <div className="space-y-2">
                {project.openRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                    <span className="text-gray-300">{role}</span>
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm">
                      Apply →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
