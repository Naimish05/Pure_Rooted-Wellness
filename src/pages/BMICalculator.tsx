import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

type Unit = "metric" | "imperial";

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

function calculateBMI(weight: number, height: number, unit: Unit): BMIResult | null {
  if (weight <= 0 || height <= 0) return null;
  let bmi: number;
  if (unit === "metric") {
    const hm = height / 100;
    bmi = weight / (hm * hm);
  } else {
    bmi = (weight / (height * height)) * 703;
  }
  bmi = Math.round(bmi * 10) / 10;

  if (bmi < 18.5) return { bmi, category: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { bmi, category: "Normal weight", color: "text-primary" };
  if (bmi < 30) return { bmi, category: "Overweight", color: "text-yellow-600" };
  return { bmi, category: "Obese", color: "text-red-500" };
}

const categories = [
  { label: "Underweight", range: "< 18.5", color: "bg-blue-500" },
  { label: "Normal", range: "18.5 – 24.9", color: "bg-primary" },
  { label: "Overweight", range: "25 – 29.9", color: "bg-yellow-500" },
  { label: "Obese", range: "≥ 30", color: "bg-red-500" },
];

export default function BMICalculator() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<BMIResult | null>(null);

  const handleCalculate = () => {
    const r = calculateBMI(parseFloat(weight), parseFloat(height), unit);
    setResult(r);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-xl px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <Calculator className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h1 className="mb-2 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-heading)" }}>
            BMI Calculator
          </h1>
          <p className="mb-8 text-muted-foreground">
            Calculate your Body Mass Index to understand your weight category.
          </p>
        </motion.div>

        <div className="rounded-xl border border-border bg-card p-6">
          {/* Unit toggle */}
          <div className="mb-6 flex rounded-lg border border-border">
            {(["metric", "imperial"] as Unit[]).map((u) => (
              <button
                key={u}
                onClick={() => { setUnit(u); setResult(null); }}
                className={cn(
                  "flex-1 rounded-lg py-2 text-sm font-medium capitalize transition-colors",
                  unit === u ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "70" : "154"}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium">
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === "metric" ? "175" : "69"}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full rounded-lg bg-primary py-3 font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Calculate BMI
          </button>

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-xl bg-muted p-6 text-center"
            >
              <p className="text-sm text-muted-foreground">Your BMI</p>
              <p className={cn("text-5xl font-bold", result.color)} style={{ fontFamily: "var(--font-heading)" }}>
                {result.bmi}
              </p>
              <p className={cn("mt-1 text-lg font-semibold", result.color)}>{result.category}</p>
            </motion.div>
          )}

          {/* Scale */}
          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full">
              {categories.map((c) => (
                <div key={c.label} className={cn("flex-1", c.color)} />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {categories.map((c) => (
                <span key={c.label} className="text-center">
                  {c.label}<br />{c.range}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
