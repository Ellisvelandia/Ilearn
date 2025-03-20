export const STUDY_IMAGES = [
  "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2500&auto=format&fit=crop",
];

export const ROTATION_VALUES = [
  -5, 3, -2, 2, -4,  // First row
  -3, 4, 0, -1, -2   // Second row
];

export const IMAGE_VARIANTS = {
  whileHover: { scale: 1.1, rotate: 0, zIndex: 100 },
  whileTap: { scale: 1.1, rotate: 0, zIndex: 100 },
};

export const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
}; 