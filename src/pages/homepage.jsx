import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/logo.png";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiUsers,
  FiBook,
  FiCalendar,
  FiTrendingUp,
  FiAward,
  FiCommand,
  FiCpu,
  FiDatabase,
  FiGithub,
  FiHardDrive,
  FiLayers,
} from "react-icons/fi";
import { FiTerminal, FiZap } from "react-icons/fi";
// import {
//   DiReact,
//   DiPython,
//   DiJavascript1,
//   DiCss3,
//   DiHtml5,
//   DiGit,
// } from "react-icons/di";
import {
  DiReact,
  DiPython,
  DiJavascript1,
  DiCss3,
  DiHtml5,
  DiGit,
  DiNodejs,
  DiMongodb,
  DiJava,
  DiFirebase,
  DiTerminal,
} from "react-icons/di";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
// import { span } from "framer-motion/client";
// import { getDatabase, ref, get } from "firebase/database";
// import app from "../firebase";


// Add PropTypes for CodeParticle
// const CodeParticle = ({ text, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: -20 }}
//     animate={{
//       opacity: [0, 1, 0],
//       y: [0, -100],
//       x: [0, Math.random() * 100 - 50]
//     }}
//     transition={{
//       duration: 5,
//       delay: delay,
//       repeat: Infinity,
//       ease: "linear"
//     }}
//     className="absolute text-blue-400/20 font-mono text-sm pointer-events-none"
//   >
//     {text}
//   </motion.div>
// );

// // Add code particles array
// const codeParticles = [
//   "<div>", "const", "let", "function", "{}", "=>", "return", "async",
//   "import", "export", "class", "extends", "interface", "type", "npm",
//   "git", "push", "pull", "merge", "commit"
// ];




const FloatingIcon = ({ Icon, delay, duration, top, left, right, bottom }) => (
  <div
    className={`absolute text-blue-400/40 hover:text-blue-400/80 transform hover:scale-125 cursor-pointer transition-all duration-300`}
    style={{
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      top,
      left,
      right,
      bottom,
      filter: "drop-shadow(0 0 8px rgba(96, 165, 250, 0.3))",
    }}
  >
    <Icon size={40} />
  </div>
);

// Add new animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Add this new component for the floating code snippets
const CodeSnippet = ({ code, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 0.7, x: 0 } : { opacity: 0, x: -50 }} transition={{ duration: 0.5, delay }} className="absolute hidden lg:block">
      <pre className="text-sm text-blue-400/70 font-mono">{code}</pre>
    </motion.div>
  );
};

CodeSnippet.propTypes = {
  code: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
};

FloatingIcon.propTypes = {
  Icon: PropTypes.elementType.isRequired,
  delay: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
};

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

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .code-line {
    position: absolute;
    color: #60A5FA;
    font-family: monospace;
    animation: code-rain 10s linear infinite;
    opacity: 0.2;
  }

  .tech-circle {
    position: absolute;
    width: 240px;
    height: 240px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: rotate 20s linear infinite;
  }

  .tech-icon {
    position: absolute;
    width: 40px;
    height: 40px;
    transform-origin: center;
    transition: all 0.3s ease;
  }

  .tech-icon:hover {
    transform: scale(1.2);
    color: #60A5FA;
  }

  .text-violet-300 {
    color: #8b5cf6; /* Replace with the actual color code for text-violet-300 */
  }

  @keyframes wobble {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
  }

  .animate-wobble {
    animation: wobble 1s infinite;
  }
