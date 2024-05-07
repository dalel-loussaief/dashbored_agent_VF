import React, { useEffect, useState, useContext } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { AreaTop } from "../../components"; // Import manquant
import "./DashboardScreen.css";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [loggedInEmail, setLoggedInEmail] = useState('');

  useEffect(() => {
    // Récupérer l'e-mail depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
      // Stocker l'e-mail dans localStorage
      localStorage.setItem('loggedInEmail', email);
      console.log(email);
    }
  }, []);

  return (
    <div className={`content-area ${theme === "light" ? "light-theme" : "dark-theme"}`}> {/* Utilisation de backticks pour la chaîne de classe */}
      <AreaTop />

      <div className="image-container">
        <h4 style={{ marginBottom: "20px", position: "absolute", top: "20%", left: "58%", transform: "translate(-50%, -50%)" }}>
          <span style={{ color: theme === "light" ? "black" : "white" }}>Hey</span>{" "}
          <span style={{ color: "blue" }}>Name</span>
        </h4>

        <p style={{ position: "absolute", top: "25%", left: "64%", transform: "translate(-70%, -70%)" }}>Here, you can easily manage, track, and update all your listed properties.</p>
        <img src={"src/assets/images/1-removebg.png"} className="centered-image" alt="Image" />
        <button type="submit" className="image-button">
          <Link to={"/PropertyAdd"} style={{ color: "white", textDecoration: "none" }}>
            <IoIosAddCircleOutline size={25} />  Create new property
          </Link>
        </button>
      </div>

    </div>
  );
};

export default Dashboard;
