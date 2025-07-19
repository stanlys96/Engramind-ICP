import {
  BriefcaseBusiness,
  CircleDollarSign,
  Computer,
  Database,
  HandCoins,
  Palette,
  PencilRuler,
  PersonStanding,
  Scroll,
  Signal,
  Tag,
} from "lucide-react";
import { JSX } from "react";

const categories = [
  "Art & Design", //pallete
  "Accounting", //hand-coins
  "Business", //briefcase-business
  "Data", //database
  "Finance", //circle-dollar-sign
  "Human Resource", //person-standing
  "IT & Engineering", //computer
  "Law & Consulting", //scroll
  "Marketing", //tag
  "Product", //pencil-ruler
  "Sales & Ops", //signal
];

const categoryIcons: { [key: string]: JSX.Element } = {
  "Art & Design": <Palette className="w-4 h-4 mr-1" />,
  Accounting: <HandCoins className="w-4 h-4 mr-1" />,
  Business: <BriefcaseBusiness className="w-4 h-4 mr-1" />,
  Data: <Database className="w-4 h-4 mr-1" />,
  Finance: <CircleDollarSign className="w-4 h-4 mr-1" />,
  "Human Resource": <PersonStanding className="w-4 h-4 mr-1" />,
  "IT & Engineering": <Computer className="w-4 h-4 mr-1" />,
  "Law & Consulting": <Scroll className="w-4 h-4 mr-1" />,
  Marketing: <Tag className="w-4 h-4 mr-1" />,
  Product: <PencilRuler className="w-4 h-4 mr-1" />,
  "Sales & Ops": <Signal className="w-4 h-4 mr-1" />,
};

export const CategoryFilter = () => (
  <div className="flex flex-wrap gap-2 mb-4">
    {categories.map((cat) => (
      <button
        key={cat}
        className="flex cursor-pointer items-center text-sm px-3 py-1 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800"
      >
        {categoryIcons[cat]}
        {cat}
      </button>
    ))}
  </div>
);
