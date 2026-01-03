"use client";

import { motion } from "framer-motion";

export default function HeroContent() {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-center px-4 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="section-subtitle mb-4 text-accent"
                >
                    Create your own story with us!
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white"
                >
                    Capturing <span className="text-accent italic">Moments</span>
                    <br />
                    <span className="text-3xl md:text-5xl lg:text-6xl">That Last Forever</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
                >
                    Professional photography that tells your unique story with authenticity and artistry.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a href="#gallery" className="btn-primary">
                        View Portfolio
                    </a>
                    <a href="#contact" className="btn-outline border-white text-white hover:bg-white hover:text-black">
                        Book a Session
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
