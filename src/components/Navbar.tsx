import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [location] = useLocation();

    const navLinks = [
        { href: "/students-graduates", label: "Students & Graduates" },
        { href: "/programs", label: "Employers" },
        { href: "/job-search", label: "Job Board" },
        { href: "/partners-opportunities", label: "Our Partners" },
        // { href: "/about-us", label: "About Us" },
    ];


    return (
        <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <img
                            src="https://atp-global.com.au/images/logo.webp"
                            alt="ATP Global logo"
                            className="h-12 w-auto object-contain cursor-pointer"
                        />
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-primary transition-colors ${location === link.href ? 'text-primary' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/about-us">
                        <Button variant="outline" className="hidden sm:flex rounded-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary">
                            About Us
                        </Button>
                    </Link>
                    <Link href="/contact-us">
                        <Button className="rounded-full bg-primary text-white hover:bg-primary/90 px-6">
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
