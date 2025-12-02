'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigationLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Image
                                src="/logo web.png"
                                alt="24 Pupilz Photography"
                                width={120}
                                height={40}
                                className="h-8 md:h-10 w-auto"
                                priority
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-10">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className="text-white/90 hover:text-white transition-all duration-300 text-sm font-light tracking-[0.15em] relative group"
                                    style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                                >
                                    {link.name}
                                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </nav>

                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group"
                            aria-label="Toggle menu"
                        >
                            <span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                            />
                            <span
                                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/95 backdrop-blur-lg"
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Mobile Navigation */}
                <nav className="relative h-full flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-8">
                        {navigationLinks.map((link, index) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-white text-3xl font-light tracking-[0.2em] hover:opacity-70 transition-all duration-300 transform ${isMenuOpen
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-4 opacity-0'
                                    }`}
                                style={{
                                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                                    fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                                }}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Spacer to prevent content from hiding under fixed header */}
            <div className="h-16 md:h-20" />
        </>
    );
}
