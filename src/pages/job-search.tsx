import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Building2, Clock, ArrowRight, X, User, LogOut, ChevronDown, DollarSign, BadgeCheck, Plus, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Member } from "@/services/authService";
import { mockInternJobs, mockLocations, mockFunctions, mockIndustries, mockJobTypes, addNewJob, type InternJob } from "@/mocks/data";

function SingleSelectDropdown({
    label,
    options,
    selected,
    onChange,
    placeholder
}: {
    label: string;
    options: { value: string; label: string }[];
    selected: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(o => o.value === selected);

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 text-left flex items-center justify-between"
                >
                    <span className={!selected ? "text-gray-500" : ""}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => { onChange(option.value); setIsOpen(false); }}
                                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 text-sm ${selected === option.value ? 'text-primary font-medium bg-primary/5' : 'text-gray-700'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {selected && (
                <div className="flex flex-wrap gap-1 mt-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {selectedOption?.label}
                        <button onClick={() => onChange("")} className="hover:text-primary/70">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}

function MultiSelectDropdown({
    label,
    options,
    selected,
    onChange,
    placeholder
}: {
    label: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
    placeholder: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter(s => s !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const removeOption = (option: string) => {
        onChange(selected.filter(s => s !== option));
    };

    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 text-left flex items-center justify-between"
                >
                    <span className={selected.length === 0 ? "text-gray-500" : ""}>
                        {selected.length === 0 ? placeholder : `${selected.length} selected`}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                            {options.map((option) => (
                                <label
                                    key={option}
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(option)}
                                        onChange={() => toggleOption(option)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {selected.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {selected.length <= 3 ? (
                        selected.map((item) => (
                            <span
                                key={item}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                                {item}
                                <button onClick={() => removeOption(item)} className="hover:text-primary/70">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {selected.length}+ selections
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

function JobListCard({ job, isSelected, onClick }: { job: InternJob; isSelected: boolean; onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`p-4 bg-white rounded-xl border-2 cursor-pointer transition-all ${isSelected
                ? 'border-primary shadow-lg'
                : 'border-transparent shadow hover:shadow-md hover:border-gray-200'
                }`}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-primary text-sm leading-tight">{job.title}</h3>
                <div className="flex gap-1 flex-shrink-0">
                    {job.isAtpPartner && (
                        <span className="px-2 py-0.5 rounded-full bg-secondary text-primary text-[10px] font-medium whitespace-nowrap">
                            ATP Partner
                        </span>
                    )}
                    {job.isPaid && (
                        <span className="px-2 py-0.5 rounded-full bg-success text-white text-[10px] font-medium">
                            Paid
                        </span>
                    )}
                </div>
            </div>

            <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    <span>{job.industry}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{job.jobType}</span>
                </div>
            </div>
        </div>
    );
}

function JobDetailsPanel({ job, panelRef }: { job: InternJob; panelRef?: React.RefObject<HTMLDivElement | null> }) {
    return (
        <div ref={panelRef} className="bg-white rounded-2xl shadow-lg h-full overflow-y-auto">
            <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm px-6 lg:px-8 py-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <h2 className="text-2xl font-serif text-primary">{job.title}</h2>
                    {job.isAtpPartner && (
                        <span className="px-3 py-1 rounded-full bg-secondary text-primary text-xs font-medium whitespace-nowrap flex-shrink-0">
                            ATP Partner
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{job.isPaid ? 'Paid' : 'Unpaid'}</span>
                    </div>
                </div>

                <Link href={`/apply-internship/${job.id}`}>
                    <Button className="w-full sm:w-auto rounded-xl bg-primary text-white hover:bg-primary/90 px-8 py-3 shadow-lg shadow-primary/20">
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Apply Now
                    </Button>
                </Link>
            </div>

            <div className="px-6 lg:px-8 pt-6 pb-8 space-y-6">
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                    <p className="text-gray-600 leading-relaxed">{job.description}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                            <li key={index} className="text-gray-600 flex items-start gap-2">
                                <span className="text-primary mt-1">-</span>
                                <span>{req}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What You'll Do</h3>
                    <ul className="space-y-2">
                        {job.whatYoullDo.map((item, index) => (
                            <li key={index} className="text-gray-600 flex items-start gap-2">
                                <span className="text-primary mt-1">-</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-600 flex items-start gap-2">
                                <BadgeCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-3">Why Choose ATP</h3>
                    <ul className="space-y-2">
                        <li className="text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <span><strong>Personalized Career Guidance:</strong> Receive one-on-one career roadmap consultations to gain clarity and direction early in your academic journey.</span>
                        </li>
                        <li className="text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <span><strong>Professional Application Support:</strong> Get expert assistance in crafting CVs and cover letters that meet Australian industry standards and impress employers.</span>
                        </li>
                        <li className="text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <span><strong>Interview Preparation:</strong> Build confidence and sharpen your communication skills through in-depth interview coaching tailored to the Australian job market.</span>
                        </li>
                        <li className="text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <span><strong>Industry Network Access:</strong> Connect with reputable companies and unlock job opportunities aligned with your field.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function PostJobModal({
    isOpen,
    onClose,
    onSuccess,
    isAuthenticated
}: {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (job: InternJob) => void;
    isAuthenticated: boolean;
}) {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        industry: '',
        jobType: '' as 'Internship' | 'Part-time' | 'Casual' | '',
        isPaid: false,
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.company || !formData.location || !formData.industry || !formData.jobType || !formData.description) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const newJob = addNewJob({
                title: formData.title,
                company: formData.company,
                location: formData.location,
                industry: formData.industry,
                jobType: formData.jobType as 'Internship' | 'Part-time' | 'Casual',
                isPaid: formData.isPaid,
                description: formData.description
            });

            setIsSubmitting(false);
            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setFormData({ title: '', company: '', location: '', industry: '', jobType: '', isPaid: false, description: '' });
                onSuccess(newJob);
                onClose();
            }, 1500);
        }, 500);
    };

    if (!isOpen) return null;

    const postJobTypes = ['Internship', 'Part-time', 'Casual'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
            >
                {showSuccess ? (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-serif text-primary mb-2">Job Posted Successfully!</h3>
                        <p className="text-gray-600">Your job listing is now live.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-serif text-primary">Post a Job</h2>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            {!isAuthenticated && (
                                <p className="text-sm text-amber-600 mt-2 bg-amber-50 p-2 rounded-lg">
                                    Tip: <Link href="/login" className="underline font-medium">Log in</Link> to edit your job posts later.
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Marketing Intern"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                <input
                                    type="text"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="e.g. ABC Company"
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                    <select
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                                        required
                                    >
                                        <option value="">Select location</option>
                                        {mockLocations.map((loc) => (
                                            <option key={loc.value} value={loc.label}>{loc.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                                        required
                                    >
                                        <option value="">Select industry</option>
                                        {mockIndustries.map((ind) => (
                                            <option key={ind} value={ind}>{ind}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type *</label>
                                    <select
                                        value={formData.jobType}
                                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value as 'Internship' | 'Part-time' | 'Casual' })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                                        required
                                    >
                                        <option value="">Select type</option>
                                        {postJobTypes.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Compensation</label>
                                    <div className="flex items-center gap-4 h-[50px]">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="isPaid"
                                                checked={!formData.isPaid}
                                                onChange={() => setFormData({ ...formData, isPaid: false })}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-gray-700">Unpaid</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="isPaid"
                                                checked={formData.isPaid}
                                                onChange={() => setFormData({ ...formData, isPaid: true })}
                                                className="w-4 h-4 text-primary focus:ring-primary"
                                            />
                                            <span className="text-sm text-gray-700">Paid</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                                    rows={4}
                                    className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900 resize-none"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-xl bg-primary text-white hover:bg-primary/90 py-3 shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? 'Posting...' : 'Post Job'}
                            </Button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}

export function OldNavigation({
    isAuthenticated,
    member,
    logout
}: {
    isAuthenticated: boolean;
    member: Member | null;
    logout: () => void;
}) {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <img
                            src="https://atp-global.com.au/images/logo.webp"
                            alt="ATP Global"
                            className="h-12 w-auto object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-600">
                    <div className="relative group">
                        <button className="hover:text-primary transition-colors flex items-center gap-1">
                            Students & Graduates
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <Link href="/job-search" className="block px-4 py-2 bg-primary/5 text-primary font-medium">Intern Jobs</Link>
                            <a href="https://atp-global.com.au/testimonials" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors">Testimonials</a>
                            <div className="border-t border-gray-100 my-1"></div>
                            <Link href="/datacap" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors">DataCAP</Link>
                            <a href="https://atp-global.com.au/danh-gia-nang-luc" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors">Core Competency Assessment</a>
                        </div>
                    </div>

                    <div className="relative group">
                        <button className="hover:text-primary transition-colors flex items-center gap-1">
                            Employers
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                            <a href="https://atp-global.com.au/recruitment" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors">Recruitment</a>
                            <a href="https://atp-global.com.au/partner" className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-primary transition-colors">Partners</a>
                        </div>
                    </div>

                    <a href="https://talent.atp-global.com.au" className="hover:text-primary transition-colors">Community</a>
                    <a href="https://atp-global.com.au/about-us" className="hover:text-primary transition-colors">About Us</a>
                    <a href="https://atp-global.com.au/contact-us" className="hover:text-primary transition-colors">Contact Us</a>
                </div>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/student-portal">
                                <Button variant="ghost" className="rounded-full hover:bg-primary/5 text-primary cursor-pointer">
                                    <User className="w-4 h-4 mr-2" />
                                    {member?.first_name || 'Portal'}
                                </Button>
                            </Link>
                            <Button
                                onClick={logout}
                                variant="outline"
                                className="rounded-full border-primary/20 text-primary hover:bg-primary/5 cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-6 shadow-lg shadow-primary/20">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default function JobSearch() {
    const { member, isAuthenticated, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilters, setLocationFilters] = useState<string[]>([]);
    const [functionFilters, setFunctionFilters] = useState<string[]>([]);
    const [industryFilters, setIndustryFilters] = useState<string[]>([]);
    const [jobTypeFilters, setJobTypeFilters] = useState<string[]>([]);
    const [contractFilter, setContractFilter] = useState("");
    const [atpPartnerOnly, setAtpPartnerOnly] = useState(false);
    const [selectedJob, setSelectedJob] = useState<InternJob | null>(null);
    const [showMobileDetails, setShowMobileDetails] = useState(false);
    const [showPostJobModal, setShowPostJobModal] = useState(false);
    const [jobsVersion, setJobsVersion] = useState(0);
    const detailsPanelRef = useRef<HTMLDivElement>(null);

    const filteredJobs = useMemo(() => {
        return mockInternJobs.filter((job) => {
            const matchesSearch = searchQuery === "" ||
                job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLocation = locationFilters.length === 0 || locationFilters.some(loc => job.location.toLowerCase() === loc.toLowerCase());
            const matchesFunction = functionFilters.length === 0 || functionFilters.includes(job.function);
            const matchesIndustry = industryFilters.length === 0 || industryFilters.includes(job.industry);
            const matchesJobType = jobTypeFilters.length === 0 || jobTypeFilters.includes(job.jobType);
            const matchesContract = contractFilter === "" ||
                (contractFilter === "paid" && job.isPaid) ||
                (contractFilter === "unpaid" && !job.isPaid);
            const matchesPartner = !atpPartnerOnly || job.isAtpPartner;

            return matchesSearch && matchesLocation && matchesFunction && matchesIndustry && matchesJobType && matchesContract && matchesPartner;
        });
    }, [searchQuery, locationFilters, functionFilters, industryFilters, jobTypeFilters, contractFilter, atpPartnerOnly, jobsVersion]);

    const handleJobPosted = (newJob: InternJob) => {
        setJobsVersion(v => v + 1);
        resetFilters();
        setSelectedJob(newJob);
        setShowMobileDetails(true);
    };

    useEffect(() => {
        if (filteredJobs.length > 0 && !selectedJob) {
            setSelectedJob(filteredJobs[0]);
        } else if (filteredJobs.length > 0 && selectedJob && !filteredJobs.find(j => j.id === selectedJob.id)) {
            setSelectedJob(filteredJobs[0]);
        } else if (filteredJobs.length === 0) {
            setSelectedJob(null);
        }
    }, [filteredJobs, selectedJob]);

    const resetFilters = () => {
        setSearchQuery("");
        setLocationFilters([]);
        setFunctionFilters([]);
        setIndustryFilters([]);
        setJobTypeFilters([]);
        setContractFilter("");
        setAtpPartnerOnly(false);
    };

    const hasActiveFilters = searchQuery || locationFilters.length > 0 || functionFilters.length > 0 || industryFilters.length > 0 || jobTypeFilters.length > 0 || contractFilter || atpPartnerOnly;

    const handleJobSelect = (job: InternJob) => {
        setSelectedJob(job);
        setShowMobileDetails(true);
    };

    useEffect(() => {
        if (detailsPanelRef.current) {
            detailsPanelRef.current.scrollTo({ top: 0 });
        }
    }, [selectedJob?.id]);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden">
            <Navbar />

            <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-br from-secondary/50 via-white to-primary/5">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                            {filteredJobs.length} opportunities available
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-serif text-primary mb-6">
                            Find Your <span className="text-accent">Internship</span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Discover internship opportunities across Australia. Filter by location, industry, and role to find your perfect match.
                        </p>

                        <div className="relative max-w-2xl mx-auto">
                            <div className="flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="flex-1 flex items-center px-6 py-4">
                                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                                    <input
                                        type="text"
                                        placeholder="Search by job title, company, or keyword..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                                <Button
                                    className="rounded-xl bg-primary text-white hover:bg-primary/90 px-8 py-6 m-2 shadow-lg shadow-primary/20"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    Search
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="bg-white border-b border-gray-100 py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-start">
                        <MultiSelectDropdown
                            label="Location"
                            options={mockLocations.map(loc => loc.label)}
                            selected={locationFilters}
                            onChange={setLocationFilters}
                            placeholder="All Locations"
                        />

                        <MultiSelectDropdown
                            label="Function"
                            options={mockFunctions}
                            selected={functionFilters}
                            onChange={setFunctionFilters}
                            placeholder="All Functions"
                        />

                        <MultiSelectDropdown
                            label="Industry"
                            options={mockIndustries}
                            selected={industryFilters}
                            onChange={setIndustryFilters}
                            placeholder="All Industries"
                        />

                        <MultiSelectDropdown
                            label="Job Type"
                            options={mockJobTypes}
                            selected={jobTypeFilters}
                            onChange={setJobTypeFilters}
                            placeholder="All Types"
                        />

                        <SingleSelectDropdown
                            label="Paid / Unpaid"
                            options={[
                                { value: "", label: "All" },
                                { value: "paid", label: "Paid Only" },
                                { value: "unpaid", label: "Unpaid Only" }
                            ]}
                            selected={contractFilter}
                            onChange={setContractFilter}
                            placeholder="All"
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Job Source</label>
                            <div className="flex items-center gap-3 h-[50px]">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={atpPartnerOnly}
                                        onChange={(e) => setAtpPartnerOnly(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <span className="text-sm text-gray-700">ATP Partner Only</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="mt-4 flex items-center gap-3">
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                            >
                                <X className="w-3 h-3" />
                                Reset all filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-12 bg-secondary/30 min-h-[780px]">
                <div className="container mx-auto px-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <h2 className="text-xl font-serif text-primary">
                            Found <span className="text-accent">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'result' : 'results'}
                        </h2>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-600">Looking to post a job?</span>
                            <button
                                onClick={() => setShowPostJobModal(true)}
                                className="inline-flex items-center gap-1 text-primary font-medium hover:underline"
                            >
                                <Plus className="w-4 h-4" />
                                Click here
                            </button>
                        </div>
                    </div>

                    {filteredJobs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-serif text-primary mb-2">No jobs found</h3>
                            <p className="text-gray-500 mb-6">More opportunities are on the way — submit your CV and we’ll reach out when a role matches your profile.</p>
                            <Link href="/upload-cv">
                                <Button
                                    // className="rounded-full border-primary/20 text-primary hover:bg-primary/5"
                                    className="rounded-full border-primary/20 text-secondary hover:bg-red-500/60 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                >
                                    Submit CV
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-5 gap-6">
                            <div className={`lg:col-span-2 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto pr-2 ${showMobileDetails ? 'hidden lg:block' : ''}`}>
                                {filteredJobs.map((job) => (
                                    <JobListCard
                                        key={job.id}
                                        job={job}
                                        isSelected={selectedJob?.id === job.id}
                                        onClick={() => handleJobSelect(job)}
                                    />
                                ))}
                            </div>

                            <div className={`lg:col-span-3 min-h-[560px] lg:h-[calc(100vh-100px)] ${!showMobileDetails ? 'hidden lg:block' : ''}`}>
                                {showMobileDetails && (
                                    <button
                                        onClick={() => setShowMobileDetails(false)}
                                        className="lg:hidden mb-4 inline-flex items-center gap-2 text-primary font-medium"
                                    >
                                        <ArrowRight className="w-4 h-4 rotate-180" />
                                        Back to job list
                                    </button>
                                )}
                                {selectedJob && <JobDetailsPanel job={selectedJob} panelRef={detailsPanelRef} />}
                            </div>
                        </div>
                    )}
                </div>
            </section >

            <section className="py-16 bg-primary text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-serif mb-6">
                        Can't find what you're looking for?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Submit your CV and we'll contact you when a suitable role becomes available.
                    </p>
                    <Link href="/upload-cv">
                        <Button className="rounded-full bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                            Submit Your CV
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </section>
            <Footer />
            <PostJobModal
                isOpen={showPostJobModal}
                onClose={() => setShowPostJobModal(false)}
                onSuccess={handleJobPosted}
                isAuthenticated={isAuthenticated}
            />
        </div >
    );
}
