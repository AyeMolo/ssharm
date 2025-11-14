// src/app/tools/bmi-calculator/page.tsx
"use client";

import { useState } from "react";

// BMI Calculator tool page.
// URL: /tools/bmi-calculator
export default function BmiCalculatorPage() {
  // State for the height and weight inputs.
  const [heightCm, setHeightCm] = useState(""); // height in centimeters
  const [weightKg, setWeightKg] = useState(""); // weight in kilograms

  // State for the result.
  const [bmi, setBmi] = useState<number | null>(null);

  // Handle the form submit.
  function handleCalculate(event: React.FormEvent) {
    event.preventDefault();

    const h = Number(heightCm);
    const w = Number(weightKg);

    // Basic validation.
    if (!h || !w || h <= 0 || w <= 0) {
      setBmi(null);
      return;
    }

    const heightMeters = h / 100;
    const value = w / (heightMeters * heightMeters);

    setBmi(value);
  }

  // Turn a BMI number into a label.
  function bmiCategory(value: number) {
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal";
    if (value < 30) return "Overweight";
    return "Obese";
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <a href="/tools" className="text-xs text-neutral-400 hover:underline">
        ← Back to tools
      </a>

      {/* Title and description */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">BMI Calculator</h1>
        <p className="text-sm text-neutral-300 max-w-xl">
          Enter your height and weight to estimate your Body Mass Index (BMI).
          This is a rough estimate and not medical advice.
        </p>
      </section>

      {/* Input form */}
      <form onSubmit={handleCalculate} className="space-y-4 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
        {/* Height input */}
        <div className="space-y-1 text-sm">
          <label htmlFor="height" className="block">
            Height (cm)
          </label>
          <input
            id="height"
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            placeholder="e.g. 178"
            className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Weight input */}
        <div className="space-y-1 text-sm">
          <label htmlFor="weight" className="block">
            Weight (kg)
          </label>
          <input
            id="weight"
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            placeholder="e.g. 80"
            className="w-full bg-black border border-neutral-700 rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-white text-black text-sm font-medium"
        >
          Calculate BMI
        </button>
      </form>

      {/* Result block */}
      {bmi !== null && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 text-sm text-neutral-200">
          <p>
            Your BMI is{" "}
            <span className="font-semibold">{bmi.toFixed(1)}</span>.
          </p>
          <p className="mt-1">
            Category: <span className="font-semibold">{bmiCategory(bmi)}</span>.
          </p>
        </div>
      )}
    </div>
  );
}