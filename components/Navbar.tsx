"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navItems = [
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Hide navbar on admin pages
    const isAdminPage = pathname?.startsWith("/admin");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Don't render navbar on admin pages
    if (isAdminPage) {
        return null;
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>


            <nav
                className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                        ? "bg-background/95 backdrop-blur-xl shadow-2xl"
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <img
                                src="/logo web.png"
                                alt="24 Pupilz Photography Logo"
                                className="h-14 w-14 object-contain"
                            />
                            <div className="hidden sm:block">
                                <span
                                    className="text-2xl font-bold tracking-wide block"
                                    style={{ fontFamily: "var(--font-autography)" }}
                                >
                                    24 Pupilz
                                </span>
                                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                                    Photography
                                </span>
                            </div>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <motion.div
                            className="hidden lg:flex items-center gap-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors duration-300 relative group py-2"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </motion.div>

                        {/* Enquire Now Button */}
                        <motion.div
                            className="hidden md:flex items-center gap-4"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <a
                                href="#contact"
                                className="btn-primary rounded-none"
                            >
                                Enquire Now
                            </a>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors duration-300"
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
                        className="fixed inset-0 z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-background/98 backdrop-blur-xl"
                            onClick={toggleMobileMenu}
                        />

                        {/* Menu Content */}
                        <motion.div
                            className="relative h-full flex flex-col items-center justify-center gap-2"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {/* Logo in mobile menu */}
                            <img
                                src="/logo web.png"
                                alt="24 Pupilz Photography Logo"
                                className="h-20 w-20 object-contain mb-8"
                            />

                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    className="text-2xl font-serif text-foreground hover:text-accent transition-colors duration-300 py-3"
                                    onClick={toggleMobileMenu}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                                >
                                    {item.name}
                                </motion.a>
                            ))}

                            <motion.a
                                href="#contact"
                                className="btn-primary mt-8"
                                onClick={toggleMobileMenu}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 }}
                            >
                                Enquire Now
                            </motion.a>

                            {/* Contact info in mobile menu */}
                            <motion.div
                                className="absolute bottom-12 flex flex-col items-center gap-2 text-muted-foreground text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.9 }}
                            >
                                <a href="tel:6369409172" className="hover:text-accent transition-colors">
                                    +91 6369409172
                                </a>
                                <a href="mailto:24pupilzphotography@gmail.com" className="hover:text-accent transition-colors">
                                    24pupilzphotography@gmail.com
                                </a>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
