import React from "react";
import { DiCode, DiTerminal, DiDatabase } from "react-icons/di";
import { FiLock, FiShield } from "react-icons/fi";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";

// Add CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes code-rain {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(100vh); opacity: 0; }
  }

  .code-line {
    position: absolute;
    color: #60A5FA;
    font-family: monospace;
    animation: code-rain 10s linear infinite;
    opacity: 0.2;
  }

  .floating-icon {
    animation: float 3s ease-in-out infinite;
  }
`;

const SignInPage = () => {
  React.useEffect(() => {
    // Add styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Blobs */}
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0">
          <div
            className="floating-icon absolute top-20 left-[15%] text-blue-400/30"
            style={{ animationDelay: "0s" }}
          >
            <DiCode size={40} />
          </div>
          <div
            className="floating-icon absolute top-40 right-[15%] text-purple-400/30"
            style={{ animationDelay: "1s" }}
          >
            <DiTerminal size={40} />
          </div>
          <div
            className="floating-icon absolute bottom-40 left-[20%] text-blue-400/30"
            style={{ animationDelay: "1.5s" }}
          >
            <DiDatabase size={40} />
          </div>
          <div
            className="floating-icon absolute top-60 right-[25%] text-purple-400/30"
            style={{ animationDelay: "0.5s" }}
          >
            <FiLock size={40} />
          </div>
          <div
            className="floating-icon absolute bottom-60 left-[30%] text-blue-400/30"
            style={{ animationDelay: "2s" }}
          >
            <FiShield size={40} />
          </div>
        </div>

        {/* Code Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="code-rain">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="code-line"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {"{}"} &lt;/&gt; $_
              </div>
            ))}
          </div>
        </div>

        {/* Animated lines */}
        <div className="absolute top-10 left-0 w-full h-full">
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-1/4 right-0"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right top-2/4"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-3/4 right-0"></div>
        </div>
      </div>

      <SignIn />
    </div>
  );
};

export default SignInPage;
