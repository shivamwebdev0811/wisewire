import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-md ${
          active ? "bg-gradient-to-b from-[#DA22FF] via-[#DA22FF] to-[#9733EE] text-white" : "bg-gray-200 text-gray-900"
        } hover:shadow-lg hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
