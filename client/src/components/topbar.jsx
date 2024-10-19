// components/Header.js
import React from "react";
import "./topbar.css"; // optional, if you have styles for this component

function Header() {
  return (
    <header className="bg-white m-0 p-4 w-full flex items-center justify-between border-b border-gray-300">
      <a href="/home">
        <img src="/rebirth_logo.png" alt="Logo" className="h-16 w-auto" />
      </a>
    </header>
  );
}


export default Header;
