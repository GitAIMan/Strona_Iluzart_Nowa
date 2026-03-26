import Button from "@frontend/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      <h1 className="text-8xl md:text-9xl font-serif text-gold mb-4">404</h1>
      <p className="text-xl md:text-2xl text-cream/60 mb-8 text-center font-serif">
        Strona nie znaleziona
      </p>
      <Button href="/" variant="primary" size="lg">
        Wróć na stronę główną
      </Button>
    </div>
  );
}
