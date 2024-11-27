import React from "react";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex justify-center items-center text-gray-400">
      <span className="mr-1">Made with</span>
      <span>
        <FaHeart />
      </span>
      <span className="ml-1">by Saksham</span>
    </div>
  );
};

export default Footer;
