"use client";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Page() {
    const { theme } = useTheme(); // Get current theme

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-6 text-center space-y-6 bg-background text-foreground transition-colors">

            {/* Heading, Tagline, and About */}
            <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-primary">
                    Harness AI for Smarter Hiring: Introducing CV Insight's Resume Matching Tool
                </h2>
                <p className="mt-2 text-lg">
                    Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">CV Insight</span> – the AI-driven tool for effortlessly matching resumes with job descriptions. In today's competitive job market, finding the right match between candidates and job openings is essential. recruitRyte, powered by advanced AI technology, simplifies the recruitment process by automating resume screening and matching, saving time and ensuring a better fit between candidates and positions..
                </p>
            </div>

            {/* Get Started Button */}
            <div>
                <Link href="/resume-matching">
                    <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition">
                        Get Started
                    </button>
                </Link>
            </div>

            {/* Benefits and Key Points */}
            <div className="grid grid-cols-2 gap-4 max-w-lg">
                <div className="bg-card p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-primary">🔍 AI-Powered Matching</h3>
                    <p className="text-muted-foreground text-sm">
                        Automate resume screening to find the best candidates faster.
                    </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-primary">🚀 Save Time & Effort</h3>
                    <p className="text-muted-foreground text-sm">
                        Reduce manual workload and focus on interviewing top candidates.
                    </p>
                </div>
            </div>

            {/* steps */}
            {/* Resume Filtering Process */}
            <div className="relative flex flex-col items-center px-6 py-12">

                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 w-1 h-full bg-gray-300 transform -translate-x-1/2"></div>

                {/* Step 1 */}
                <div className="flex items-center w-full max-w-4xl mb-10">
                    {/* Image Left */}
                    <div className="w-1/2 flex justify-end pr-6">
                        <img src="/images/upload-resume.svg" alt="Upload Resumes" className="w-48 h-48 object-cover" />
                    </div>
                    {/* Content Right */}
                    <div className="w-1/2 bg-card p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-primary">1️⃣ Upload Job Description & Resumes</h3>
                        <p className="text-muted-foreground mt-2">
                            Start by entering the job description and uploading resumes of candidates. Our system processes each resume for relevant qualifications, skills, and experience.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center w-full max-w-4xl mb-10 flex-row-reverse">
                    {/* Image Right */}
                    <div className="w-1/2 flex justify-start pl-6">
                        <img src="/images/ai-analysis.svg" alt="AI Analysis" className="w-48 h-48 object-cover" />
                    </div>
                    {/* Content Left */}
                    <div className="w-1/2 bg-card p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-primary">2️⃣ AI Analysis & Ranking</h3>
                        <p className="text-muted-foreground mt-2">
                            Our AI-powered system compares resumes against job requirements and ranks candidates based on relevancy, experience, and key skills.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-center w-full max-w-4xl mb-10">
                    {/* Image Left */}
                    <div className="w-1/2 flex justify-end pr-6">
                        <img src="/images/shortlist-candidates.svg" alt="Shortlist Candidates" className="w-48 h-48 object-cover" />
                    </div>
                    {/* Content Right */}
                    <div className="w-1/2 bg-card p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-primary">3️⃣ Shortlist & Take Action</h3>
                        <p className="text-muted-foreground mt-2">
                            Review the top-ranked candidates in an easy-to-use dashboard. Download reports, share insights with your team, and proceed with interviews seamlessly.
                        </p>
                    </div>
                </div>

            </div>




        </div>
    );
}
