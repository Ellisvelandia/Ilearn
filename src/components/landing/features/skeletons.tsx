"use client";

import { Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { STUDY_IMAGES, ROTATION_VALUES } from "./constants";
import { ImageGrid } from "./image-grid";
import { Globe } from "./globe";

export const SkeletonOne = () => (
  <div className="relative flex py-8 px-2 gap-10 h-full">
    <div className="w-full p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group h-full">
      <div className="flex flex-1 w-full h-full flex-col space-y-2">
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop"
          alt="Smart Content Processing"
          width={800}
          height={800}
          className="h-full w-full aspect-square object-cover object-center rounded-sm"
        />
      </div>
    </div>
    <GradientOverlay />
  </div>
);

export const SkeletonTwo = () => (
  <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
    <ImageGrid images={STUDY_IMAGES} rotations={ROTATION_VALUES} />
    <GradientSides />
  </div>
);

export const SkeletonThree = () => (
  <Link
    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    target="_blank"
    className="relative flex gap-10 h-full group/image"
  >
    <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
      <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
        <Youtube className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
        <Image
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop"
          alt="Interactive Study Tools"
          width={800}
          height={800}
          className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
        />
      </div>
    </div>
  </Link>
);

export const SkeletonFour = () => (
  <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      <Globe className="transform translate-y-[5%]" />
    </div>
  </div>
);

const GradientOverlay = () => (
  <>
    <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-white dark:from-black via-white dark:via-black to-transparent w-full pointer-events-none" />
    <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-white dark:from-black via-transparent to-transparent w-full pointer-events-none" />
  </>
);

const GradientSides = () => (
  <>
    <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent h-full pointer-events-none" />
    <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent h-full pointer-events-none" />
  </>
); 