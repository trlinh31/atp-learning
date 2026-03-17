import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    MapPin,
    ShieldCheck
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactUs() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const offices = [
        {
            city: "Sydney",
            address: "Level 45, 680 George Street",
            region: "Sydney, NSW 2000, Australia"
        },
        {
            city: "Melbourne",
            address: "Level 3, 162 Collins St",
            region: "Melbourne, VIC 3000"
        },
        {
            city: "China",
            address: "Floor 18, Building B, Enterprise Plaza",
            region: "No. 125 Qingnian Street, Shenhe District, Shenyang City"
        },
        {
            city: "Vietnam",
            address: "30-32 Vuong Thua Vu Street",
            region: "Khuong Thuong Ward, Thanh Xuan District, Hanoi City"
        }
    ];

    const subjectOptions = [
        "Please select",
        "Sign in / Password",
        "My Account",
        "Job Search",
        "Applying for a job",
        "Profile",
        "Report a suspicious ad",
        "Email Issues",
        "Other"
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div initial="initial" animate="animate" variants={fadeIn}>
                        <h1 className="text-5xl lg:text-7xl font-serif mb-6 uppercase tracking-tight">Contact Us</h1>
                        <p className="text-white/80 text-lg max-w-xl mx-auto">
                            Have an enquiry? Send us a message and we'll get back to you as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                        {/* Contact Form */}
                        <div className="bg-secondary/30 rounded-[3rem] p-10 lg:p-12 border border-primary/5">
                            <h2 className="text-3xl font-serif text-primary mb-8 uppercase tracking-tight">Send a Message</h2>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-4 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all"
                                            placeholder="First name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-4 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all"
                                            placeholder="Last name"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full p-4 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all"
                                        placeholder="email@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                                    <select
                                        className="w-full p-4 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all text-gray-700"
                                        defaultValue=""
                                    >
                                        {subjectOptions.map((option, i) => (
                                            <option key={i} value={i === 0 ? "" : option} disabled={i === 0}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Additional Information</label>
                                    <textarea
                                        rows={5}
                                        className="w-full p-4 rounded-xl bg-white border border-gray-100 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 text-sm transition-all resize-none"
                                        placeholder="Max 1000 characters..."
                                    />
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                        By providing your personal information, you agree to our Collection Notice and Privacy Policy.
                                    </p>
                                </div>

                                <Button className="w-full rounded-2xl bg-primary text-white hover:bg-primary/90 py-8 text-xl font-bold uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    Send Message <ArrowRight className="ml-2 w-6 h-6" />
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-serif text-primary mb-4 uppercase tracking-tight">Contact Information</h2>
                                <div className="h-1 w-20 bg-primary" />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {offices.map((office, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-primary mb-2">{office.city}</h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">{office.address}</p>
                                                <p className="text-sm text-gray-500">{office.region}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 mt-8">
                                <h3 className="text-xl font-bold text-primary mb-4">Need immediate assistance?</h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    Our team is available Monday to Friday, 9:00 AM - 6:00 PM (AEST). We aim to respond to all enquiries within 24 business hours.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                                        View FAQs
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
