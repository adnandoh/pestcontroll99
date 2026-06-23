export type HomePestService = {
  id: string;
  name: string;
  cardLabel: string;
  href: string;
  image: string;
  alt: string;
  featured?: boolean;
};

export const HOME_PEST_SERVICES: HomePestService[] = [
  {
    id: 'cockroach',
    name: 'Cockroach Control',
    cardLabel: 'Cockroaches',
    href: '/services/cockroach-pest-control',
    image: '/images/Cockroach.webp',
    alt: 'Cockroach pest control — odourless gel treatment',
    featured: true,
  },
  {
    id: 'rodent',
    name: 'Rodent Control',
    cardLabel: 'Rodents',
    href: '/services/rodent-pest-control',
    image: '/images/Rat.webp',
    alt: 'Rodent and rat control services',
    featured: true,
  },
  {
    id: 'termite',
    name: 'Termite Control',
    cardLabel: 'Termites',
    href: '/services/termite-pest-control',
    image: '/images/Termite.webp',
    alt: 'Anti-termite treatment for homes and offices',
    featured: true,
  },
  {
    id: 'mosquito',
    name: 'Mosquito Control',
    cardLabel: 'Mosquitoes',
    href: '/services/mosquito-pest-control',
    image: '/images/Mosquito.webp',
    alt: 'Mosquito control and fogging services',
    featured: true,
  },
  {
    id: 'bedbug',
    name: 'Bed Bug Control',
    cardLabel: 'Bed Bugs',
    href: '/services',
    image: '/images/BedBug.webp',
    alt: 'Bed bug treatment for homes',
  },
  {
    id: 'housefly',
    name: 'House Fly Control',
    cardLabel: 'House Flies',
    href: '/services',
    image: '/images/House Fly.webp',
    alt: 'House fly control and prevention',
  },
  {
    id: 'woodborer',
    name: 'Wood Borer Control',
    cardLabel: 'Wood Borers',
    href: '/services/wood-borer-control',
    image: '/images/Wood Borer.webp',
    alt: 'Wood borer control treatment',
  },
  {
    id: 'honeybee',
    name: 'Honey Bee Removal',
    cardLabel: 'Honey Bees',
    href: '/services/honey-bee-pest-control',
    image: '/images/Honey Bee.webp',
    alt: 'Safe honey bee hive removal',
  },
];

export const FEATURED_PEST_SERVICES = HOME_PEST_SERVICES.filter((s) => s.featured);
