"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const [rankedCandidates, setRankedCandidates] = useState([]);

    useEffect(() => {
        const storedCandidates = localStorage.getItem("rankedCandidates");
        if (storedCandidates) {
            setRankedCandidates(JSON.parse(storedCandidates));
            localStorage.removeItem("rankedCandidates");
        }
    }, []);

    return (
        <main className="flex flex-col items-center min-h-screen p-6 space-y-6">
            <h2 className="text-3xl font-semibold">Top Ranked Candidates</h2>

            {rankedCandidates.length > 0 ? (
                <div className="w-full max-w-2xl p-4 border rounded-md space-y-6">
                    {rankedCandidates.map((candidate, index) => (
                        <div key={index} className="border p-4 rounded-md space-y-3">
                            {/* Basic Info */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold">{candidate.name}</h3>
                                    <p className="text-sm text-gray-600">{candidate.address}</p>
                                </div>
                                <span className="text-blue-500 font-medium">Match: {candidate.match_score}%</span>
                            </div>

                            {/* Experience */}
                            <div className="border p-3 rounded-md">
                                <h4 className="text-md font-semibold">Experience</h4>
                                <ul className="list-disc pl-5">
                                    {candidate.experience.map((exp, i) => (
                                        <li key={i}>{exp.company} - {exp.years} years</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Skills */}
                            <div className="border p-3 rounded-md">
                                <h4 className="text-md font-semibold">Skills</h4>
                                <p className="text-sm text-gray-700">{candidate.skills.join(", ")}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end space-x-3">
                                <Button variant="success">Approve</Button>
                                <Button variant="warning">Hold</Button>
                                <Button variant="destructive">Reject</Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No ranked candidates found. Please upload resumes first.</p>
            )}
        </main>
    );
}
