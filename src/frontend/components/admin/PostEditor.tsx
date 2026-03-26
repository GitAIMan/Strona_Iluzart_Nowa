"use client";

import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { slugify } from "@shared/utils";
import Button from "@frontend/components/ui/Button";
import Input from "@frontend/components/ui/Input";
import ImageUploader from "@frontend/components/admin/ImageUploader";
import { cn } from "@shared/utils";

interface PostEditorProps {
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
    isPublished: boolean;
  };
  onSave: (data: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    coverImageUrl?: string;
    isPublished: boolean;
  }) => Promise<void>;
}

export default function PostEditor({ initialData, onSave }: PostEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.coverImageUrl || ""
  );
  const [isPublished, setIsPublished] = useState(
    initialData?.isPublished || false
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Zacznij pisać..." }),
    ],
    content: initialData?.content ? JSON.parse(initialData.content) : undefined,
    editorProps: {
      attributes: {
        class: "tiptap-content outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  useEffect(() => {
    if (!initialData) {
      setSlug(slugify(title));
    }
  }, [title, initialData]);

  const handleInsertLink = useCallback(() => {
    if (!editor) return;
    const url = prompt("Podaj URL linku:");
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  const handleInsertImage = useCallback(
    (url: string) => {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url }).run();
      setShowImageUploader(false);
    },
    [editor]
  );

  const handleSave = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      await onSave({
        title,
        slug,
        content: JSON.stringify(editor.getJSON()),
        excerpt: excerpt || undefined,
        coverImageUrl: coverImageUrl || undefined,
        isPublished,
      });
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tytuł wpisu"
        />
        <Input
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="slug-wpisu"
        />
      </div>

      <Input
        label="Zajawka"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Krótki opis wpisu..."
      />

      {/* Cover image */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-cream/70">
          Zdjęcie okładkowe
        </label>
        <div className="flex items-start gap-4">
          {coverImageUrl && (
            <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-white/10">
              <img
                src={coverImageUrl}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setCoverImageUrl("")}
                className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-cream/70 hover:text-cream text-xs"
              >
                x
              </button>
            </div>
          )}
          <ImageUploader
            onUpload={(url) => setCoverImageUrl(url)}
            currentImage={coverImageUrl || undefined}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10">
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            H3
          </ToolbarButton>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <span className="font-bold">B</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <span className="italic">I</span>
          </ToolbarButton>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="10" y1="6" x2="21" y2="6" />
              <line x1="10" y1="12" x2="21" y2="12" />
              <line x1="10" y1="18" x2="21" y2="18" />
              <path d="M4 6h1v4" />
              <path d="M4 10h2" />
              <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
            </svg>
          </ToolbarButton>
          <div className="w-px h-6 bg-white/10 mx-1" />
          <ToolbarButton onClick={handleInsertLink} active={editor.isActive("link")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setShowImageUploader(true)}
            active={false}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </ToolbarButton>
        </div>

        <EditorContent editor={editor} />
      </div>

      {/* Inline image uploader modal */}
      {showImageUploader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-surface border border-white/10 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-serif text-cream mb-4">
              Wstaw zdjęcie
            </h3>
            <ImageUploader onUpload={handleInsertImage} />
            <button
              onClick={() => setShowImageUploader(false)}
              className="mt-4 text-sm text-cream/50 hover:text-cream transition-colors"
            >
              Anuluj
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-200",
              isPublished ? "bg-navy" : "bg-surface-light"
            )}
            onClick={() => setIsPublished(!isPublished)}
          >
            <div
              className={cn(
                "absolute top-0.5 left-0.5 w-5 h-5 bg-cream rounded-full transition-transform duration-200",
                isPublished && "translate-x-5"
              )}
            />
          </div>
          <span className="text-sm text-cream/70">
            {isPublished ? "Opublikowany" : "Szkic"}
          </span>
        </label>

        <Button onClick={handleSave} isLoading={isSaving}>
          Zapisz
        </Button>
      </div>
    </div>
  );
}

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2 rounded-md text-sm transition-colors",
        active
          ? "bg-navy text-cream"
          : "text-cream/50 hover:text-cream hover:bg-white/5"
      )}
    >
      {children}
    </button>
  );
}
