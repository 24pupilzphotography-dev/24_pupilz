"use client";

import { Camera, Users, Heart, Zap } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

const services = [
    {
        title: "Wedding Photography",
        description: "Capturing the magic of your special day with cinematic storytelling and candid moments.",
        price: "Starting at $2,500",
        Icon: Heart,
    },
    {
        title: "Portrait Sessions",
        description: "Professional headshots, family portraits, and creative personal branding sessions.",
        price: "Starting at $300",
        Icon: Users,
    },
    {
        title: "Event Coverage",
        description: "Comprehensive coverage for corporate events, parties, and special occasions.",
        price: "Starting at $150/hr",
        Icon: Camera,
    },
    {
        title: "Commercial Shoots",
        description: "High-quality product and lifestyle photography to elevate your brand image.",
        price: "Custom Quote",
        Icon: Zap,
    },
];

export default function Services() {
    return (
        <section id="services" className="py-20 bg-black">
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
