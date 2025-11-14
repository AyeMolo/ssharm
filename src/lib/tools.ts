// src/lib/tools.ts

// Type that describes one tool.
export type Tool = {
    slug: string;       // used in the URL, e.g. "bmi-calculator"
    name: string;       // display name
    description: string; // short one-line description
  };
  
  // All tools on your site.
  // You can add more later.
  export const tools: Tool[] = [
    {
      slug: "bmi-calculator",
      name: "BMI Calculator",
      description: "Estimate your Body Mass Index from height and weight.",
    },
    {
      slug: "example-tool",
      name: "Example Tool",
      description: "For now this is just placeholder",
    },
  ];