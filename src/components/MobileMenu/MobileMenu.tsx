import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import "./style.css";

interface MenuItem {
  id: number;
  title: string;
  link: string;
}

const menus: MenuItem[] = [
  { id: 1, title: "Giới thiệu", link: "#about" },
  { id: 2, title: "Kỹ năng", link: "#skills" },
  { id: 3, title: "Dự án", link: "#portfolio" },
  { id: 4, title: "Kinh nghiệm", link: "#experience" },
  { id: 5, title: "Dịch vụ", link: "#service" },
  { id: 6, title: "Liên hệ", link: "#contact" },
];

const MobileMenu: React.FC = () => {
  const [menuActive, setMenuState] = useState<boolean>(false);

  const handleScroll = (target: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const element = document.querySelector(target);
    if (!element) return;

    window.scrollTo({
      top: (element as HTMLElement).offsetTop - 110,
      behavior: "smooth",
    });

    setMenuState(false); // close menu after click
  };

  return (
    <div>

      {/* MENU */}
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>

        {/* CLOSE BUTTON */}
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(false)}>
            <i className="ti-close"></i>
          </div>
        </div>

        {/* MENU LIST */}
        <ul className="responsivemenu">

          {menus.map((item) => (
            <ListItem key={item.id}>

              <a
                href={item.link}
                onClick={handleScroll(item.link)}
                className={`menu-link ${
                  item.link === "#contact" ? "hire-me" : ""
                }`}
              >
                {item.title}
              </a>

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

export default MobileMenu;