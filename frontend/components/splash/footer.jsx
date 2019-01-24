import React from "react";

const Footer = () => {
  return (
    <div className="footer-container" >
      <div className="session-footer" >
        <nav className="footer-nav" >
          <ul className="footer-list" >
            <li><a href="https://github.com/michaelhcho91" target="_blank">Github</a></li>
            <li><a href="https://www.linkedin.com/in/michael-cho-48a820146" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
          </ul>
          <span className="footer-copyright" >&copy; 2019 finstagram</span>
        </nav>
      </div>
    </div>
  )
};

export default Footer;