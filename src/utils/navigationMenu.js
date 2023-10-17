const menuItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Popularne",
    to: "/popularne",
  },
  {
    label: "Kategorie",
    hasChild: true,
    subItems: [
      {
        label: "Technologia i Gadżety",
        to: "/kategoria/technologia-i-gadzety",
        slug: "technologia-i-gadzety",
      },
      {
        label: "Kuchnia i Przepisy Kulinarne",
        to: "/kategoria/kuchnia-i-przepisy-kulinarne",
        slug: "kuchnia-i-przepisy-kulinarne",
      },
      {
        label: "Zdrowie i Fitness",
        to: "/kategoria/zdrowie-i-fitness",
        slug: "zdrowie-i-fitness",
      },
      {
        label: "Moda i Styl",
        to: "/kategoria/moda-i-styl",
        slug: "moda-i-styl",
      },
      {
        label: "Humor i Rozrywka",
        to: "/kategoria/humor-i-rozrywka",
        slug: "humor-i-rozrywka",
      },
    ],
  },
  {
    label: "Logowanie",
    to: "/logowanie",
  },
  {
    label: "Rejestracja",
    to: "/rejestracja",
  },
  {
    label: "Kontakt",
    to: "/kontakt",
  },
];

export default menuItems;
