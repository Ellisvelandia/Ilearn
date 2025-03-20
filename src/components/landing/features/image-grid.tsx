"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { IMAGE_VARIANTS } from "./constants";
import { ImageGridProps, ImageCardProps } from "./types";

export const ImageGrid = ({ images, rotations }: ImageGridProps) => (
  <>
    <div className="flex flex-row -ml-20">
      {images.map((image, idx) => (
        <ImageCard key={`first-${idx}`} image={image} rotation={rotations[idx]} />
      ))}
    </div>
    <div className="flex flex-row">
      {images.map((image, idx) => (
        <ImageCard key={`second-${idx}`} image={image} rotation={rotations[idx + 5]} />
      ))}
    </div>
  </>
);

const ImageCard = ({ image, rotation }: ImageCardProps) => (
  <motion.div
    variants={IMAGE_VARIANTS}
    style={{ rotate: rotation }}
    whileHover="whileHover"
    whileTap="whileTap"
    className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
  >
    <Image
      src={image}
      alt="AI-Powered Learning"
      width="500"
      height="500"
      className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
    />
  </motion.div>
); 