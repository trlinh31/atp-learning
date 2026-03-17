import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function DataCAP() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const eligibility = [
        "Students with GPA 8.0+",
        "Strong technical foundation in Data/IT/BI",
        "Ambitious to grow in a global environment"
    ];

    const benefits = [
        "Personalized career development roadmap",
        "Standardized CV, interview & assessment center skills",
        "1:1 mentoring with industry professionals & HR leaders"
    ];

    const programDetails = [
        "Duration: 8 training sessions",
        "Target roles: Data Analyst, BI Intern, Data Engineer",
        "Selection: Limited intake, highly competitive",
        "Intakes: 2 per year"
    ];

    const processSteps = [
        { number: 1, title: "CV & Portfolio Review" },
        { number: 2, title: "Goal & Strengths Discovery" },
        { number: 3, title: "Technical Skills Training" },
        { number: 4, title: "Behavioral & Soft Skills" },
        { number: 5, title: "Group Interview Practice" },
        { number: 6, title: "Advanced Interview Coaching" },
        { number: 7, title: "Workplace Readiness" }
    ];

    const mentors = [
        {
            name: "Daniel Pham",
            role: "R&D Data Scientist at CSL",
            image: "https://atp-global.com.au/images/data-cap-mentor-1.jpg",
            highlights: [
                "PhD in Data Science, University of Melbourne, with international AI/ML publications",
                "Mentor & Lecturer, supported 50+ IT students at University of Melbourne",
                "Experienced in recruiting interns & graduates, leading AI/Data projects",
                "Co-founder of Infinity Entertainment, reaching 20,000+ Vietnamese audiences in Australia & New Zealand"
            ]
        },
        {
            name: "Phoebe Nguyễn",
            role: "Software Engineer at Macquarie Group",
            image: "https://atp-global.com.au/images/data-cap-mentor-2.jpg",
            highlights: [
                "Former HR Business Partner at NTT Ltd.",
                "11+ years of experience at top corporations in Australia",
                "Expert in talent management, employer branding & HR systems (HRIS)",
                "Successfully transitioned from HR to Software Engineering, blending people insight with tech expertise"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative w-full overflow-hidden">
                <div className="hidden md:block">
                    <img
                        src="https://atp-global.com.au/images/data-cap-banner.webp"
                        alt="DataCAP 2025 Banner"
                        className="w-full h-auto object-cover"
                    />
                </div>
                <div className="md:hidden">
                    <img
                        src="https://atp-global.com.au/images/data-cap-banner-mobile.webp"
                        alt="DataCAP 2025 Banner"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            {/* About DataCAP Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-6 uppercase tracking-tight">About DataCAP</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-8" />
                        <p className="text-xl text-gray-600 leading-relaxed">
                            We design a career accelerator program for high-achieving students in Data, IT, and Business Intelligence who aspire to join Australia's Top 100 Tech Corporations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Who Can Join */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-primary/5">
                            <div className="mb-6">
                                <img
                                    src="https://atp-global.com.au/images/data-cap-service-1.png"
                                    alt="Who Can Join"
                                    className="w-full h-48 object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-6">Who Can Join?</h3>
                            <ul className="space-y-3">
                                {eligibility.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What You Gain */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-primary/5">
                            <div className="mb-6">
                                <img
                                    src="https://atp-global.com.au/images/data-cap-service-2.png"
                                    alt="What You Gain"
                                    className="w-full h-48 object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-6">What You Gain</h3>
                            <ul className="space-y-3">
                                {benefits.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Program Details */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-primary/5">
                            <div className="mb-6">
                                <img
                                    src="https://atp-global.com.au/images/data-cap-service-3.png"
                                    alt="Program Details"
                                    className="w-full h-48 object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-6">Program Details</h3>
                            <ul className="space-y-3">
                                {programDetails.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-24 bg-[#111111] text-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-serif mb-6 uppercase tracking-tight">Our Process</h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto mb-16">
                        {processSteps.map((step, i) => (
                            <div key={i} className="flex items-center">
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                                        <span className="text-2xl font-bold text-white">{step.number}</span>
                                    </div>
                                    <p className="text-sm text-white/80 text-center max-w-[120px]">{step.title}</p>
                                </div>
                                {i < processSteps.length - 1 && (
                                    <div className="hidden md:flex items-center mx-4">
                                        <div className="w-12 h-0.5 bg-white/30" />
                                        <ArrowRight className="w-5 h-5 text-white/50" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLScuHS0BV1Xb9P1hb1noEaw0qCOFAdIwD4GjkI3QknWlrK9gEw/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-12 py-8 text-xl font-bold shadow-xl">
                                Join Now <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            {/* Meet Our Mentors Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-serif text-primary mb-6 uppercase tracking-tight">Meet Our Mentors</h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {mentors.map((mentor, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-[2rem] shadow-xl border border-primary/5 overflow-hidden"
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-serif text-primary mb-2">{mentor.name}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{mentor.role}</p>
                                    <ul className="space-y-3">
                                        {mentor.highlights.map((highlight, j) => (
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

            {/* About ATP Section */}
            <section className="py-24 bg-secondary/30">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-4xl font-serif text-primary mb-8 uppercase tracking-tight">About ATP</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-10">
                        ATP (Apex Talent Partners) was founded in Australia with a mission to upskill and empower international students by providing them with world-class career opportunities. Over the years, we have built one of the largest global communities of international graduates, supporting them not only in education but also in their professional and personal growth.
                    </p>
                    <Link href="/about-us">
                        <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg">
                            Learn More About Us <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
