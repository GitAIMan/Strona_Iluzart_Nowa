"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  imageSrc: string;
  onCrop: (blob: Blob) => void;
  onCancel: () => void;
}

const PRESETS = [
  { label: "Portret (3:4)", aspect: 3 / 4 },
  { label: "Krajobraz (16:9)", aspect: 16 / 9 },
  { label: "Kwadrat (1:1)", aspect: 1 },
];

export default function ImageCropper({
  imageSrc,
  onCrop,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 10,
    y: 10,
    width: 80,
    height: 80,
  });
  const [aspect, setAspect] = useState<number>(16 / 9);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleConfirm = useCallback(async () => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) return;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelCrop = {
      x: (crop.x / 100) * image.width * scaleX,
      y: (crop.y / 100) * image.height * scaleY,
      width: (crop.width / 100) * image.width * scaleX,
      height: (crop.height / 100) * image.height * scaleY,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    canvas.toBlob(
      (blob) => {
        if (blob) onCrop(blob);
      },
      "image/jpeg",
      0.9
    );
  }, [crop, onCrop]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80">
      <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-serif text-cream mb-4">Przytnij zdjęcie</h3>

        {/* Aspect ratio presets */}
        <div className="flex gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setAspect(preset.aspect)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                aspect === preset.aspect
                  ? "bg-navy text-cream"
                  : "bg-surface-light text-cream/50 hover:text-cream"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Crop area */}
        <div className="flex justify-center bg-black/40 rounded-lg overflow-hidden">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={aspect}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Crop"
              className="max-h-[60vh]"
            />
          </ReactCrop>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-cream/50 hover:text-cream transition-colors"
          >
            Anuluj
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm bg-navy hover:bg-navy-light text-cream rounded-lg transition-colors"
          >
            Zatwierdź
          </button>
        </div>
      </div>
    </div>
  );
}
