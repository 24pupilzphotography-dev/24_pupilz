"use client";

import { Instagram, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Portfolio", href: "#gallery" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
];

const services = [
    { name: "Wedding Photography", href: "#services" },
    { name: "Baby Shower", href: "#services" },
    { name: "Puberty Ceremony", href: "#services" },
    { name: "Commercial Shoots", href: "#services" },
];

export default function Footer() {
    return (
        <footer className="bg-muted border-t border-border">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/logo web.png"
                                alt="24 Pupilz Photography Logo"
                                className="h-14 w-14 object-contain"
                            />
                            <div>
                                <span
                                    className="text-2xl font-bold block"
                                    style={{ fontFamily: "var(--font-autography)" }}
                                >
                                    24 Pupilz
                                </span>
                                <span className="text-xs text-muted-foreground tracking-widest uppercase">
                                    Photography
                                </span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Timeless. Honest. Unscripted. We believe the best moments happen naturally — 
                            and we're there to catch them.
                        </p>
                        <div className="flex gap-3">
                            <a 
                                href="https://www.instagram.com/24_pupilz__photography/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a 
                                href="mailto:24pupilzphotography@gmail.com"
                                className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                            >
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        <ChevronRight className="w-4 h-4 text-accent opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-lg font-serif font-bold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <a 
                                        href={service.href}
                                        className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 group text-sm"
                                    >
                                        <ChevronRight className="w-4 h-4 text-accent opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-lg font-serif font-bold mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a 
                                href="tel:6369409172"
                                className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors group"
                            >
                                <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-sm">+91 6369409172</span>
                            </a>
                            <a 
                                href="mailto:24pupilzphotography@gmail.com"
                                className="flex items-start gap-3 text-muted-foreground hover:text-accent transition-colors group"
                            >
                                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-sm break-all">24pupilzphotography@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                                <span className="text-sm">Sathyamangalam, Erode, Tamil Nadu</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-muted-foreground text-sm text-center md:text-left">
                            © {new Date().getFullYear()} <span className="text-accent">24_pupilz Photography</span>. 
                            Made with <span className="text-red-500">♥</span> in Sathyamangalam, India.
                        </p>
                        <p className="text-muted-foreground text-xs">
                            Capturing Love • Care • Moments
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