`;

const MainPage = () => {
  const [greeting, setGreeting] = useState("Good Morning");
  const [userName, setUserName] = useState("Coders");
  const typedRef = useRef(null);

  // Function to fetch user data
  // const fetchUserData = () => {
  //   const userId = localStorage.getItem("userId");
  //   if (userId) {
  //     const db = getDatabase(app);
  //     const userRef = ref(db, "users/" + userId);
  //     get(userRef)
  //       .then((snapshot) => {
  //         if (snapshot.exists()) {
  //           const userData = snapshot.val();
  //           setUserName(userData.name || "Coder");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   } else {
  //     setUserName("Coders");
  //   }
  // };

  // Add scroll animations for sections
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    // Add styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Update greeting based on time
  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning");
      } else if (hour >= 12 && hour < 17) {
        setGreeting("Good Afternoon");
      } else if (hour >= 17 && hour < 22) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };

    // Update greeting immediately and then every minute
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Listen for login status changes
  // useEffect(() => {
  //   // Initial fetch
  //   fetchUserData();

  //   // Setup storage event listener
  //   const handleStorageChange = (e) => {
  //     if (e.key === "userId") {
  //       fetchUserData();
  //     }
  //   };

  //   // Listen for storage changes (login/logout)
  //   window.addEventListener("storage", handleStorageChange);

  //   // Custom event for immediate updates
  //   window.addEventListener("userLogin", fetchUserData);
  //   window.addEventListener("userLogout", fetchUserData);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     window.removeEventListener("userLogin", fetchUserData);
  //     window.removeEventListener("userLogout", fetchUserData);
  //   };
  // }, []);

  // Add new animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Add this new component for the floating code snippets
  const CodeSnippet = ({ code, delay }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 0.7, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5, delay }}
        className="absolute hidden lg:block"
      >
        <pre className="text-sm text-blue-400/70 font-mono">
          {code}
        </pre>
      </motion.div>
    );
  };

  CodeSnippet.propTypes = {
    code: PropTypes.string.isRequired,
    delay: PropTypes.number
  };

  // Add this component for animated tech stack
  const TechStackIcon = ({ Icon, name, delay }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5, delay }}
        className="flex flex-col items-center justify-center p-4"
      >
        <Icon className="w-8 h-8 text-blue-400 mb-2" />
        <span className="text-xs text-gray-400">{name}</span>
      </motion.div>
    );
  };

  TechStackIcon.propTypes = {
    Icon: PropTypes.elementType.isRequired,
    name: PropTypes.string.isRequired,
    delay: PropTypes.number
  };



  // const BinaryRain = () => {
  //   return (
  //     <div className="fixed inset-0 pointer-events-none opacity-10">
  //       {Array.from({ length: 50 }).map((_, i) => (
  //         <motion.div
  //           key={i}
  //           initial={{ y: -100, x: Math.random() * window.innerWidth }}
  //           animate={{ y: window.innerHeight + 100 }}
  //           transition={{
  //             duration: Math.random() * 3 + 2,
  //             repeat: Infinity,
  //             ease: "linear"
  //           }}
  //           className="absolute text-blue-500/50 font-mono text-sm"
  //         >
  //           {Math.random() > 0.5 ? "1" : "0"}
  //         </motion.div>
  //       ))}
  //     </div>
  //   );
  // };

  // Add a new component for code editor effect
  // const CodeEditorEffect = () => {
  //   const [text, setText] = useState("");
  //   const lines = ["function joinCommunity() {", "  const passion = &apos;coding&apos;", "  const goal = &apos;growth&apos;", "  const community = &apos;WeCodeCrunchers&apos;", "  ", "  return {", "    learn: true,", "    collaborate: true,", "    grow: true", "  };", "}"];

  //   useEffect(() => {
  //     let currentLine = 0;
  //     let currentChar = 0;

  //     const interval = setInterval(() => {
  //       if (currentLine >= lines.length) {
  //         clearInterval(interval);
  //         return;
  //       }

  //       if (currentChar >= lines[currentLine].length) {
  //         setText((prev) => prev + "\n");
  //         currentLine++;
  //         currentChar = 0;
  //         return;
  //       }

  //       setText((prev) => prev + lines[currentLine][currentChar]);
  //       currentChar++;
  //     }, 50);

  //     return () => clearInterval(interval);
  //   }, []);

  //   return (
  //     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-black/40 backdrop-blur-sm rounded-lg p-4 font-mono text-sm">
  //       <div className="flex items-center mb-2 border-b border-gray-700 pb-2">
  //         <div className="flex space-x-2">
  //           <div className="w-3 h-3 rounded-full bg-red-500"></div>
  //           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
  //           <div className="w-3 h-3 rounded-full bg-green-500"></div>
  //         </div>
  //         <span className="ml-2 text-gray-400 text-xs">code.js</span>
  //       </div>
  //       <pre className="text-green-400 whitespace-pre-wrap">{text}</pre>
  //     </motion.div>
  //   );
  // };


  // Add this component for matrix rain effect
  // const MatrixRain = () => {
  //   const canvasRef = useRef(null);

  //   useEffect(() => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext('2d');
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;

  //     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}/*-+~#@";
  //     const fontSize = 14;
  //     const columns = canvas.width / fontSize;
  //     const drops = Array(Math.floor(columns)).fill(1);

  //     const draw = () => {
  //       ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);

  //       ctx.fillStyle = '#0f0';
  //       ctx.font = `${fontSize}px monospace`;

  //       for (let i = 0; i < drops.length; i++) {
  //         const text = chars[Math.floor(Math.random() * chars.length)];
  //         ctx.fillText(text, i * fontSize, drops[i] * fontSize);

  //         if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
  //           drops[i] = 0;

  //         drops[i]++;
  //       }
  //     };

  //     const interval = setInterval(draw, 33);
  //     return () => clearInterval(interval);
  //   }, []);

  //   return (
  //     <canvas
  //       ref={canvasRef}
  //       className="fixed top-0 left-0 w-full h-full opacity-10 pointer-events-none"
  //     />
  //   );
  // };



  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "A Community of Innovators",
        "A Club of Tech Enthusiasts",
        "Where Ideas Come to Life",
        "Learn. Code. Grow Together",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1500,
      cursorChar: "",
      // cursorClass: 'text-white',
    });

    return () => {
      typed.destroy();
    };
  }, []);

  useEffect(() => {
    // Add styles to head
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 -mt-24 sm:-mt-12">

      {/* <MatrixRain /> */}
      {/* <BinaryRain /> */}
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 w-32 h-screen flex-col justify-center items-center pointer-events-none hidden lg:flex"
      >
        <TechStackIcon Icon={DiReact} name="React" delay={0.2} />
        <TechStackIcon Icon={DiPython} name="Python" delay={0.3} />
        <TechStackIcon Icon={DiJavascript1} name="JavaScript" delay={0.4} />
        <TechStackIcon Icon={DiNodejs} name="Node.js" delay={0.5} />
        <TechStackIcon Icon={DiMongodb} name="MongoDB" delay={0.6} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-0 right-0 w-32 h-screen flex-col justify-center items-center pointer-events-none hidden lg:flex"
      >
        <TechStackIcon Icon={DiJava} name="Java" delay={0.2} />
        <TechStackIcon Icon={DiFirebase} name="Firebase" delay={0.3} />
        <TechStackIcon Icon={DiHtml5} name="HTML" delay={0.4} />
        <TechStackIcon Icon={DiCss3} name="CSS" delay={0.5} />
        <TechStackIcon Icon={DiGit} name="Git" delay={0.6} />
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48 glow-effect"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48 glow-effect"></div>

        {/* Code Window Decorations */}
        <div className="fixed top-40 left-10 code-window transform rotate-[-15deg] opacity-30 hidden lg:block">
          <div className="text-blue-400">
            <div>const community = {`{`}</div>
            <div className="pl-4">name: "WeCodeCrunchers",</div>
            <div className="pl-4">passion: "Coding",</div>
            <div className="pl-4">mission: "Learn & Grow"</div>
            <div>{`}`}</div>
          </div>
        </div>

        <div className="fixed bottom-20 right-10 code-window transform rotate-[15deg] opacity-30 hidden lg:block">
          <div className="text-green-400">
            <div>while (true) {`{`}</div>
            <div className="pl-4">learn();</div>
            <div className="pl-4">code();</div>
            <div className="pl-4">grow();</div>
            <div>{`}`}</div>
          </div>
        </div>

        {/* Enhanced Floating Tech Icons */}
        {/* <div className="fixed inset-0">
          <FloatingIcon
            Icon={DiReact}
            delay={0}
            duration={4}
            top="50%"
            left="10%"
          />
          <FloatingIcon
            Icon={DiPython}
            delay={1}
            duration={5}
            top="20%"
            right="10%"
          /> */}
        {/* <FloatingIcon
            Icon={DiJavascript1}
            delay={2}
            duration={6}
            bottom="15%"
            left="15%"
          /> */}
        {/* <FloatingIcon
            Icon={DiCss3}
            delay={3}
            duration={4}
            top="40%"
            right="10%"
          /> */}
        {/* <FloatingIcon
            Icon={DiHtml5}
            delay={2.5}
            duration={5}
            bottom="20%"
            right="25%"
          />
          <FloatingIcon
            Icon={DiGit}
            delay={1.5}
            duration={4.5}
            top="25%"
            left="10%"
          />
          <FloatingIcon
            Icon={FiTerminal}
            delay={2}
            duration={5}
            top="60%"
            right="15%"
          />
          <FloatingIcon
            Icon={FiZap}
            delay={3.5}
            duration={4}
            bottom="30%"
            left="20%"
          />
          <FloatingIcon
            Icon={DiNodejs}
            delay={1.8}
            duration={4.2}
            top="15%"
            right="15%"
          /> */}
        {/* <FloatingIcon
            Icon={DiMongodb}
            delay={2.2}
            duration={4.8}
            bottom="20%"
            left="40%"
          /> */}
        {/* </div> */}

        {/* Terminal-style Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[slide-right_3s_linear_infinite]"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-[slide-left_4s_linear_infinite] mt-8"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[slide-right_5s_linear_infinite] mt-16"></div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>

        {/* Floating Tech Icons */}
        {/* <div className="fixed inset-0">
          <FloatingIcon
            Icon={DiReact}
            delay={0}
            duration={4}
            top="10%"
            left="10%"
          />
          <FloatingIcon
            Icon={DiPython}
            delay={1}
            duration={5}
            top="20%"
            right="20%"
          />
          <FloatingIcon
            Icon={DiJavascript1}
            delay={2}
            duration={6}
            bottom="15%"
            left="15%"
          />
          <FloatingIcon
            Icon={DiCss3}
            delay={3}
            duration={4}
            top="40%"
            right="10%"
          />
          <FloatingIcon
            Icon={DiHtml5}
            delay={2.5}
            duration={5}
            bottom="20%"
            right="25%"
          />
          <FloatingIcon
            Icon={DiGit}
            delay={1.5}
            duration={4.5}
            top="25%"
            left="30%"
          />
        </div> */}

        {/* Code Rain Effect */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="code-rain">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="code-line"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.3}s`,
                  color: "#60A5FA",
                  opacity: 0.5,
                }}
              >
                {"{}"} &lt;/&gt; $_ npm
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

      {/* Hero Section with Enhanced Animations */}
      <div className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-32">
          <div className="text-center space-y-8 sm:space-y-12 relative">
            {/* Animated Tech Icons Circle */}
            {/* <div className="absolute inset-0 -z-10">
              <div className="tech-circle">
                {[
                  FiCommand,
                  FiCpu,
                  FiDatabase,
                  FiGithub,
                  FiHardDrive,
                  FiLayers,
                ].map((Icon, index) => (
                  <div
                    key={index}
                    className="tech-icon"
                    style={{
                      transform: `rotate(${index * 60}deg) translateY(-120px)`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-blue-400/50" />
                  </div>
                ))}
              </div>
            </div> */}

            <div className="space-y-2 sm:space-y-4">
              {/* <div className="inset-0 flex items-center justify-center opacity-60 lg:block mb-4 sm:mb-8">
                <h1 className="text-white text-xl sm:text-3xl font-bold flex items-center justify-center gap-2">
                  <span className="text-blue-400">{greeting},</span>
                  <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    {userName}
                  </span>
                  <span className="animate-float">✨</span>
                </h1>
              </div> */}

              <div className="max-w-6xl mx-auto px-4 bg-white/5 backdrop-blur-lg sm:px-10 py-4 sm:py-8 border border-white/10 rounded-xl neon-border">
                <div className="code-window relative overflow-hidden">
                  <div className="flex items-center mb-2 border-b border-gray-600 pb-2">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-2 text-sm text-gray-400">wcc.sh</div>
                  </div>


                  {/* Adjusted grid for mobile compatibility */}
                  {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative group">
                      <div className="text-xl sm:text-2xl font-mono text-blue-400 mb-2 group-hover:animate-pulse">
                        <span className="text-gray-400">$</span> members
                        <span className="text-white"> = </span>
                        200+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-mono">
                        Active Community Members
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xl sm:text-2xl font-mono text-green-400 mb-2 group-hover:animate-pulse">
                        <span className="text-gray-400">$</span> projects
                        <span className="text-white"> = </span>
                        6+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-mono">
                        Collaborative Projects
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xl sm:text-2xl font-mono text-purple-400 mb-2 group-hover:animate-pulse">
                        <span className="text-gray-400">$</span> events
                        <span className="text-white"> = </span>
                        4+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-mono">
                        Tech Events Hosted
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xl sm:text-2xl font-mono text-pink-400 mb-2 group-hover:animate-pulse">
                        <span className="text-gray-400">$</span> solutions
                        <span className="text-white"> = </span>
                        100+
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-mono">
                        Code Solutions Shared
                      </div>
                    </div>
                  </div> */}

                  <div className="relative inline-block mt-4">
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 blur-2xl rounded-3xl transform scale-110"></div>
                    </div>
                    {/* <div className="flex justify-center items-center">
                      <img
                        src={Logo}
                        alt="logo"
                        className="w-36 sm:w-52 mb-6 animate-float"
                      />
                    </div> */}
                    <h1 className="relative text-3xl sm:text-7xl font-bold text-white">
                      <span className="text-gradient">
                        WE
                        <span className="relative inline-block">
                          <span className="text-3xl sm:text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                            CODE
                          </span>
                          {/* <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[4px] sm:h-[6px] bg-white"></span> */}
                        </span>
                      </span>
                      CRUNCHERS
                    </h1>
                  </div>

                  {/* Terminal Prompt Animation */}
                  <div className="mt-4 font-mono text-gray-400">
                    <span className="text-green-400 text-[10px] sm:text-sm">
                      user@wecodecrunchers
                    </span>
                    :<span className="text-blue-400 text-xs sm:text-sm">~</span>
                    ${" "}
                    <span className="animate-pulse text-xs sm:text-sm">_</span>
                  </div>
                </div>
              </div>

              <div className="h-2 sm:h-8 flex items-center justify-center pt-6">
                <span
                  ref={typedRef}
                  className="text-base sm:text-2xl text-violet-200 font-semibold"
                ></span>
              </div>
            </div>
            <p className="text-[10px] sm:text-base text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We are CodeCrunchers, a vibrant community of developers,
              designers, and tech enthusiasts. Whether you&apos;re into coding,
              design, or exploring tech trends, CodeCrunchers is the perfect
              place to learn, collaborate, and grow!
            </p>

            {/* Enhanced CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-2 sm:pt-2"> */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-2">
              <Link to="/join-community">
                <button className="group relative inline-flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 text-lg font-bold text-white transition-all duration-300 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg hover:from-blue-500 hover:to-purple-500 pulse-border">
                  <span className="absolute inset-0 w-full h-full rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg bg-gradient-to-br from-blue-600 to-purple-600"></span>
                  <span className="relative z-10 flex items-center">
                    <FiTerminal className="mr-2" />
                    Join Community
                    <FiZap className="ml-2 animate-pulse" />
                  </span>
                </button>
              </Link>
            </div>
            {/* <Link>
                <button className="group bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 font-semibold px-9 py-3 rounded-lg transition-all sm:w-auto text-sm sm:text-lg relative overflow-hidden">
                  <span className="relative z-10">Explore Events</span>
                  <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
              </Link> */}
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Animated Tech Icons Circle */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="tech-circle">
          {[FiCommand, FiCpu, FiDatabase, FiGithub, FiHardDrive, FiLayers].map((Icon, index) => (
            <div
              key={index}
              className="tech-icon"
              style={{
                transform: `rotate(${index * 60}deg) translateY(-120px)`,
              }}
            >
              <Icon className="w-8 h-8 text-blue-400/50" />
            </div>
          ))}
        </div>
      </div> */}

      {/* Floating Terminal at bottom right */}
      {/* <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-black/80 backdrop-blur-lg rounded-lg p-4 border border-blue-500/30"
        >
          <div className="flex items-center mb-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="font-mono text-sm text-green-400"> */}
      {/* <Typed
              strings={[
                'npm install future-developer',
                'git commit -m "Join the community"',
                'python3 start_journey.py',
                'const future = "bright"'
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
            /> */}
      {/* </div>
        </motion.div>
      </div> */}



      {/* Add more code snippets with different positions */}
      {/* <CodeSnippet
        code={`class Developer {
        constructor() {
        this.coffee = "infinite";
        this.code = "clean";
          }
        }`}
        delay={0.4}
      /> */}

      {/* Add floating code particles */}
      {/* <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {codeParticles.map((text, index) => (
                      <CodeParticle
                        key={index}
                        text={text}
                        delay={index * 0.5}
                      />
                    ))}
                  </div> */}



      {/* Upcoming Events */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-10">
        <div className="relative bg-white/5 rounded-2xl backdrop-blur-sm p-2 sm:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <h2 className="text-2xl sm:text-5xl sm:pb-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-xs sm:text-xl text-white mb-8 text-center underline">
              Note: Dates can be tentative
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Event Card 1 */}
              <div className="p-4 pt-6 sm:p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-100 hover:bg-white/10 border border-white/10 hover:border-white/20">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-400 text-white p-4 rounded-lg text-center min-w-[100px] animate-pulse-slow">
                    <div className="text-xl sm:text-2xl font-bold">16</div>
                    <div className="text-sm">Jan</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* <FiCalendar className="text-blue-400" /> */}
                      {/* <FiAward className="text-purple-400" /> */}
                      <h3 className="text-sm sm:text-xl font-semibold text-white">
                        Web Development Workshop
                      </h3>
                    </div>
                    <p className="text-xs sm:text-base text-gray-300 mb-3">
                      Learn the fundamentals of modern web development with our
                      expert instructors.
                    </p>
                    <div className="flex items-center text-xs sm:text-base text-gray-400">
                      <FiTrendingUp className="mr-2" />
                      2:00 PM - 4:00 PM
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>

              {/* Event Card 2 */}
              <div className="p-4 pt-6 sm:p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-100 hover:bg-white/10 border border-white/10 hover:border-white/20">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-400 text-white p-4 rounded-lg text-center min-w-[100px] animate-pulse-slow">
                    <div className="text-2xl font-bold">20</div>
                    <div className="text-sm">Jan</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {/* <FiAward className="text-purple-400" /> */}
                      <h3 className="text-sm sm:text-xl font-semibold text-white">
                        AI Seminar
                      </h3>
                    </div>
                    <p className="text-xs sm:text-base text-gray-300 mb-3">
                      Join us for a discussion on the future of Artificial
                      Intelligence.
                    </p>
                    <div className="flex items-center text-xs sm:text-base text-gray-400">
                      <FiTrendingUp className="mr-2" />
                      9:00 AM - 2:00 PM
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add floating code snippets
            <CodeSnippet
        code={`function optimizeCode() {
  const life = "beautiful";
  return code.map(line => 
    line.optimize());
}`}
        delay={0.2}
      /> */}

      {/* Features Section with Animation */}
      <motion.div
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 mb-8 sm:mb-4 text-center animate-fade-in tracking-tight"
        >
          Why Join Us ?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20"
          >
            <div className="text-blue-400 mb-4">
              <FiCode className="w-8 h-8" />
            </div>
            <h3 className="text-sm sm:text-xl font-semibold text-white mb-2">
              Learn to Code
            </h3>
            <p className="text-xs sm:text-base text-gray-300">
              Access our comprehensive tutorials and resources to master
              programming.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20"
          >
            <div className="text-purple-400 mb-4">
              <FiUsers className="w-8 h-8" />
            </div>
            <h3 className="text-sm sm:text-xl font-semibold text-white mb-2">
              Join Community
            </h3>
            <p className="text-xs sm:text-base text-gray-300">
              Connect with fellow developers and share your knowledge.
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-6 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20"
          >
            <div className="text-pink-400 mb-4">
              <FiBook className="w-8 h-8" />
            </div>
            <h3 className="text-sm sm:text-xl font-semibold text-white mb-2">
              Resources
            </h3>
            <p className="text-xs sm:text-base text-gray-300">
              Access curated learning materials and coding challenges.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Effects */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48 glow-effect"></div>
        <div className="fixed w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48 glow-effect"></div> */}

      {/* Code Window Decorations */}
      {/* <div className="fixed top-40 left-10 code-window transform rotate-[-15deg] opacity-30 hidden lg:block">
          <div className="text-blue-400">
            <div>const community = {`{`}</div>
            <div className="pl-4">name: "WeCodeCrunchers",</div>
            <div className="pl-4">passion: "Coding",</div>
            <div className="pl-4">mission: "Learn & Grow"</div>
            <div>{`}`}</div>
          </div>
        </div>

        <div className="fixed bottom-20 right-10 code-window transform rotate-[15deg] opacity-30 hidden lg:block">
          <div className="text-green-400">
            <div>while (true) {`{`}</div>
            <div className="pl-4">learn();</div>
            <div className="pl-4">code();</div>
            <div className="pl-4">grow();</div>
            <div>{`}`}</div>
          </div>
        </div> */}

      {/* Terminal-style Animated Lines */}
      {/* <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[slide-right_3s_linear_infinite]"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent animate-[slide-left_4s_linear_infinite] mt-8"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[slide-right_5s_linear_infinite] mt-16"></div>
        </div>
      </div> */}

      {/* Principal Ma'am Thanks Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl backdrop-blur-sm p-6 sm:p-10 border border-white/10 overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative max-w-3xl mx-auto text-center">
            {/* Top Decorative Icon */}
            {/* <div className="inline-block mb-6 transform hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-sm"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 p-3 rounded-full">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div> */}

            {/* Main Content */}
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  Special Thanks
                </span>
              </h2>
              <hr className="border-white/10 mb-4" />

              <div className="space-y-6 text-gray-300">
                <p className="text-xs sm:text-lg leading-relaxed">
                  We extend our heartfelt gratitude to our respected Principal
                  Ma&apos;am for officially recognizing WeCodeCrunchers as a
                  college club. Your trust and support in our vision means the
                  world to us.
                </p>

                {/* Principal's Card */}
                <div className="mt-8 transform hover:scale-105 transition-transform duration-300">
                  <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl text-white font-bold">
                          SJ
                        </span>
                      </div>
                      <div className="text-base sm:text-xl text-blue-400 font-semibold mb-1">
                        Dr. Sandhya Jadhav Ma&apos;am
                      </div>
                      <div className="text-gray-400 text-xs sm:text-base">
                        Principal
                      </div>
                      <div className="text-gray-400 text-xs sm:text-base">
                        Bharati Vidyapeeth College Of Engineering
                      </div>
                      <div className="text-gray-400 text-xs sm:text-base">
                        Navi Mumbai
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-lg leading-relaxed mt-6">
                  Your approval has given us the platform to make a real
                  difference in our college&apos;s tech community. We promise to
                  uphold the values and standards of our institution while
                  fostering innovation and learning.
                </p>

                {/* Decorative Line */}
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto mt-8 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* About Our Journey Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="relative bg-white/5 rounded-2xl backdrop-blur-sm p-6 sm:p-10 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl transform translate-x-1/2 translate-y-1/2 animate-pulse-slow"></div>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Title with Animation */}
            <h2 className="text-xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6 sm:mb-8 text-center animate-gradient-x">
              About Our Journey
            </h2>

            {/* Timeline Journey */}
            <div className="space-y-8 relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-0 top-5 w-[2px] h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-blue-500/50"></div>

              {/* September 2023 */}
              <div className="relative pl-8 transform hover:scale-100 transition-transform duration-300">
                <div className="absolute left-[-5px] top-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="text-blue-400 text-sm mb-2">September 2023</div>
                <p className="text-xs sm:text-lg leading-relaxed text-gray-300">
                  WeCodeCrunchers started as just a small group of friends
                  coming together to discuss coding, created by{" "}
                  <span className="text-blue-400 font-semibold animate-pulse">
                    myself
                  </span>{" "}
                  on WhatsApp Group.
                </p>
              </div>

              {/* Growth Journey */}
              <div className="relative pl-8 transform hover:scale-100 transition-transform duration-300">
                <div className="absolute left-[-5px] top-2 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="text-purple-400 text-sm mb-2">The Growth</div>
                <p className="text-xs sm:text-lg leading-relaxed text-gray-300">
                  What started as a simple idea has now grown into something
                  much bigger, and it&apos;s amazing to see how far we&apos;ve
                  come. We&apos;ve officially become a community, and it&apos;s
                  heartwarming to see so many passionate students joining us on
                  this journey.
                </p>
              </div>

              {/* Current Status */}
              <div className="relative pl-8 transform hover:scale-100 transition-transform duration-300">
                <div className="absolute left-[-5px] top-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="text-blue-400 text-sm mb-2">Present Day</div>
                <p className="text-xs sm:text-lg leading-relaxed text-gray-300">
                  Together, we&apos;re not just a group, we&apos;re a family
                  driven by our shared passion to bring change. We&apos;ve also
                  started hosting workshops and seminars, hoping to inspire and
                  help even more students like us.
                </p>
              </div>
            </div>

            {/* Founder Card with Enhanced Animation */}
            <div className="mt-12 flex justify-center">
              <div className="group relative bg-white/5 p-6 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transform transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

                <div className="flex items-center space-x-4 relative z-10">
                  {/* Profile Image with Animated Border */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin-slow"></div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center relative">
                      <span className="text-xs sm:text-2xl text-white font-bold">
                        GW
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs sm:text-lg text-white font-semibold group-hover:text-blue-400 transition-colors">
                      GANESH WADHE
                    </div>
                    <div className="text-xs sm:text-lg text-blue-400 group-hover:text-white">
                      Community Head
                    </div>

                    {/* Social Links with Enhanced Hover Effects */}
                    <div className="flex space-x-3 mt-2">
                      <a
                        href="https://www.linkedin.com/in/ganeshwadhehere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-500 transform hover:scale-110 transition-all duration-300"
                      >
                        {/* LinkedIn SVG */}
                        <svg
                          className="w-3 h-3 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://github.com/ganeshwadhehere"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transform hover:scale-110 transition-all duration-300"
                      >
                        {/* GitHub SVG */}
                        <svg
                          className="w-3 h-3 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/ganeshwadhehere/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-500 transform hover:scale-110 transition-all duration-300"
                      >
                        {/* Instagram SVG */}
                        <svg
                          className="w-3 h-3 sm:w-5 sm:h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Animation */}
      <motion.div
        ref={statsRef}
        initial="hidden"
        animate={statsInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-5xl md:text-6xl sm:p-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center animate-fade-in tracking-tight"
        >
          Our Stats
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-2">
              200+
            </div>
            <div className="text-xs sm:text-base text-gray-300">
              Active Members
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-2">
              6+
            </div>
            <div className="text-xs sm:text-base text-gray-300">Projects</div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-2xl sm:text-4xl font-bold text-blue-400 mb-2">
              4+
            </div>
            <div className="text-xs sm:text-base text-gray-300">
              Events Hosted
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="bg-white/5 p-4 sm:p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="text-3xl sm:text-4xl font-bold text-blue-400 mb-2">
              100+
            </div>
            <div className="text-sm sm:text-base text-gray-300">
              Code Solutions
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Latest Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <h2 className="text-xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center underline">
          Latest from Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="group bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20">
            <div className="relative overflow-hidden">
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/1*qBNlFWQ9G_RPVm7tbZaXOw.jpeg"
                alt="Blog"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                  Dec 24, 2023
                </span>
              </div>
              <h3 className="text-sm sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Getting Started with Web Development
              </h3>
              <p className="text-xs sm:text-base text-gray-300 mb-4">
                A comprehensive guide for beginners looking to start their
                journey in web development.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="group bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20">
            <div className="relative overflow-hidden">
              <img
                src="https://ewzduhvhjkj.exactdn.com/wp-content/uploads/2021/07/09125522/top-16-best-javascript.png?strip=all&lossy=1&ssl=1"
                alt="Blog"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                  Dec 23, 2023
                </span>
              </div>
              <h3 className="text-sm sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Modern JavaScript Frameworks
              </h3>
              <p className="text-xs sm:text-base text-gray-300 mb-4">
                Exploring the latest JavaScript frameworks and their use cases
                in modern web development.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="group bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10 border border-white/10 hover:border-white/20">
            <div className="relative overflow-hidden">
              <img
                src="https://d1krbhyfejrtpz.cloudfront.net/blog/wp-content/uploads/2023/04/01184039/The-Future-of-AI-in-Software-Development.jpg"
                alt="Blog"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                  Dec 22, 2023
                </span>
              </div>
              <h3 className="text-sm sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                AI in Software Development
              </h3>
              <p className="text-xs sm:text-base text-gray-300 mb-4">
                How artificial intelligence is transforming the way we write and
                maintain code.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm sm:text-base"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse-slow"></div>
          <div className="relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                Stay Updated
              </h2>
              <p className="text-sm sm:text-lg text-blue-100 mb-6">
                Subscribe to our newsletter for the latest updates, tutorials,
                and community news.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:border-white/40 flex-grow max-w-md w-full"
                />
                <button className="group relative px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50">
                  <span className="relative z-10">Subscribe</span>
                  <div className="absolute inset-0 rounded-lg ring-2 ring-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 sm:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                WeCodeCrunchers
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                Empowering students like us to learn, collaborate and grow
                together.
              </p>
            </div>
            {/* <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div> */}
            {/* <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm sm:text-base text-gray-400 hover:text-blue-400"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="text-center sm:text-left">
              <h4 className="text-base sm:text-lg font-semibold text-white mb-4">
                Connect
              </h4>
              <div className="flex items-center justify-center sm:justify-start text-gray-400 text-sm sm:text-base gap-4">
                <a
                  href="https://www.instagram.com/wecodecrunchers/"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/wecodecrunchers"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.46 6.011c-.793.352-1.644.588-2.533.695a4.468 4.468 0 001.962-2.466 8.92 8.92 0 01-2.83 1.084 4.448 4.448 0 00-7.578 3.033c0 .348.04.686.116 1.011a12.643 12.643 0 01-9.204-4.662 4.455 4.455 0 001.378 5.932 4.425 4.425 0 01-2.015-.556v.057a4.448 4.448 0 003.564 4.362 4.437 4.437 0 01-2.007.076 4.452 4.452 0 004.157 3.091 8.922 8.922 0 01-5.526 1.906c-.359 0-.714-.021-1.065-.062a12.601 12.601 0 006.835 2.004c8.207 0 12.7-6.799 12.7-12.694 0-.193-.004-.384-.013-.575a9.065 9.065 0 002.234-2.317z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/wecodecrunchers"
                  className="text-gray-400 hover:text-blue-400"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">
              {" "}
              @wecodecrunchers <br /> Built with ❤️ by
              <a
                href="https://www.instagram.com/ganeshwadhehere/"
                target="_blank"
                className="text-white hover:text-orange-400"
              >
                {" "}
                @ganeshwadhehere
              </a>
              <br />
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
