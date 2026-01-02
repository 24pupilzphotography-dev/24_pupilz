"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Gallery", href: "#gallery" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/85 backdrop-blur-md shadow-lg border-b border-white/10"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="flex items-center space-x-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src="/logo web.png"
                                alt="24 Pupilz Photography Logo"
                                className="h-12 w-12 object-contain"
                            />
                            <span
                                className="text-xl md:text-2xl font-bold tracking-wide hidden sm:inline-block"
                                style={{ fontFamily: "var(--font-autography)" }}
                            >
                                24 Pupilz Photography
                            </span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <motion.div
                            className="hidden md:flex items-center space-x-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {navItems.map((item, index) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm uppercase tracking-wider text-foreground/70 hover:text-accent transition-colors duration-300 relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 text-foreground hover:text-accent transition-colors duration-300 bg-background/40 backdrop-blur-sm rounded-full border border-white/10"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle mobile menu"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-8 h-8" />
                            ) : (
                                <Menu className="w-8 h-8" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-background/92 backdrop-blur-md"
                            onClick={toggleMobileMenu}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="relative h-full flex flex-col items-center justify-center"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="text-2xl font-serif text-foreground hover:text-accent transition-colors duration-300 py-4"
                                    onClick={toggleMobileMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
