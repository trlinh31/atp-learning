import { Link } from "wouter";
import { AtSign, Facebook, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
    {
        href: "https://www.facebook.com/apextalentpartners",
        label: "Facebook",
        Icon: Facebook,
    },
    {
        href: "https://www.youtube.com/@ApexTalentPartners",
        label: "YouTube",
        Icon: Youtube,
    },
    {
        href: "https://www.linkedin.com/company/atp-global-au",
        label: "LinkedIn",
        Icon: Linkedin,
    },
    {
        href: "https://threads.net/@apextalentpartners",
        label: "Threads",
        Icon: AtSign,
    },
];

const officeLocations = [
    {
        label: "Sydney",
        address: "Level 45, 680 George Street, Sydney, NSW 2000, Australia",
    },
    {
        label: "Melbourne",
        address: "Level 3, 162 Collins St, Melbourne, VIC 3000",
    },
    {
        label: "China",
        address: "Floor 18, Building B, Enterprise Plaza, No. 125 Qingnian Street, Shenhe District, Shenyang City",
    },
    {
        label: "Vietnam",
        address: "30-32 Vuong Thua Vu Street, Khuong Thuong Ward, Thanh Xuan District, Hanoi City",
    },
];

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-16 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <img
                            src="https://atp-global.com.au/images/logo.webp"
                            alt="ATP Global"
                            className="h-10 mb-6 brightness-0 invert"
                        />
                        <div className="space-y-3 text-sm text-white/90">
                            <p className="text-xs font-semibold text-white/90 uppercase tracking-[0.2em]">
                                Our offices
                            </p>
                            <ul className="space-y-3 text-[13px]">
                                {officeLocations.map(({ label, address }) => (
                                    <li key={label}>
                                        <p className="text-white/90 font-semibold">
                                            {label}
                                        </p>
                                        <p className="leading-tight">{address}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h5 className="font-medium mb-4 text-white/90">For Students</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <Link href="/internship-program" className="hover:text-primary transition-colors">
                                    Internship Programs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/student-portal"
                                    className="hover:text-primary transition-colors"
                                >
                                    ATP Learning Hub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/success-stories"
                                    className="hover:text-primary transition-colors"
                                >
                                    Success Stories
                                </Link>
                            </li>
                            {/* <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    FAQ
                                </a>
                            </li> */}
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h5 className="font-medium mb-4 text-white/90">For Employers</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <Link
                                    href="/recruitment" className="hover:text-primary transition-colors">
                                    Recruitment Solutions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/partners" className="hover:text-primary transition-colors">
                                    Become our Partners
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <h5 className="font-medium mb-4 text-white/90">Company</h5>
                        <ul className="space-y-2 text-sm text-white/40">
                            <li>
                                <Link
                                    href="/about-us"
                                    className="hover:text-primary transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>

                            {/* <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Careers
                                </a>
                            </li> */}
                            <li>
                                {/* <a href="#" className="hover:text-primary transition-colors">
                                    Blog
                                </a> */}
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-3 mb-12">
                    <p className="text-sm font-semibold text-white/90">Social</p>
                    <div className="flex items-center gap-4 text-white/80">
                        {socialLinks.map(({ href, label, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-primary/60 hover:bg-primary/10 transition-colors"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
                    <p>© 2025 ATP Global. All rights reserved.</p>
                    <div className="flex gap-6">
                        {/* <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
