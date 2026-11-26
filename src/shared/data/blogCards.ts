/** Wygląd kart na blogu: najnowszy wpis = As, potem Król, Dama, Walet, 10...
 *  Kolory kart idą po kolei (♠ ♥ ♦ ♣), tylko dla wyglądu. */
const RANKS = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
const SUITS = [
  { suit: "♠", red: false },
  { suit: "♥", red: true },
  { suit: "♦", red: true },
  { suit: "♣", red: false },
];

export function cardFace(i: number) {
  return { rank: RANKS[i % RANKS.length], ...SUITS[i % SUITS.length] };
}
