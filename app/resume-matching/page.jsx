"use client";
import { useState } from "react";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Link from "next/link";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [rankedCandidates, setRankedCandidates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);

    const response = await fetch("/api/process-resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    });

    if (response.ok) {
      const data = await response.json();
      setRankedCandidates(data);
    }

    setIsProcessing(false);
  };

  // ✅ Show loading animation when processing
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl">Please wait!!!</h2>
        <DotLottieReact
          src="https://lottie.host/8a1cb288-4f61-4923-9204-abfe4ac3c1ec/hfo5PJOsk6.lottie"
          loop
          autoplay
          style={{ height: "150px", width: "150px" }}
        />
        <p className="text-sm text-muted-foreground mt-2">Analyzing resumes...</p>
      </div>
    );
  }


  return (
    <main className="flex flex-col items-center min-h-screen p-6 space-y-6">
      <h2 className="text-3xl font-semibold">Upload Resumes & Filter Best Candidates</h2>

      {/* Job Description Input */}
      <textarea
        className="w-full max-w-2xl p-3 border rounded-md"
        rows="4"
        placeholder="Enter job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      {/* File Upload */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full shadow" variant="outline">
            Upload Resumes
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">Upload Resumes</DialogTitle>
            <DialogDescription className="text-center">
              Upload resumes to filter best-matching candidates.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <ImageUpload />
          </div>
        </DialogContent>
      </Dialog>

      {/* Submit Button */}
      <Button className="px-6 py-2 rounded-md bg-blue-600 text-white" onClick={handleSubmit} >
        Process Resumes
      </Button>

      {/* Display Ranked Candidates */}
      {rankedCandidates.length > 0 && (
        <div className="w-full max-w-2xl mt-6 p-4 border rounded-md">
          <h3 className="text-xl font-semibold">Top Matching Candidates</h3>
          <ul className="mt-3 space-y-3">
            {rankedCandidates.map((candidate, index) => (
              <li key={index} className="flex justify-between items-center border p-3 rounded-md">
                <span className="font-medium">
                  {candidate.rank}. {candidate.name}
                </span>
                <span className="text-gray-600">Match: {candidate.match_score}%</span>
                <a
                  href={`/uploads/${candidate.resume_file}`}
                  download
                  className="text-blue-500 underline"
                >
                  Download Resume
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
