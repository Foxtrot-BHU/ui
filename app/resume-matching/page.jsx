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
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [ws, setWs] = useState({ status: "", message: "" });

  const router = useRouter();

  const handleSubmit = async () => {
    setIsProcessing(true);
    setWs({ status: "notConnected", message: "Connecting to server..." });

    const response = await fetch("/api/process-resumes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jobDescription }),
    });

    if (response.ok) {
      console.log("Backend accepted processing request");
    }

    let socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      setWs({ status: "connected", message: "Connected with model" });
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received:", data);

      if (data.status === "Complete") {
        setWs({ status: data.status, message: data.message });
        setIsProcessing(false);
        localStorage.setItem("rankedCandidates", JSON.stringify(data.candidates)); // Store data
        socket.close();
        router.push("/resume-matching/dashboard"); // Navigate
      } else {
        setWs(data);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setIsProcessing(false);
    };
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
        <p className="text-sm text-muted-foreground mt-2">{ws.message}</p>
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
      <Button className="px-6 py-2 rounded-md bg-blue-600 text-white" onClick={handleSubmit}>
        Process Resumes
      </Button>
    </main>
  );
}
