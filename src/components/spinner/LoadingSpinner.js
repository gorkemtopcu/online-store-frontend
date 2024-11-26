import React from "react";
import PropTypes from "prop-types";

const LoadingSpinner = ({ message = "Loading...", fullScreen = true }) => {
  // Inline styles for container
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: fullScreen ? "100vh" : "auto",
    padding: "20px",
    backgroundColor: fullScreen ? "#f8f9fa" : "transparent",
  };

  // Inline styles for spinner
  const spinnerStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  // Inline styles for text
  const textStyle = {
    marginTop: "10px",
    fontSize: "16px",
    color: "#333",
    textAlign: "center",
  };

  // Adding animation dynamically
  const animationStyle = `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;

  // Dynamically inject animation styles into the document
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0];
    if (styleSheet) {
      styleSheet.insertRule(animationStyle, styleSheet.cssRules.length);
    }
  }, []);

  // Create React element programmatically
  return React.createElement(
    "div",
    { style: containerStyle },
    React.createElement("div", { style: spinnerStyle }),
    message && React.createElement("div", { style: textStyle }, message)
  );
};

// Define prop types for better developer experience
LoadingSpinner.propTypes = {
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;
