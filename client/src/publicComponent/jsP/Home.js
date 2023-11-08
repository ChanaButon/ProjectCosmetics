import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // If the current route is the home page, refresh the component
    if (isHomePage) {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handleNavigate = (route) => {
    setIsVisible(false);
    navigate(route);
  };

  const loginCliant = () => {
    navigate("register");
    setIsVisible(false);
  };

  const loginOwner = () => {
    navigate("Login");
    setIsVisible(false);
  };

  const signUp = () => {
    navigate("SignUp");
    setIsVisible(false);
  };

  // Hide the home page if the current route is not the home page
  if (!isHomePage) {
    return null;
  }

  return (
    <>
      {isVisible ? (
        <div>
          <h1 className="fff">?לקוח פעם ראשונה שלך כאן </h1>
          <button onClick={loginCliant} className="button1">
            לחץ להרשמה
          </button>

          <h1 className="fff">בעל עסק חדש כאן </h1>
          <button onClick={loginOwner} className="button1">
            לחץ להרשמה
          </button>

          <h1 className="fff">לכניסה למערכת </h1>
          <button onClick={signUp} className="button1">
            לחץ להתחברות
          </button>
        </div>
      ) : null}
    </>
  );
}
