import React from 'react';
import './home.css';


const Home = () => {
  return (
    <div className="HomeContainer">
      <div className="Content">
        <h1 className="Title">¡Bienvenidos a Mi Boda!</h1>
        <h2 className="Subtitle">Crea y comparte tus invitaciones de boda fácilmente</h2>
        <button className="Button">
          <i className="fas fa-angle-double-down"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
