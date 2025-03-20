export interface PricingPlan {
  name: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  buttonText: string;
  popular?: boolean;
  deviceCount: number;
  extraMonths?: number;
}

export interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
} 