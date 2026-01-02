"use client";

import { Camera, Heart, Baby, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
    {
        id: "wedding",
        title: "Wedding Photography",
        shortDesc: "Capturing the magic of your special day",
        fullDesc: "Wedding photography is not just about capturing moments — at 24_pupilz, it's about celebrating love. We believe in capturing natural smiles, unposed emotions, and genuine interactions. Our team blends into your celebrations, approaches each moment with creativity, and works tirelessly to help you relive those precious memories for years to come.",
        Icon: Heart,
    },
    {
        id: "baby-shower",
        title: "Baby Shower",
        shortDesc: "Celebrating new beginnings beautifully",
        fullDesc: "Baby shower photography is all about capturing the joy and excitement of welcoming a new life. At 24_pupilz, we make sure each moment of celebration is captured beautifully — from the decorations and games to the heartfelt emotions of family and friends gathering to shower love on the parents-to-be.",
        Icon: Baby,
    },
    {
        id: "puberty",
        title: "Puberty Ceremony",
        shortDesc: "Traditional ceremonies with modern elegance",
        fullDesc: "Puberty ceremonies are significant cultural milestones that deserve to be documented with care and respect. At 24_pupilz, we specialize in capturing these traditional ceremonies while bringing a modern, elegant touch to the photography. Every ritual, every blessing, every smile — preserved forever.",
        Icon: Sparkles,
    },
    {
        id: "commercial",
        title: "Commercial Shoots",
        shortDesc: "Elevating your brand image",
        fullDesc: "Commercial photography requires a keen eye for detail and understanding of brand aesthetics. At 24_pupilz, we deliver high-quality product and lifestyle photography that elevates your brand image. From product catalogs to lifestyle campaigns, we bring your vision to life with precision and creativity.",
        Icon: Camera,
    },
];

export default function Services() {
    const [activeService, setActiveService] = useState(services[0].id);

    return (
        <section id="services" className="py-24 bg-muted">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Wedding Photography</p>
                    <h2 className="section-title font-serif">Services</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
                        At 24_pupilz, we are proud to offer world-class photography and cinematography services. 
                        We capture magical moments with heart, soul, and precision.
                    </p>
                </motion.div>

                {/* Services Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {services.map((service) => (
                        <motion.button
                            key={service.id}
                            onClick={() => setActiveService(service.id)}
                            className={`px-6 py-3 rounded-none font-medium transition-all duration-300 ${
                                activeService === service.id
                                    ? "bg-accent text-accent-foreground"
                                    : "bg-card border border-border text-foreground hover:border-accent"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {service.title}
                        </motion.button>
                    ))}
                </div>

                {/* Active Service Detail */}
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: activeService === service.id ? 1 : 0,
                            y: activeService === service.id ? 0 : 20,
                            display: activeService === service.id ? "block" : "none"
                        }}
                        transition={{ duration: 0.4 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-card border border-border p-8 md:p-12">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <service.Icon className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                                        {service.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                        {service.fullDesc}
                                    </p>
                                    <a 
                                        href="#contact" 
                                        className="inline-block btn-primary"
                                    >
                                        Enquire Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Service Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-card border border-border p-6 card-hover cursor-pointer group"
                            onClick={() => setActiveService(service.id)}
                        >
                            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                                <service.Icon className="w-7 h-7 text-accent" />
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-accent transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                {service.shortDesc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
