import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Search,
    CheckCircle2,
    Users,
    Building2,
    TrendingUp,
    Target,
    Briefcase,
    Layers,
    Sparkles,
    Globe,
    Award,
    ChevronRight,
    ShieldCheck,
    Cpu,
    Clock
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Recruitment() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const services = [
        {
            title: "Permanent Recruitment",
            desc: "Long-term hiring solutions focused on cultural and skill alignment. Tailored selection process for lasting success.",
            icon: <Building2 className="w-6 h-6" />
        },
        {
            title: "Contract & Temporary Staffing",
            desc: "Fast access to qualified professionals for projects or peak seasons. Flexible, short-term staffing with immediate contribution.",
            icon: <Clock className="w-6 h-6" />
        },
        {
            title: "Executive Search",
            desc: "Recruitment for senior and specialized leadership roles. Deep industry insight to identify top-tier candidates.",
            icon: <Award className="w-6 h-6" />
        }
    ];

    const processSteps = [
        {
            title: "Needs Assessment",
            desc: "Deep consultation to understand goals, values, and talent needs defining the right skills and cultural fit."
        },
        {
            title: "Sourcing Strategy",
            desc: "Combining active and passive sourcing leveraging our talent network and targeted advertising."
        },
        {
            title: "Screening & Interviewing",
            desc: "Pre-screening, assessments, and initial interviews to shortlist only the most qualified professionals."
        },
        {
            title: "Client Review & Selection",
            desc: "Coordinating interviews, gathering feedback, and providing hiring insights for confident decision-making."
        },
        {
            title: "Onboarding & Follow-Up",
            desc: "Ensuring smooth transition with onboarding support and post-placement check-ins for lasting success."
        }
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div initial="initial" animate="animate" variants={fadeIn}>
                            <h1 className="text-5xl lg:text-7xl font-serif text-primary mb-8 leading-tight uppercase tracking-tight">
                                Recruitment <br className="hidden md:block" /> Services
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                End-to-end recruitment solutions tailored to your needs—from entry-level to executive roles—ensuring every hire aligns with your culture and goals.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[21/9]"
                    >
                        <img
                            src="https://atp-global.com.au/images/recruitment-banner.jpg"
                            alt="Recruitment Banner"
                            className="w-full h-full object-cover grayscale opacity-90"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Core Services */}
            <section className="py-24 bg-secondary/20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-primary/5 flex flex-col h-full"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-8">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-serif text-primary mb-6">{service.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed flex-1">{service.desc}</p>
                                <div className="mt-8 pt-6 border-t border-gray-50">
                                    <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                        Learn More <ArrowRight className="w-3 h-3" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Headhunting Advantage */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto mb-32">
                        <div className="relative">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img src="https://atp-global.com.au/images/headhunting-service-1.webp" alt="Headhunting" className="w-full h-auto" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/5 rounded-[3rem] -z-10" />
                        </div>
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                Exclusive Advantage
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-serif text-primary uppercase leading-tight">Our Headhunting <br /> Service</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                We offer a unique advantage in IT recruitment across Australia — connecting you with top professionals through our exclusive network of AI and Data experts.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Access to pre-qualified pool of top IT talent",
                                    "Fast matching process to reduce hiring time",
                                    "Expert consultants specializing in AI and Data",
                                    "Tailored approach for unique requirements"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
                        <div className="order-2 lg:order-1 space-y-8">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                Global Network
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-serif text-primary uppercase leading-tight">Global Tech Candidate Community</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Gain access to a dedicated global network of tech talent, with a strong focus on AI, Data, and emerging technologies — ready to meet your specific recruitment needs.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Worldwide reach with strong presence in Australia",
                                    "Deep network of experienced professionals",
                                    "Specialization in AI and Software Engineering",
                                    "Candidate engagement ensuring readiness"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative">
                            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img src="https://atp-global.com.au/images/headhunting-service-2.webp" alt="Global Community" className="w-full h-auto" />
                            </div>
                            <div className="absolute -top-6 -left-6 w-full h-full bg-primary/5 rounded-[3rem] -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Recruitment Process */}
            <section className="py-24 bg-[#111111] text-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase">Our Process</h2>
                        <div className="h-1 w-20 bg-primary mx-auto mb-6" />
                        <p className="text-white/60 text-lg italic font-serif">Seamless hiring, quality results</p>
                    </div>

                    <div className="grid md:grid-cols-5 gap-12">
                        {processSteps.map((step, i) => (
                            <div key={i} className="relative text-center group">
                                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-8 transition-all duration-500 relative">
                                    <span className="text-xl font-serif font-bold text-white transition-colors duration-500">0{i + 1}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed px-2">{step.desc}</p>
                                {i < 4 && (
                                    <div className="hidden lg:flex absolute top-8 left-[75%] w-[50%] h-[2px] items-center z-0">
                                        <div className="h-full w-full bg-white/20" />
                                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[8px] border-l-white/20 ml-[-2px]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bonus Package & Global Advantage */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="bg-secondary/30 p-12 rounded-[3.5rem] border border-primary/5">
                            <h3 className="text-3xl font-serif text-primary mb-10 uppercase tracking-tight">Bonus Package</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { name: "Strategy Consultant", icon: <Sparkles /> },
                                    { name: "Recruitment Advisory", icon: <Briefcase /> },
                                    { name: "Competency Framework", icon: <Layers /> },
                                    { name: "Branding Support", icon: <Target /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
                                        <div className="text-primary group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <span className="font-bold text-xs uppercase tracking-wider">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-xs text-gray-500 italic">Included when you use our recruitment solution.</p>
                        </div>

                        <div className="flex flex-col justify-center">
                            <h3 className="text-3xl font-serif text-primary mb-10 uppercase tracking-tight">Global Advantage</h3>
                            <div className="grid grid-cols-2 gap-12">
                                {[
                                    { label: "Candidates", val: "200,000+", icon: <Users /> },
                                    { label: "Talent Hubs", val: "3", icon: <Globe /> },
                                    { label: "Relocation Support", val: "100%", icon: <Cpu /> },
                                    { label: "Experience", val: "10+ Years", icon: <Award /> }
                                ].map((item, i) => (
                                    <div key={i} className="space-y-3">
                                        <div className="text-primary mb-2">{item.icon}</div>
                                        <div className="text-4xl font-serif text-primary leading-none">{item.val}</div>
                                        <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-24 bg-primary text-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-6xl font-serif mb-6 uppercase tracking-tight">Get in Touch</h2>
                        <p className="text-white/80 text-lg max-w-xl mx-auto font-serif italic">
                            Tailoring recruitment solutions for your business.
                        </p>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-10 lg:p-16 text-gray-900 shadow-3xl">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                    <input type="text" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="John" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                    <input type="text" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                <input type="email" className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Additional Information</label>
                                <textarea rows={4} className="w-full p-4 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm resize-none" placeholder="How can we help you?" />
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                    By providing your personal information, you agree to our Collection Notice and Privacy Policy. We take data protection seriously.
                                </p>
                            </div>

                            <Button className="w-full rounded-2xl bg-primary text-white hover:bg-primary/90 py-10 text-xl font-bold uppercase tracking-widest shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                                Send Message <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
