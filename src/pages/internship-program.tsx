import { Link } from "wouter";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Briefcase,
    CheckCircle2,
    ClipboardList,
    Calendar,
    Users,
    Headset,
    ShieldCheck,
    Star,
    Target,
    FileText,
    Building2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const steps = [
    {
        title: "Discovery & Priorities",
        description:
            "We capture your preferences, fields of interest, desired roles, and career goals.",
    },
    {
        title: "Precision Matching",
        description:
            "Our team matches you with internships aligned to your skills and direction.",
    },
    {
        title: "Application Readiness",
        description:
            "Tailored resumes, cover letters, and coaching for the Australian market.",
    },
    {
        title: "1:1 HR Mentor Coaching",
        description:
            "Professional CV reviews, mock interviews, and workplace culture briefings.",
    },
    {
        title: "Placement Support",
        description:
            "End-to-end guidance until your internship offer is locked in.",
    },
];

const benefits = [
    {
        title: "Structured Journey",
        desc: "Clear timeline balancing your academic needs with employer timelines.",
        icon: <Calendar />,
    },
    {
        title: "Local Insight",
        desc: "Australian HR mentors translate workplace expectations for you.",
        icon: <Users />,
    },
    {
        title: "Tangible Outcomes",
        desc: "We curate opportunities and manage paperwork candidates often miss.",
        icon: <Target />,
    },
    {
        title: "Accountability",
        desc: "Dedicated partner from first intake to signed offer.",
        icon: <ShieldCheck />,
    },
];

const deliverables = [
    {
        title: "Opportunity Blueprint",
        description:
            "Recommendations rooted in your preferences, interests, and career goals.",
        icon: <ClipboardList />,
    },
    {
        title: "Precision Matching",
        description:
            "Internships matched to your trajectory with employer intel.",
        icon: <Briefcase />,
    },
    {
        title: "Application Toolkit",
        description:
            "Resume and cover letter coaching plus review-ready documents.",
        icon: <FileText />,
    },
    {
        title: "Interview Prep",
        description:
            "HR mentors run mock interviews and share cultural cues.",
        icon: <Headset />,
    },
];

const partnerLogos = [
    "https://atp-global.com.au/images/client-1.png",
    "https://atp-global.com.au/images/client-3.svg",
    "https://atp-global.com.au/images/client-7.svg",
    "https://atp-global.com.au/images/client-8.svg",
    "https://atp-global.com.au/images/client-9.png",
    "https://atp-global.com.au/images/client-10.png",
    "https://atp-global.com.au/images/client-11.jpg",
    "https://atp-global.com.au/images/client-12.png",
];

export default function InternshipProgram() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
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
                                Customized Internship Placement
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-serif text-primary mb-8 leading-tight uppercase tracking-tight">
                                Unlock Your <br /> Australian Career
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-10">
                                Guided internship placements that unlock Australian work
                                experience for ambitious international students. We combine
                                strategic intake, personalised matching, and HR mentor coaching.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/apply-internship">
                                    <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                                        Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link href="/job-search">
                                    <Button
                                        variant="outline"
                                        className="rounded-full border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-bold"
                                    >
                                        Explore Internship Jobs
                                    </Button>
                                </Link>
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
                                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800"
                                    alt="Internship Program"
                                    className="w-full h-full object-cover"
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
                            Why Choose This Program?
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {benefits.map((item, i) => (
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

            {/* Program Overview */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                            Program Overview
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Designed for international students and graduates who need
                            structured, local guidance.
                        </p>
                    </div>
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Who This Is For",
                                text: "International students, visa holders, and recent graduates with little local work experience.",
                                icon: <Users />,
                            },
                            {
                                title: "Why It Exists",
                                text: "Employers expect Aussie readiness. We remove the guesswork so you can compete.",
                                icon: <Target />,
                            },
                            {
                                title: "Problems We Solve",
                                text: "Lack of local advice, unclear hiring processes, and competing with seasoned candidates.",
                                icon: <CheckCircle2 />,
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="bg-primary/5 p-8 rounded-[2.5rem] text-center border border-primary/10"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4 uppercase">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                            How The Program Works
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Five structured milestones take you from curiosity to internship
                            offer.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-primary/5">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={step.title}
                                    initial="initial"
                                    animate="animate"
                                    variants={fadeIn}
                                    className={`flex gap-6 ${index !== steps.length - 1 ? "pb-8 mb-8 border-b border-gray-100" : ""}`}
                                >
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white font-bold text-xl">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* What You Receive */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                            What You Receive
                        </h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Outcome-focused features that turn preparation into placement.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {deliverables.map((item, i) => (
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
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary mb-4">
                            Why students chose us:
                        </h2>
                        <p className="text-gray-500 text-lg">Real voices, real results</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                                    A
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Amy</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Finance
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "As a Master's student at Monash University, I found the career
                                consultation session incredibly valuable. I received detailed
                                feedback on my resume, helping me refine key sections to make my
                                CV more concise and impactful. I also learned how to structure
                                an effective cover letter, giving me a clearer understanding of
                                how to present myself in job applications."
                            </p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary/20"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg">
                                    T
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Ted</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Data Analyst
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "Two weeks ago, I received the email I had been waiting for a
                                job offer! Since then, I've been working through the onboarding
                                process, and next week, I'll officially begin this new chapter
                                in my career. This achievement wouldn't have been possible
                                without the support and reference from my mentor."
                            </p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col h-full">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-lg">
                                    M
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">My Ngoc</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                                        Marketing
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-sm flex-1">
                                "As a student at Torrens University, I found the competency
                                assessment session truly essential. It helped me clearly
                                understand what skills I was lacking and where to start
                                improving. Eric, who conducted the assessment, was approachable,
                                friendly, and explained everything thoroughly with plenty of
                                examples."
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <a
                            href="https://atp-global.com.au/testimonials"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-8 transition-colors"
                            >
                                See more success stories
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
            {/* Partner Logos */}
            <section className="py-24 bg-[#ecf0ee]">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-serif text-primary uppercase mb-4">
                        Our Partners
                    </h2>
                    <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                    <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
                        Trusted by leading companies across Australia.
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
                        {partnerLogos.map((logo, i) => (
                            <div
                                key={i}
                                // className="w-32 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                                className="w-32 h-20 flex items-center justify-center hover:scale-110 transition-all duration-300"
                            >
                                <img
                                    src={logo}
                                    alt={`Partner ${i + 1}`}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase tracking-tight">
                        Ready to Start?
                    </h2>
                    <div className="h-1 w-20 bg-white mx-auto mb-6" />
                    <p className="text-white/80 text-lg max-w-xl mx-auto mb-10 font-serif italic">
                        Apply now and receive a personalised consultation within 48 hours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/apply-internship">
                            <Button className="rounded-full bg-white text-primary hover:bg-white/90 px-10 py-6 text-lg font-bold shadow-lg transition-all hover:-translate-y-1">
                                Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/contact-us">
                            <Button
                                variant="outline"
                                className="rounded-full border-white text-white hover:bg-white/10 px-10 py-6 text-lg font-bold"
                            >
                                Schedule a Chat
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
