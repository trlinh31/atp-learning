import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Handshake,
    CheckCircle2,
    FileText,
    ClipboardList,
    Calendar,
    MessageSquare,
    Globe,
    Users,
    Building2,
    ShieldCheck,
    Star,
    ChevronRight,
    Download,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Partner() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const scrollToContact = () => {
        const element = document.getElementById("contact-form");
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <motion.div initial="initial" animate="animate" variants={fadeIn}>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                                Partnership Program
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-serif text-primary mb-8 leading-tight uppercase tracking-tight">
                                Shape the <br /> Future with Us
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-10">
                                Host a high-potential intern and mentor the next generation of
                                industry leaders. Our structured programs help you solve
                                business challenges while building a sustainable talent
                                pipeline.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={scrollToContact}
                                    className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                                >
                                    Let's Connect <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    className="rounded-full border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-bold"
                                >
                                    <Download className="mr-2 w-5 h-5" /> Partnership Brochure
                                </Button>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white aspect-[4/5] relative">
                                <img
                                    src="https://atp-global.com.au/images/partnership-banner.jpg"
                                    alt="Partnership"
                                    className="w-full h-full object-cover grayscale brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Key Benefits */}
            <section className="py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                            Why Partner with ATP?
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Top Talent",
                                desc: "Access pre-assessed Engineering, IT, and Business graduates.",
                                icon: <Star />,
                            },
                            {
                                title: "12-Week Placements",
                                desc: "Structured internship cycles designed for maximum impact.",
                                icon: <Calendar />,
                            },
                            {
                                title: "Success Management",
                                desc: "Ongoing support from dedicated ATP student success managers.",
                                icon: <Users />,
                            },
                            {
                                title: "Global Reach",
                                desc: "Connect with a diverse pool of international professionals.",
                                icon: <Globe />,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-primary/5"
                            >
                                <div className="text-primary mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-3 uppercase tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-primary/5 p-8 rounded-[2.5rem] text-center border border-primary/10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                <ClipboardList className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4 uppercase">
                                Referral Program
                            </h3>
                            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                Join our referral network and help us connect graduates with
                                more opportunities.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                Referral Application
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-primary p-8 rounded-[2.5rem] text-center text-white shadow-xl shadow-primary/20"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white mx-auto mb-6">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase">Book a Call</h3>
                            <p className="text-white/70 text-sm mb-8 leading-relaxed">
                                Schedule a 15-minute consultation with our manager to discuss
                                custom needs.
                            </p>
                            <Button className="w-full rounded-full bg-white text-primary hover:bg-white/90 font-bold">
                                Schedule Now
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="bg-primary/5 p-8 rounded-[2.5rem] text-center border border-primary/10"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                <Download className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-primary mb-4 uppercase">
                                Brochure
                            </h3>
                            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                Download our detailed partnership brochure with program
                                structures.
                            </p>
                            <Button
                                variant="outline"
                                className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-all"
                            >
                                Download PDF
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Let's Connect Form */}
            <section
                id="contact-form"
                className="py-24 bg-primary text-white relative overflow-hidden"
            >
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase tracking-tight">
                            Let's Connect
                        </h2>
                        <div className="h-1 w-20 bg-white mx-auto mb-6" />
                        <p className="text-white/80 text-lg max-w-xl mx-auto font-serif italic">
                            Become an ATP Host Company and empower the next generation.
                        </p>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-10 lg:p-16 text-gray-900 shadow-3xl">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Company Email
                                </label>
                                <input
                                    type="email"
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    placeholder="email@company.com"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                                    placeholder="Tell us about your hosting interests..."
                                />
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                    By providing your personal information, you agree to our
                                    Collection Notice and Privacy Policy.
                                </p>
                            </div>

                            <Button className="w-full rounded-2xl bg-primary text-white hover:bg-primary/90 py-10 text-xl font-bold uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Send Message <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-[#ecf0ee]">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-lg font-medium text-gray-500 mb-12 max-w-3xl mx-auto">
                        Trusted by companies and organizations collaborating with ATP.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-100 grayscale-0">
                        {/* Partner Logos - Using text placeholders for now, in production would be SVGs/Images */}
                        <div className="text-2xl font-bold font-serif text-primary/80 flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                            <Building2 className="w-8 h-8" /> Assistance Abroad
                        </div>
                        <div className="text-3xl font-bold font-sans text-blue-700 flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                            grcg<sup className="text-xs">®</sup>
                        </div>
                        <div className="bg-[#d95d2e] text-white p-2 font-bold text-xl rounded-sm hover:scale-105 transition-transform cursor-default">
                            abc
                        </div>
                        <div className="italic font-bold text-2xl text-blue-600 hover:scale-105 transition-transform cursor-default">
                            GEM
                        </div>
                        <div className="border-2 border-primary/30 rounded-lg px-4 py-2 text-xl font-light tracking-wide hover:border-primary hover:scale-105 transition-transform cursor-default">
                            applicaa
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
