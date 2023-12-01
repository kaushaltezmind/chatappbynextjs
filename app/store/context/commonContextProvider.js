import { createContext, useContext, useEffect, useState } from "react";

const defaultProvider = {
  isMobile: null,
  isMessagesDashboard: true,
  isShowMessages: false,
  isProfile: false,
};

const commonContext = createContext(defaultProvider);

const CommonContextProvider = ({ children }) => {
  const [width, setWidth] = useState(0);
  const [isMessagesDashboard, setIsMessageDashboard] = useState(true);
  const [isShowMessages, setIsShowMessages] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setWidth(window.innerWidth);
    function handleWindowSizeChange() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 480;

  const values = {
    isMobile,
    isMessagesDashboard,
    setIsMessageDashboard,
    isShowMessages,
    setIsShowMessages,
    isProfile,
    setIsProfile,
    isLoading,
    setIsLoading,
  };

  return (
    <commonContext.Provider value={values}>{children}</commonContext.Provider>
  );
};

const CommonContext = () => {
  return useContext(commonContext);
};

export { CommonContext, CommonContextProvider };
