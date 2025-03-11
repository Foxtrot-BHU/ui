"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RejectedCandidates() {
    const [rejectedCandidates, setRejectedCandidates] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem("rejectedCandidates");
        if (storedData) {
            setRejectedCandidates(JSON.parse(storedData));
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <button onClick={() => router.push("/resume-matching/dashboard")} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Back to Dashboard</button>
            <h1 className="text-2xl font-bold mb-4">Rejected Candidates</h1>

            {rejectedCandidates.length === 0 ? <p>No rejected candidates</p> :
                rejectedCandidates.map((candidate, index) => (
                    <div key={index} className="border p-4 mb-4">
                        <h2 className="text-xl font-bold">{candidate.Name}</h2>
                        <p>Skills: {candidate.Skills.join(", ")}</p>
                        <p>Experience: {candidate["Years of Experience"]}</p>
                    </div>
                ))
            }
        </div>
    );
}
