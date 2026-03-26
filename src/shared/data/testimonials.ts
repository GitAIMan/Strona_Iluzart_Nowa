export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "Grzegorz sprawił, że nasz event firmowy był niezapomniany. Goście do dziś wspominają pokaz mentalizmu. Profesjonalizm na najwyższym poziomie!",
    author: "Anna Kowalska",
    role: "Dyrektor Marketingu, TechCorp",
  },
  {
    text: "Pokaz na naszym weselu przeszedł najśmielsze oczekiwania. Grzegorz doskonale wyczuł atmosferę i dostosował występ do naszych gości. Magia!",
    author: "Michał i Katarzyna",
    role: "Wesele, Kraków 2024",
  },
  {
    text: "Dzieci były zachwycone! Warsztaty magii to najlepszy prezent urodzinowy jaki mogliśmy dać synowi. Każde dziecko wyszło z nową sztuczką.",
    author: "Tomasz Nowak",
    role: "Ojciec 8-latka",
  },
  {
    text: "Współpracowaliśmy z Grzegorzem przy trzech eventach i za każdym razem dostarczył coś wyjątkowego. Polecam bez zastrzeżeń.",
    author: "Marta Wiśniewska",
    role: "Event Manager, Prestige Events",
  },
];
