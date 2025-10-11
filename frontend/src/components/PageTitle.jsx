import React, { useEffect } from "react";

const PageTitle = ({ title }) => {
  useEffect(() => {
    document.title = title || "AudioPhile - Your Gateway to Premium Audio Gear";
  }, [title]);
  return null;
};

export default PageTitle;
