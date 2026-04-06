export interface Testimonial {
  text: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "Zamówiliśmy Grzegorza na integrację firmową w Katowicach i szczerze — nie spodziewaliśmy się, że mentalizm może tak rozruszać ludzi w garniturach. Połowa biura do dziś próbuje zgadnąć, jak to zrobił.",
    author: "A.K.",
    role: "Event firmowy, Katowice",
  },
  {
    text: "Na weselu wszyscy mówili o dwóch rzeczach: jedzeniu i pokazie Grzegorza. Wyczuł klimat, rozśmieszył nawet ciocie i sprawił, że nasz dzień był naprawdę wyjątkowy.",
    author: "M. i K.",
    role: "Wesele, Śląsk 2025",
  },
  {
    text: "Syn miał urodziny i powiedział, że to był najlepszy dzień w życiu. Dzieci do dziś ćwiczą sztuczki, które pokazał Grzegorz. Dla rodzica to najlepsza rekomendacja.",
    author: "T.N.",
    role: "Urodziny dziecka, Katowice",
  },
  {
    text: "Współpracuję z Grzegorzem regularnie — trzy eventy, za każdym razem inny program, za każdym razem klienci zachwyceni. To nie jest \u201Ekolejny magik z katalogu\u201D.",
    author: "M.W.",
    role: "Event manager, Śląsk",
  },
];
