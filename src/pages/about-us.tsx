import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutUs() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const timeline = [
        { year: "2014", title: "Idea Initiated", desc: "A group of former international students in Australia began exploring ways to support Vietnamese students facing challenges abroad." },
        { year: "2015", title: "Pilot Activities", desc: "Launched initial support services including airport pickup, housing assistance, and city orientation for new students." },
        { year: "2016", title: "Expansion in Australia", desc: "Scaled services to six cities across Australia. Received strong feedback from students and parents." },
        { year: "2018", title: "Official Establishment", desc: "Apex Talent Partners (ATP) was officially founded as a recruitment company based in Australia." },
        { year: "2019", title: "Professional Recruitment", desc: "Provided recruitment solutions to over 1,200 professionals and 200+ businesses across Australia." },
        { year: "2024", title: "Strategic Shift", desc: "Refocused efforts on helping Asian international students build long-term careers in Australia." }
    ];

    const leaders = [
        {
            name: "Eric Ha",
            role: "Co-Founder & Director",
            image: "https://atp-global.com.au/images/leader-1.jpeg",
            highlights: [
                "Founded the company in 2014 to empower youth through education and global opportunities",
                "Marketing graduate from Monash University, part of Australia's Group of Eight",
                "Recognised as one of the Top 10 Outstanding Young Leaders in Vietnam–Australia Relations",
                "Experienced speaker, mentor, and trainer in youth leadership and career development"
            ]
        },
        {
            name: "Albert Kalaja",
            role: "Co-Founding Member & Career Advisor",
            image: "https://atp-global.com.au/images/leader-2.webp",
            highlights: [
                "30+ years of experience in recruitment and career coaching since 1987",
                "Former founder and director of Paragon Recruitment Services, specialising in IT",
                "Reviewed over 45,000 CVs and conducted 6,000+ interviews across all career levels",
                "Helped hundreds of international graduates successfully enter the Australian job market"
            ]
        },
        {
            name: "Emily",
            role: "Founding Member & Leadership Advisor",
            image: "https://atp-global.com.au/images/leader-3.jpeg",
            highlights: [
                "Over 12 years of experience in organizational leadership and people strategy",
                "Former CHRO and CPO, with deep expertise in culture transformation and executive coaching",
                "Advises leaders and teams through complex growth and change management",
                "Trusted mentor to senior leaders seeking to improve performance and team impact"
            ]
        }
    ];

    const stats = [
        { value: "1,000+", label: "Hours of Training & Coaching" },
        { value: "98%", label: "Satisfaction Rate" },
        { value: "286+", label: "Students Supported" },
        { value: "38+", label: "Job Search Journeys Guided" }
    ];

    const galleryImages = [
        "https://atp-global.com.au/images/gallery-1.jpg",
        "https://atp-global.com.au/images/gallery-2.jpg",
        "https://atp-global.com.au/images/gallery-3.jpg",
        "https://atp-global.com.au/images/gallery-4.jpg",
        "https://atp-global.com.au/images/gallery-5.jpg",
        "https://atp-global.com.au/images/gallery-6.jpg"
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="absolute -right-40 -top-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div initial="initial" animate="animate" variants={fadeIn} className="max-w-4xl">
                        <p className="text-sm font-bold tracking-widest uppercase mb-4 text-white/80">About Us</p>
                        <h1 className="text-5xl lg:text-7xl font-serif mb-8 leading-tight uppercase tracking-tight">
                            Apex Talent Partners
                        </h1>
                        <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
                            A recruitment company established in Australia in 2018, supporting over 1,200 professionals across more than 200 businesses in Australia and the UK.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-serif text-primary uppercase tracking-tight">Our Story</h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed">
                                <p>
                                    Starting in 2024, ATP has repositioned its focus to support Asian international students, particularly those from China and Vietnam, in building long-term careers in Australia and the UK.
                                </p>
                                <p>
                                    With a team of experts who understand the market and share similar backgrounds, ATP provides practical and tailored recruitment solutions.
                                </p>
                                <p>
                                    We recognize the challenges that international students face, including cultural gaps, unfamiliar job markets, and skill mismatches, and we are here to bridge those gaps. Through our integrated ecosystem, ATP offers comprehensive support that extends from education to employment.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://atp-global.com.au/images/about-banner-1.webp"
                                    alt="ATP Team with Australian officials"
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className="text-xs text-gray-500 italic mt-4 text-center px-4">
                                ATP Founding team with Australian Prime Minister's Special Envoy - Mr. Nicholas Moore, and Ms. Sarah Hooper, the Australian Consul-General in Ho Chi Minh City.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="order-2 lg:order-1">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl">
                                <img
                                    src="https://atp-global.com.au/images/about-2-2.png"
                                    alt="ATP Mission"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-4xl font-serif text-primary uppercase tracking-tight">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                With a global perspective and regional expertise, particularly in Vietnam and China, ATP delivers optimized solutions that combine local flexibility with the reach of an international network.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Whether you're an international student looking to shape your career path, or a business aiming to build a high-performing, diverse team, Apex Talent Partners is here to support you—every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-24 bg-[#111111] text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase">Our Journey</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                        <p className="text-white/60 text-lg italic font-serif max-w-2xl mx-auto">
                            From a simple idea to a comprehensive support system for international students
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {timeline.map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                                    <span className="text-lg font-bold text-white">{item.year}</span>
                                </div>
                                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide text-white">{item.title}</h3>
                                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leaders Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase tracking-tight mb-4">Founders & Leaders</h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        {leaders.map((leader, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-[2rem] shadow-xl border border-primary/5 overflow-hidden"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={leader.image}
                                        alt={leader.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-serif text-primary mb-2">{leader.name}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{leader.role}</p>
                                    <ul className="space-y-3">
                                        {leader.highlights.slice(0, 3).map((highlight, j) => (
                                            <li key={j} className="text-sm text-gray-600 leading-relaxed flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 bg-primary text-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif mb-4 uppercase">Impressive Numbers</h2>
                        <p className="text-white/70">
                            With a mission to connect international students with businesses, we are proud of what we've achieved.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12 text-center">
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-5xl font-serif font-bold">{stat.value}</div>
                                <div className="text-white/60 text-xs uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-4xl font-serif text-primary mb-6 uppercase">Contact Us</h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Connecting international students with the right jobs — from training to placement.
                    </p>
                    <Link href="/contact-us">
                        <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-12 py-8 text-xl font-bold shadow-xl transition-all hover:scale-[1.02]">
                            Get in Touch <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase tracking-tight mb-4">Our Gallery</h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="rounded-2xl overflow-hidden shadow-lg aspect-video"
                            >
                                <img
                                    src={img}
                                    alt={`Gallery ${i + 1}`}
                                    className="w-full h-full object-cover hover:grayscale-0 transition-all duration-300"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
