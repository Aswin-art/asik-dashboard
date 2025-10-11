"use client";

import { useState } from "react";
import { Activity, Droplet, Heart } from "lucide-react";

interface Package {
  id: string;
  icon: React.ReactNode;
  title: string;
  testsCount: number;
  price: number;
  category: string;
}

const categories = [
  "All tests",
  "Checkup",
  "Examination",
  "Assessment",
  "Screening",
  "Evaluation",
  "Scan",
  "Inspection",
  "Audit",
];

const packages: Package[] = [
  {
    id: "1",
    icon: <Activity className="h-8 w-8" />,
    title: "Strong Women Wellness Checkup",
    testsCount: 32,
    price: 230.0,
    category: "Checkup",
  },
  {
    id: "2",
    icon: <Droplet className="h-8 w-8" />,
    title: "Medicare Blood Glucose Screening",
    testsCount: 12,
    price: 164.0,
    category: "Screening",
  },
  {
    id: "3",
    icon: <Heart className="h-8 w-8" />,
    title: "Medicare Complete Wellness Evaluation",
    testsCount: 18,
    price: 264.0,
    category: "Evaluation",
  },
];

export function HealthPackages() {
  const [activeCategory, setActiveCategory] = useState("All tests");

  const filteredPackages =
    activeCategory === "All tests" ? packages : packages.filter((pkg) => pkg.category === activeCategory);

  return (
    <section className="bg-background w-full overflow-hidden py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold">Comprehensive Health Assessment Packages</h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Explore our Premium Health Check-up Packages, crafted to offer a personalized approach to your health needs
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-primary/5 flex flex-col justify-between gap-6 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <div className="bg-background mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
                  <div className="text-foreground">{pkg.icon}</div>
                </div>

                <h3 className="mb-4 text-xl font-bold">{pkg.title}</h3>

                <p className="text-muted-foreground text-sm">Includes {pkg.testsCount} Tests</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">${pkg.price.toFixed(2)}</div>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-muted-foreground py-12 text-center">
            <p className="text-lg">No packages found in this category</p>
          </div>
        )}
      </div>
    </section>
  );
}
