import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    BarChart3,
    Target,
    Briefcase,
    Notebook,
} from "lucide-react";

import heroImage from "@assets/generated_images/diverse_students_career_success.png";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function StudentsGraduates() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-primary">
                <div className="absolute inset-0 bg-black/20 z-10" />
                <img
                    src={heroImage}
                    alt="Students success"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                />
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center text-white">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={fadeIn}
                        className="max-w-3xl"
                    >
                        <p className="text-sm font-bold tracking-widest uppercase mb-4 text-white/90">
                            For Students & Graduates
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6">
                            Your gateway to career success in Australia.
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Programs Cards Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8 items-stretch">
                        {/* Card 3: Intern Jobs */}
                        <Link href="/internship-program" className="h-full">
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-[2rem] p-10 flex flex-col h-full shadow-2xl border border-primary/5 relative overflow-hidden group cursor-pointer"
                            >
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                                    <Briefcase className="w-8 h-8" />
                                </div>

                                <h3 className="text-3xl font-serif text-primary mb-6">
                                    Customized Internship Program
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    Gain hands-on career experience in a real business environment
                                    with industry leaders.
                                </p>

                                <div className="space-y-4 mb-12 flex-1">
                                    {[
                                        "Real-world business experience",
                                        "Industry-specific skill development",
                                        "Professional networking opportunities",
                                        "Stand out in the job market",
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                            <span className="text-gray-700 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg group-hover:shadow-xl transition-all">
                                    Learn More <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </motion.div>
                        </Link>
                        {/* Card 1: DataCAP */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2rem] p-10 flex flex-col h-full shadow-2xl border border-primary/5 relative overflow-hidden group"
                        >
                            <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                                <BarChart3 className="w-8 h-8" />
                            </div>

                            <h3 className="text-3xl font-serif text-primary mb-6">DataCAP</h3>

                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                Our Data Competency Assessment Program evaluates your technical
                                proficiency and analytical skills.
                            </p>

                            <div className="space-y-4 mb-12 flex-1">
                                {[
                                    "Technical proficiency evaluation",
                                    "Analytical skills assessment",
                                    "Connect with data-driven organizations",
                                    "Showcase your unique insights",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/datacap">
                                <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg group-hover:shadow-xl transition-all">
                                    Learn More <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Card 2: Learning Hub */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-[2rem] p-10 flex flex-col h-full shadow-2xl border border-primary/5 relative overflow-hidden group"
                        >
                            <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 text-primary">
                                <Notebook className="w-8 h-8" />
                            </div>

                            <h3 className="text-3xl font-serif text-primary mb-6">
                                Learning Hub
                            </h3>

                            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                A mentor-driven learning space that helps students build
                                confidence by understanding how careers and hiring really work
                                in Australia.
                            </p>

                            <div className="space-y-4 mb-12 flex-1">
                                {[
                                    "Clarify career direction and role expectations",
                                    "Identify practical skill gaps that matter to employers",
                                    "Learn from experienced industry mentors",
                                    "Make informed decisions with greater confidence",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Link href="/student-portal">
                                <Button className="w-full rounded-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-lg group-hover:shadow-xl transition-all">
                                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif text-primary mb-12 italic">
                        Launching careers, one success story at a time.
                    </h2>
                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto font-medium">
                        <div className="space-y-2">
                            <div className="text-4xl text-primary font-serif">10,000+</div>
                            <div className="text-gray-500 uppercase tracking-widest text-xs">
                                Graduates Placed
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl text-primary font-serif">90%+</div>
                            <div className="text-gray-500 uppercase tracking-widest text-xs">
                                Success Rate
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-4xl text-primary font-serif">100+</div>
                            <div className="text-gray-500 uppercase tracking-widest text-xs">
                                Partner Companies
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
