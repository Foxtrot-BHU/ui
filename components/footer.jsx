import React from 'react';
import { FaGithub } from "react-icons/fa";
import { RiLinkedinBoxFill } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="flex justify-between items-center bg-gray-900 text-gray-300 px-8 py-4 border-t border-gray-700 shadow-md">
            {/* Left: Clickable Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition">
                <Image src="/logo.png" alt="CV Insight Logo" width={35} height={35} />
                <span className="text-xl font-semibold">
                    CV<span className="text-blue-400">Insight</span>
                </span>
            </Link>

            {/* Center: Made By Text */}
            <p className="text-sm opacity-80">Made by Team Inferno &copy;</p>

            {/* Right: Clickable Social Icons */}
            <div className="flex items-center gap-4">
                <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="cursor-pointer hover:text-gray-400 transition text-[28px]" />
                </Link>
                <Link href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <RiLinkedinBoxFill className="cursor-pointer hover:text-gray-400 transition text-[28px]" />
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
