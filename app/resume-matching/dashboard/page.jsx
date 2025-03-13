"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { idAtom } from "@/components/store";
import path from "path";

// Chart.js and react-chartjs-2
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// Register chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useAtom(idAtom);
    const pageSize = 5;

    const fetchCandidates = (page) => {
        setLoading(true);
        fetch(`http://localhost:8000/analysis/${id}?pgindex=${page - 1}&pgsize=${pageSize}`)
            .then((res) => res.json())
            .then((data) => {
                setCandidates(data);
                console.log(data)
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load candidates");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCandidates(currentPage);
    }, [currentPage]);

    // Function to remove rejected candidate from state
    const handleReject = (index) => {
        setCandidates((prev) => prev.filter((_, i) => i !== index));
        toast.error("Candidate Rejected!");
    };

    // Function to generate data for the donut chart based on match score
    const getMatchScoreChartData = (score) => ({
        labels: ["Match Score", "Remaining"],
        datasets: [
            {
                data: [score, 100 - score],
                backgroundColor: ["#4caf50", "#e0e0e0"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    });

    return (
        <main className="flex flex-col items-center min-h-screen p-6 space-y-6">
            <h2 className="text-3xl font-semibold">Candidate Dashboard</h2>

            {loading ? (
                <p className="text-gray-500">Loading candidates...</p>
            ) : candidates.length > 0 ? (
                <div className="w-full max-w-3xl space-y-6">
                    {candidates.map((candidate, index) => (
                        <Card key={index} className="border shadow-md rounded-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">{candidate.Name}</CardTitle>
                                <p className="text-sm text-gray-500">{candidate.Email[0]}</p>
                                <p className="text-sm text-gray-500">{candidate.Phone[0]}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Skills */}
                                <div>
                                    <h4 className="font-semibold text-md">Skills</h4>
                                    <p className="text-sm text-gray-700">{candidate.Skills.join(", ")}</p>
                                </div>
                                {/* Experience */}
                                <div>
                                    <h4 className="font-semibold text-md">Experience</h4>
                                    <p className="text-sm text-gray-700">{candidate["Years of Experience"]}</p>
                                </div>

                                {/* Donut chart for Match Score */}
                                <div className="flex justify-center items-center">
                                <Doughnut
  data={getMatchScoreChartData(candidate.Score)}
  options={{
    responsive: true, 
    maintainAspectRatio: false, // Ensures the chart can take up full width/height of its container
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
    },
  }}
  className="w-full h-30 "
/>

                                </div>

                                {/* Score Text */}
                                <div className="text-blue-600 font-medium">
                                    Match Score: {candidate.Score}%
                                </div>

                                {/* File */}
                                <div className="flex font-medium">
                                    File: <p className="text-blue-600 font-medium underline">{path.basename(candidate.File)}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end">
                                    <Button variant="destructive" onClick={() => handleReject(index)}>
                                        Reject
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Pagination Controls */}
                    <div className="flex justify-center space-x-3 mt-6">
                        <Button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-lg font-semibold">Page {currentPage}</span>
                        <Button
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={candidates.length === 0 || currentPage > (candidates.length / pageSize)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No candidates found.</p>
            )}
        </main>
    );
}
