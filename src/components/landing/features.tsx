import { Book, Users, Trophy, Layout } from "lucide-react";

const features = [
  {
    name: "Personalized Learning Paths",
    description:
      "Create and follow customized learning paths tailored to your goals and pace.",
    icon: Layout,
  },
  {
    name: "Expert-Led Courses",
    description:
      "Access high-quality courses created by industry experts and experienced educators.",
    icon: Book,
  },
  {
    name: "Community Learning",
    description:
      "Connect with fellow learners, share insights, and grow together in a supportive environment.",
    icon: Users,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed progress tracking and achievements.",
    icon: Trophy,
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="container space-y-8 sm:space-y-12 lg:space-y-16 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-transparent md:py-16 lg:py-24"
    >
      {/* Section Header */}
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
          Features
        </h2>
        <p className="max-w-[85%] sm:max-w-[75%] leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg">
          Everything you need to accelerate your learning journey
        </p>
      </div>

      {/* Features Grid */}
      <div className="mx-auto grid justify-center gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:max-w-[64rem]">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-2 transition-all hover:shadow-md"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-4 sm:p-6">
              <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary" />
              <div className="space-y-2">
                <h3 className="font-bold text-base sm:text-lg">{feature.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 