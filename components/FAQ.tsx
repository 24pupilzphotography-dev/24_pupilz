"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How much do you charge?",
        answer: "At 24_pupilz, we understand every event is unique. Our pricing isn't one-size-fits-all — we'll connect with you, understand your vision, and craft a package that's just right for you. Contact us for a personalized quotation based on your specific requirements.",
    },
    {
        question: "How do we book your services?",
        answer: "Booking with 24_pupilz is simple! You can contact us directly through our contact form, call us, or reach out via Instagram. Once you submit an inquiry, our team will promptly give you a callback with a detailed quotation. After we agree on the package, we'll proceed with the booking process.",
    },
    {
        question: "Do you travel for shoots outside Sathyamangalam?",
        answer: "Absolutely! We love traveling and have captured events across Tamil Nadu and beyond. Whether your event is in Erode, Coimbatore, Chennai, or any other location, we would be thrilled to be part of your special day.",
    },
    {
        question: "What makes you different from other photographers?",
        answer: "Our passion for storytelling, personalized approach, and commitment to capturing authentic emotions set us apart. We prioritize your comfort and deliver timeless memories with creative vision and professional execution.",
    },
    {
        question: "How long does it take to receive the final photos?",
        answer: "We typically deliver edited photos within 2-4 weeks after your event, depending on the scope of the project. We also offer same-day preview photos for weddings and special events upon request.",
    },
    {
        question: "Do you provide both photos and videos?",
        answer: "Yes! We offer both photography and cinematography services. Our team can capture your special moments in stunning photos as well as cinematic wedding films that you'll cherish forever.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-muted">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-subtitle">Got Questions?</p>
                    <h2 className="section-title font-serif">Have a question? Check these answers.</h2>
                    <p className="text-muted-foreground max-w-xl mx-auto mt-4">
                        Easily find solutions and answers. We're here to help you.
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="max-w-3xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={`w-full bg-card border text-left p-6 flex items-center justify-between gap-4 transition-all duration-300 ${
                                    openIndex === index 
                                        ? "border-accent" 
                                        : "border-border hover:border-accent/50"
                                }`}
                            >
                                <span className="font-serif font-semibold text-lg">
                                    {faq.question}
                                </span>
                                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors ${
                                    openIndex === index 
                                        ? "bg-accent text-accent-foreground" 
                                        : "bg-muted text-foreground"
                                }`}>
                                    {openIndex === index ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="bg-card border border-t-0 border-border p-6">
                                            <p className="text-muted-foreground leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-muted-foreground mb-4">Still have questions?</p>
                    <a href="#contact" className="btn-primary inline-block">
                        Contact Us
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

