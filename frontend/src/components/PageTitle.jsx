import React, { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title || "AudioPhile - Your Gateway to Premium Audio Gear";
    return () => {
      document.title = "Default Title"; // Cleanup on unmount if needed
    };
  }, [title]);
  return null;
};

export default PageTitle;
