"use client";

import { useState, FormEvent } from "react";
import Input from "@frontend/components/ui/Input";
import Textarea from "@frontend/components/ui/Textarea";
import Select from "@frontend/components/ui/Select";
import Button from "@frontend/components/ui/Button";
import { contactFormSchema } from "@shared/types";
import { services } from "@shared/data/services";

const eventTypeOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "warsztaty", label: "Warsztaty" },
  { value: "inne", label: "Inne" },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  eventType?: string;
  eventDate?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(
    field: string,
    value: string
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});
    setServerError("");

    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Wystąpił błąd. Spróbuj ponownie.");
      }

      setIsSuccess(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Wystąpił błąd. Spróbuj ponownie."
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="glass rounded-2xl p-8 md:p-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-green-400"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-serif text-cream">
          Wiadomość wysłana!
        </h3>
        <p className="text-cream/60 font-sans">
          Skontaktuję się z Tobą wkrótce.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-8 md:p-12 space-y-6"
    >
      <Input
        label="Imię i nazwisko *"
        placeholder="Jan Kowalski"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
      />

      <Input
        label="Email *"
        type="email"
        placeholder="jan@email.com"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
      />

      <Input
        label="Telefon"
        type="tel"
        placeholder="+48 000 000 000"
        value={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        error={errors.phone}
      />

      <Select
        label="Rodzaj wydarzenia"
        options={eventTypeOptions}
        placeholder="Wybierz rodzaj wydarzenia"
        value={formData.eventType}
        onChange={(e) => handleChange("eventType", e.target.value)}
        error={errors.eventType}
      />

      <Input
        label="Data wydarzenia"
        type="date"
        value={formData.eventDate}
        onChange={(e) => handleChange("eventDate", e.target.value)}
        error={errors.eventDate}
      />

      <Textarea
        label="Wiadomość *"
        placeholder="Opisz swoje wydarzenie..."
        rows={5}
        value={formData.message}
        onChange={(e) => handleChange("message", e.target.value)}
        error={errors.message}
      />

      {serverError && (
        <p className="text-sm text-red-400 font-sans">{serverError}</p>
      )}

      <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
        Wyślij wiadomość
      </Button>
    </form>
  );
}
