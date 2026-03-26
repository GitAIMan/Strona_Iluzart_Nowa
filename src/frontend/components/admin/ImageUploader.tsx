"use client";

import { useState, useRef, useCallback } from "react";
import ImageCropper from "@frontend/components/admin/ImageCropper";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
  currentImage?: string;
}

export default function ImageUploader({
  onUpload,
  currentImage,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Dozwolone formaty: JPEG, PNG, WebP");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Maksymalny rozmiar pliku: 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragActive(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFile]
  );

  const handleCrop = useCallback(
    async (blob: Blob) => {
      setShowCropper(false);
      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", blob, "cropped.jpg");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        onUpload(data.url);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Nie udało się przesłać zdjęcia");
      } finally {
        setIsUploading(false);
        setPreview(null);
      }
    },
    [onUpload]
  );

  const handleCancelCrop = useCallback(() => {
    setShowCropper(false);
    setPreview(null);
  }, []);

  return (
    <div>
      {currentImage && !isUploading && (
        <div className="mb-3 w-32 h-20 rounded-lg overflow-hidden border border-white/10">
          <img
            src={currentImage}
            alt="Current"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${
            dragActive
              ? "border-navy-light bg-navy/10"
              : "border-white/10 hover:border-white/20"
          }
          ${isUploading ? "pointer-events-none opacity-50" : ""}
        `}
      >
        {isUploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-cream/20 border-t-cream rounded-full animate-spin" />
            <span className="text-sm text-cream/50">Przesyłanie...</span>
          </div>
        ) : (
          <div>
            <svg
              className="mx-auto mb-2 text-cream/30"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17,8 12,3 7,8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-cream/40">
              Kliknij lub przeciągnij zdjęcie
            </p>
            <p className="text-xs text-cream/20 mt-1">
              JPEG, PNG, WebP (max 5MB)
            </p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
      />

      {showCropper && preview && (
        <ImageCropper
          imageSrc={preview}
          onCrop={handleCrop}
          onCancel={handleCancelCrop}
        />
      )}
    </div>
  );
}
