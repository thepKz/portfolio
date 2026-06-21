import React from "react";
import "./style.css";

const Scrollbar: React.FC = () => {

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li>
            <button onClick={scrollTop} className="scroll-btn">
              <i className="ti-arrow-up"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;