import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Testimonials from "./Pages/Testimonials";
import Contact from "./Pages/Contact";

// 🔥 Styled & interactive NotFound component
function NotFound() {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0F0F0F",
        color: "#FAFAFA",
        fontFamily: "Mona Sans, sans-serif",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          margin: 0,
          letterSpacing: "-2px",
          color: "#FE402C",
          animation: "pulse 2s infinite",
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          marginTop: "1rem",
          opacity: 0.8,
          fontWeight: 400,
        }}
      >
        Lost in the void{Array(dotCount).fill(".").join("")}
      </p>
      <Link
        to="/"
        style={{
          marginTop: "2rem",
          color: "#0F0F0F",
          backgroundColor: "#FE402C",
          padding: "0.9rem 1.8rem",
          borderRadius: "50px",
          textDecoration: "none",
          fontWeight: "600",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05)";
          e.target.style.backgroundColor = "#FAFAFA";
          e.target.style.color = "#0F0F0F";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1)";
          e.target.style.backgroundColor = "#FE402C";
          e.target.style.color = "#0F0F0F";
        }}
      >
        Return Home
      </Link>

      {/* Floating background circles */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(254,64,44,0.1) 0%, transparent 70%)",
          top: "-200px",
          left: "-200px",
          zIndex: 0,
          animation: "rotate 20s linear infinite",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(250,250,250,0.05) 0%, transparent 80%)",
          bottom: "-150px",
          right: "-150px",
          zIndex: 0,
          animation: "rotate 30s linear infinite reverse",
        }}
      ></div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
          }
          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          {/* 🧭 Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
