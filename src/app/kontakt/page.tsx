import { generatePageMetadata } from "@shared/metadata";
import PageTransition from "@frontend/components/layout/PageTransition";
import ContactLetter from "@frontend/components/contact/ContactLetter";
import { CONTACT } from "@shared/constants";

export const metadata = generatePageMetadata({
  title: "Kontakt | Zarezerwuj Iluzjonistę Katowice",
  description:
    "Zarezerwuj pokaz magii w Katowicach i na Śląsku. Zadzwoń, napisz na WhatsApp albo wypełnij krótki list. Oddzwaniam w ciągu 2 dni.",
});

const WRAP = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-10";
const tel = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

export default function KontaktPage() {
  return (
    <PageTransition>
      {/* 1. Tytuł + list-zaproszenie (po wysłaniu zamienia się w rozmowę) */}
      <section className="grain bg-suits">
        <div className={`${WRAP} pt-32 pb-20 md:pb-24`}>
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold">Kontakt</p>
          <h1 className="mt-4 font-serif text-cream text-5xl sm:text-6xl lg:text-[4.75rem] leading-[1.02] max-w-3xl">
            Zaproś mnie na <em className="text-gold">swoje wydarzenie</em>
          </h1>
          <p className="mt-5 font-sans text-cream/60 text-lg max-w-xl">
            Uzupełnij luki w liście. Oddzwonię w ciągu 2 dni i powiem, czy termin jest wolny.
          </p>

          <div className="mt-14">
            <ContactLetter />
          </div>
        </div>
      </section>

      {/* 2. Kurtyna z telefonem */}
      <section className="grain bg-velvet">
        <div className={`${WRAP} py-20 text-center`}>
          <h2 className="font-serif text-cream text-4xl md:text-5xl leading-tight">Soboty w sezonie znikają szybko</h2>
          <p className="mt-3 mb-7 font-sans text-cream/65">Najszybciej sprawdzisz termin przez telefon.</p>
          <a
            href={tel}
            className="inline-flex items-center justify-center rounded-md bg-gold px-7 py-4 font-sans font-semibold text-background transition-colors hover:bg-gold-light"
          >
            Zadzwoń: 882 011 161
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
