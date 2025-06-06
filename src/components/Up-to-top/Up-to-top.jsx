import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Tooltip } from "@mui/material";
import { IoLogoWhatsapp } from "react-icons/io";

const Up_top = () => {
  const [isVisible, setIsVisible] = useState(false);

  const phoneNumber = "+966508533232";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <motion.button
        className="fixed bottom-8 left-8 bg-[#4f46e5] border border-[#fff] text-white p-3 rounded shadow-lg hover:bg-[#4e46e5d8] transition duration-300 z-100 cursor-pointer"
        onClick={scrollToTop}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowUp size={25} />
      </motion.button>

      <motion.button
        className="fixed bottom-8 right-8 bg-[#46e561] border border-[#fff] text-white p-3 rounded shadow-lg z-100 cursor-pointer"
        onClick={() => window.open(whatsappLink, "_blank")}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Tooltip title="تواصل واتس اب" placement="top">
          <IoLogoWhatsapp size={25} />
        </Tooltip>
      </motion.button>
    </React.Fragment>
  );
};

export default Up_top;
