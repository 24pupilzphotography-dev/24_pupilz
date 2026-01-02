"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, Instagram } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        event_type: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const { error } = await supabase
                .from('messages')
                .insert([{
                    name: formData.name,
                    email: formData.email,
                    subject: `${formData.event_type} Inquiry - ${formData.phone}`,
                    message: formData.message
                }]);

            if (error) throw error;

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", event_type: "", message: "" });
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            label: "Phone",
            value: "+91 6369409172",
            href: "tel:6369409172",
        },
        {
            icon: Mail,
            label: "Email",
            value: "24pupilzphotography@gmail.com",
            href: "mailto:24pupilzphotography@gmail.com",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "Sathyamangalam, Erode",
            href: null,
        },
        {
            icon: Clock,
            label: "Working Hours",
            value: "Mon - Sun: 9AM - 8PM",
            href: null,
        },
    ];

    return (
        <section id="contact" className="py-24 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Get In Touch</p>
                    <h2 className="section-title font-serif">Schedule a Free Consultation</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                        Ready to capture your special moments? Fill out the form or reach out directly.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <h3 className="text-2xl font-serif font-bold mb-6">
                            Let's Create Something Beautiful
                        </h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Whether you have questions about our services or want to book a session, 
                            we're here to help. Reach out to us through any of the following channels.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 bg-accent/10 flex items-center justify-center rounded-none flex-shrink-0">
                                        <item.icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                            {item.label}
                                        </p>
                                        {item.href ? (
                                            <a 
                                                href={item.href} 
                                                className="text-foreground hover:text-accent transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-foreground">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="mt-10">
                            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                                Follow us on
                            </p>
                            <div className="flex gap-4">
                                <a 
                                    href="https://www.instagram.com/24_pupilz__photography/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a 
                                    href="mailto:24pupilzphotography@gmail.com"
                                    className="w-12 h-12 bg-card border border-border flex items-center justify-center hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-card border border-border p-8 md:p-10">
                            <h4 className="text-xl font-serif font-bold mb-6">Enquiry Form</h4>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-muted-foreground mb-2">
                                            Event Type *
                                        </label>
                                        <select
                                            name="event_type"
                                            value={formData.event_type}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                                        >
                                            <option value="">Select Event Type</option>
                                            <option value="Wedding">Wedding Photography</option>
                                            <option value="Baby Shower">Baby Shower</option>
                                            <option value="Puberty Ceremony">Puberty Ceremony</option>
                                            <option value="Commercial">Commercial/Photoshoot</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-muted-foreground mb-2">
                                        Tell us about your event
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full bg-background border border-border px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                                        placeholder="Event date, location, and any special requirements..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full btn-primary flex items-center justify-center gap-2 ${
                                        loading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {loading ? "Sending..." : "Submit Enquiry"}
                                    <Send className="w-4 h-4" />
                                </button>

                                {status === "success" && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-500 text-center"
                                    >
                                        Thank you! We'll get back to you soon.
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <motion.p 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-center"
                                    >
                                        Failed to send. Please try again or contact us directly.
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
