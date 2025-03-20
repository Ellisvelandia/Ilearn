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
      className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Everything you need to accelerate your learning journey
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-2"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <feature.icon className="h-12 w-12" />
              <div className="space-y-2">
                <h3 className="font-bold">{feature.name}</h3>
                <p className="text-sm text-muted-foreground">
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