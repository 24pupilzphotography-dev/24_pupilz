"use client";

import { Camera, Users, Heart, Zap } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

const services = [
    {
        title: "Wedding Photography",
        description: "Capturing the magic of your special day with cinematic storytelling and candid moments.",
        Icon: Heart,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Portrait Sessions",
        description: "Professional headshots, family portraits, and creative personal branding sessions.",
        Icon: Users,
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
    },
    {
        title: "Event Coverage",
        description: "Comprehensive coverage for corporate events, parties, and special occasions.",
        Icon: Camera,
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2071&auto=format&fit=crop"
    },
    {
        title: "Commercial Shoots",
        description: "High-quality product and lifestyle photography to elevate your brand image.",
        Icon: Zap,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
    },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Services</h2>
                    <div className="w-24 h-1 bg-accent mx-auto" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ServiceCard {...service} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
