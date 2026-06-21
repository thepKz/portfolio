import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./style.css";

gsap.registerPlugin(ScrollToPlugin);

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const menus: MenuItem[] = [
  { id: 1, title: "About", link: "#about" },
  { id: 2, title: "Service", link: "/service" },
  { id: 3, title: "Work", link: "#portfolio" },
  { id: 4, title: "Hire Me", link: "#contact" },
];

const MobileMenu2: React.FC = () => {

  const [menuActive, setMenuState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     HANDLE CLICK
  ========================== */
  const handleNavClick = (link: string) => (e: React.MouseEvent) => {

    if (link.startsWith("#")) {
      e.preventDefault();

      if (location.pathname === "/") {
        const el = document.querySelector(link);

        if (el) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: el,
              offsetY: 80,
            },
            ease: "power2.out",
          });
        }

      } else {
        navigate(`/${link}`);
      }
    }
    
    setMenuState(false);
  };

  return (
    <div>

      {/* MENU */}
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>

        {/* CLOSE */}
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(false)}>
            <i className="ti-close"></i>
          </div>
        </div>

        {/* MENU LIST */}
        <ul className="responsivemenu">

          {menus.map((item) => (
            <ListItem key={item.id}>

              {item.link.startsWith("#") ? (

                <a
                  href={item.link}
                  onClick={handleNavClick(item.link)}
                  className={`menu-link ${
                    item.title === "Hire Me" ? "hire-me" : ""
                  }`}
                >
                  {item.title}
                </a>

              ) : (

                <a
                  href={item.link}
                  onClick={() => setMenuState(false)}
                  className="menu-link"
                >
                  {item.title}
                </a>

              )}

            </ListItem>
          ))}

        </ul>

      </div>

      {/* TOGGLE BUTTON */}
      <div className="showmenu">
        <button
          type="button"
          className="navbar-toggler open-btn"
          onClick={() => setMenuState(true)}
        >
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>

    </div>
  );
};

export default MobileMenu2;