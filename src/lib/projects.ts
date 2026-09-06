import blackHouse from "@/assets/project-black-house.jpg";
import minimal from "@/assets/project-minimal.jpg";
import villa from "@/assets/project-villa.jpg";
import apartment from "@/assets/project-apartment.jpg";

export type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  area: string;
  image: string;
  intro: string;
  rooms: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "the-black-house",
    title: "The Black House",
    location: "Alibaug, India",
    year: "2025",
    area: "6,400 sq.ft.",
    image: blackHouse,
    intro:
      "A monolithic basalt volume carved by warm interior light. Every threshold was designed as a change of temperature rather than a change of room.",
    rooms: ["Entrance", "Living Room", "Dining", "Kitchen", "Bedroom", "Garden"],
  },
  {
    slug: "modern-minimal-residence",
    title: "Modern Minimal Residence",
    location: "Copenhagen, Denmark",
    year: "2024",
    area: "2,900 sq.ft.",
    image: minimal,
    intro:
      "Restraint as luxury. Oak, lime plaster and northern light held in balance across an open plan without a single visible fixing.",
    rooms: ["Entrance", "Living Room", "Dining", "Kitchen", "Bedroom", "Garden"],
  },
  {
    slug: "contemporary-villa",
    title: "Contemporary Villa",
    location: "Marbella, Spain",
    year: "2025",
    area: "8,100 sq.ft.",
    image: villa,
    intro:
      "Book-matched Calacatta, champagne brass and an internal olive courtyard that turns the circulation into a landscape.",
    rooms: ["Entrance", "Living Room", "Dining", "Kitchen", "Bedroom", "Garden"],
  },
  {
    slug: "luxury-apartment",
    title: "Luxury Apartment",
    location: "Mumbai, India",
    year: "2024",
    area: "3,250 sq.ft.",
    image: apartment,
    intro:
      "A night-facing residence on the 41st floor, tuned entirely around the city skyline and layered pools of low warm light.",
    rooms: ["Entrance", "Living Room", "Dining", "Kitchen", "Bedroom", "Garden"],
  },
  {
    slug: "boutique-office",
    title: "Boutique Office",
    location: "Lisbon, Portugal",
    year: "2023",
    area: "4,000 sq.ft.",
    image: villa,
    intro:
      "A working environment with the material calm of a private home: travertine, linen acoustics and daylight as the primary fixture.",
    rooms: ["Entrance", "Living Room", "Dining", "Kitchen", "Bedroom", "Garden"],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
