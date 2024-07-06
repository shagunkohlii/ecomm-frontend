import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img className='cartify-logo' src="https://img.icons8.com/?size=100&id=lUAhXJeo12PL&format=png&color=000000" alt="Cartify Logo" />
          <span>Cartify</span>
        </Link>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/Cart" className="cart-icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKjSURBVHgB7ZhdiE1RFMf/M0g8mHnhBXVJijQ8yGfpTBh5IsmzpLz6aJ49eMKbvEiaKI+kdIvU+MigMMhnYe4YUdQw8lEaZmat9jrtNXfu7ex9z9nnzMP86n/3Onufs87+3utcYIpsaSKtJO0gNde5Z4R0gdSPgvlIGk3QHUwCziG5on9JrZjEdMBWNkKBNCeU31f2RhTI9ITyn6RnMAtuN2kGisFpjZxC8hwOrcGkHmV6lT0As13lRUnSfpebF8K2bB/yo1W993jSYmJ4nx0Sez3yo13ZV+HIDZiW9SI/uuSdg3zh0qPMPUnbSLOQD5Gk3fzjWtHbkk4jrUF4lsEupDL/uFb0Cem/2GsRns3KvgVPXsPMmcsIz3V511M0wFl5+DvCMoc0LO86GWe6Dj3TIynvb0sQDt6W4oOojAZYBLsB70c44m3ps8706dEK6avYbQjHJkl7kIIrMK19jjCsgh21vbrAp0eZOD5dgTAR/zZl39QFvhV9qewNyJ4OSXnEPugClzBPc1fZW0h/kB3caXEg0o0UtJAuIZ9AOUIKziCfSlZQY6Sb4AYvnG9yP6/8TtI/hGEINv71pgTb4p0oANfFxOc7t5J79gRpAekXsocjtAekt0jBQeQzR7lDWpCSwzBncMiK9iFDlpPOi2OeAtdI62Dmso+OkT6Jn1ekPfDf2+vC8WIfJvbEG/gdq0dr+OD/DLYiIw4ox7xVXVTXnY4+5qpn+Kg8DbNg+foRMqIsDh+rvBeS1+XoI4Kt6GrJO6Ly5lU/0Mh8GJB0MUykz1+m8yXvh5uLcRv6LtI72I/G38jocydC/RXb7uHnfR0frqPixKEq58OS5wOPSKXKD/8jM7vWza5nfS1KMN/fM2Giqi/wh5/dTlpKeoiqYHmKkIwB/Vg4cSkh2w4AAAAASUVORK5CYII=" alt="Cart" />
          </Link>
          {localStorage.getItem("token") ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/Login">
              <Button variant="contained">Login</Button>
            </Link>
          )}
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;