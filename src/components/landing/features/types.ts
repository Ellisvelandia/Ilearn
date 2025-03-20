export interface FeatureCardProps {
  children?: React.ReactNode;
  className?: string;
}

export interface SkeletonProps {
  className?: string;
}

export interface BentoFeature {
  title: string;
  description: string;
  skeleton: React.ReactNode;
  className: string;
}

export interface ImageGridProps {
  images: string[];
  rotations: number[];
}

export interface ImageCardProps {
  image: string;
  rotation: number;
} 