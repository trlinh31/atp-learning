import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CloudUpload, Share2 } from "lucide-react";

const upload_cv = () => {
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [showFacebookStep, setShowFacebookStep] = useState(false);
    const [contactMethod, setContactMethod] = useState<"facebook" | "whatsapp">("facebook");
    const [contactValue, setContactValue] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files?.[0]) {
            setCvFile(event.dataTransfer.files[0]);
            setSubmitted(false);
            setError("");
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setCvFile(file);
            setSubmitted(false);
            setError("");
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!cvFile) {
            setError("Please upload your CV before continuing.");
            return;
        }
        setShowFacebookStep(true);
    };

    const handleDone = (event: FormEvent) => {
        event.preventDefault();
        if (!contactValue.trim()) {
            setError(
                contactMethod === "facebook"
                    ? "Provide a Facebook URL so we can reach you."
                    : "Provide a valid Australian WhatsApp number."
            );
            return;
        }

        if (
            contactMethod === "whatsapp" &&
            !/^\+?61\d{9}$/.test(contactValue.replace(/\s+/g, ""))
        ) {
            setError("Enter an Australian phone number (e.g. +614XXXXXXXX).");
            return;
        }
        setError("");
        setShowFacebookStep(false);
        setSubmitted(true);
        setShowSuccessPopup(true);
    };

    const uploadHint = submitted
        ? "CV submitted. Expect a confirmation within 48 hours."
        : "Drag & drop or browse to upload your CV."
        ;

    useEffect(() => {
        if (!showSuccessPopup) return;
        const timer = setTimeout(() => setShowSuccessPopup(false), 5000);
        return () => clearTimeout(timer);
    }, [showSuccessPopup]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <Navbar />

            <main className="relative overflow-hidden">
                <header className="bg-white/70 border-b border-gray-100">
                    <div className="container mx-auto px-4 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto space-y-4 text-center"
                        >
                            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-primary">
                                Submit CV
                            </p>
                            <h1 className="text-4xl font-serif leading-tight text-slate-900">
                                Share your CV and we will reach out with matched opportunities.
                            </h1>
                        </motion.div>
                    </div>
                </header>

                <section className="container mx-auto px-4 py-16">
                    <div className="mx-auto max-w-3xl">
                        <Card className="rounded-[2rem] border border-primary/20 bg-white shadow-[0_40px_80px_rgba(15,23,42,0.08)]">
                            <CardContent className="p-10 space-y-6">
                                <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                                    <CloudUpload className="h-5 w-5" />
                                    <span>CV Upload</span>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <label
                                        onDragOver={(event) => event.preventDefault()}
                                        onDrop={handleDrop}
                                        className="flex flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-gray-200 bg-slate-50/80 p-10 text-center text-sm text-muted-foreground transition hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                                    >
                                        <div className="w-full space-y-2">
                                            <p className="text-lg font-semibold text-foreground">
                                                {submitted ? "CV received" : "Drop your CV here"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Supported formats PDF, DOC/DOCX, PNG, JPG, WebP · Max 10MB
                                            </p>
                                            <p className="text-sm text-primary">{uploadHint}</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                                            className="sr-only"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    {cvFile && (
                                        <p className="text-sm font-medium text-foreground">
                                            Selected file: {cvFile.name}
                                        </p>
                                    )}
                                    {error && !showFacebookStep && (
                                        <p className="text-sm text-destructive">{error}</p>
                                    )}
                                    <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                                        <Button className="rounded-full bg-primary px-8 py-3 text-base font-semibold shadow-xl">
                                            Submit CV
                                        </Button>
                                        <Link href="/job-search" className="text-sm font-semibold text-primary">
                                            Back to job search
                                        </Link>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </main>

            <Footer />

            {showFacebookStep && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-8 shadow-2xl"
                    >
                        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-primary">
                            <Share2 className="h-5 w-5" />
                            <span>One last step</span>
                        </div>
                        <h2 className="mt-4 text-2xl font-serif text-slate-900">One last step to help us get to you</h2>
                        <p className="mt-3 text-sm text-muted-foreground">
                            Choose whether we should reach you on Facebook or WhatsApp—pick one, tell us your handle, and we will only contact you once the right opportunity is ready.
                        </p>
                        <form className="mt-6 space-y-4" onSubmit={handleDone}>
                            <div className="flex flex-wrap gap-3 text-sm font-semibold">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setContactMethod("facebook");
                                        setContactValue("");
                                        setError("");
                                    }}
                                    className={`flex items-center gap-2 rounded-full border px-4 py-2 transition ${contactMethod === "facebook"
                                            ? "border-primary bg-primary/20 text-primary"
                                            : "border-gray-200 text-muted-foreground"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={contactMethod === "facebook"}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    Facebook URL
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setContactMethod("whatsapp");
                                        setContactValue("");
                                        setError("");
                                    }}
                                    className={`flex items-center gap-2 rounded-full border px-4 py-2 transition ${contactMethod === "whatsapp"
                                            ? "border-primary bg-primary/20 text-primary"
                                            : "border-gray-200 text-muted-foreground"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={contactMethod === "whatsapp"}
                                        readOnly
                                        className="h-4 w-4"
                                    />
                                    WhatsApp number
                                </button>
                            </div>
                            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
                                {contactMethod === "facebook" ? "Facebook URL" : "Australian WhatsApp number"}
                                <input
                                    type={contactMethod === "facebook" ? "url" : "tel"}
                                    placeholder={
                                        contactMethod === "facebook"
                                            ? "https://www.facebook.com/yourprofile"
                                            : "+614XXXXXXXX"
                                    }
                                    value={contactValue}
                                    onChange={(event) => setContactValue(event.target.value)}
                                    className="rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:bg-white"
                                    required
                                />
                            </label>
                            {error && <p className="text-xs text-destructive">{error}</p>}
                            <div className="flex justify-end">
                                <Button className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white">
                                    Done
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {showSuccessPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary/40 to-amber-400/30 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-lg rounded-[2.5rem] border border-white/30 bg-white p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.25)]"
                    >
                        <div className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.5em] text-primary">
                            <CheckCircle2 className="h-6 w-6" />
                            <span>Success</span>
                        </div>
                        <p className="mt-4 text-2xl font-serif text-slate-900">
                            One more step closer to your true potential!
                        </p>
                        <p className="mt-3 text-base leading-relaxed text-slate-600">
                            We will reach out to you within 24 hours.
                        </p>
                        <Button
                            onClick={() => setShowSuccessPopup(false)}
                            className="mt-6 rounded-full bg-primary px-10 py-3 text-base font-semibold text-white shadow-xl"
                        >
                            Let&apos;s go!
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default upload_cv;
