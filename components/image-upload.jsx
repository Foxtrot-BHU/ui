"use client";

import axios from "axios";
import {
  AudioWaveform,
  File as FileIcon,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import progress from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export default function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const getFileIconAndColor = (file) => {
    if (file.type.includes("image")) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }
    if (file.type.includes("pdf")) {
      return {
        icon: <FileIcon size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }
    if (file.type.includes("audio")) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }
    if (file.type.includes("video")) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }
    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  const onUploadProgress = (progressEvent, file, cancelSource) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total || 0)) * 100
    );

    if (progress === 100) {
      setUploadedFiles((prev) => [...prev, file]);
      setFilesToUpload((prev) => prev.filter((item) => item.File !== file));
      return;
    }

    setFilesToUpload((prev) =>
      prev.map((item) =>
        item.File.name === file.name ? { ...item, progress, source: cancelSource } : item
      )
    );
  };

  const removeFile = (file) => {
    setFilesToUpload((prev) => prev.filter((item) => item.File !== file));
    setUploadedFiles((prev) => prev.filter((item) => item !== file));
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFilesToUpload((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({ progress: 0, File: file, source: null })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drag files</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload files (files should be under 10 MB)
            </p>
          </div>
        </label>
        <Input {...getInputProps()} type="file" className="hidden" />
      </div>
      {filesToUpload.length > 0 && (
        <ScrollArea className="h-40">
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">Files to upload</p>
          <div className="space-y-2 pr-3">
            {filesToUpload.map(({ File, progress, source }) => (
              <div key={File.lastModified} className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2">
                <div className="flex items-center flex-1 p-2">
                  <div className="text-white">{getFileIconAndColor(File).icon}</div>
                  <div className="w-full ml-2 space-y-1">
                    <div className="text-sm flex justify-between">
                      <p className="text-muted-foreground">{File.name.slice(0, 25)}</p>
                      <span className="text-xs">{progress}%</span>
                    </div>
                    <progress progress={progress} className={getFileIconAndColor(File).color} />
                  </div>
                </div>
                <button onClick={() => { if (source) source.cancel("Upload cancelled"); removeFile(File); }}
                  className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
