"use client";
import { Gem } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    to={href}
    className="text-zinc-800 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 font-medium  transition-colors"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    to={href}
    className="block py-2 text-zinc-900 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium leading-relaxed transition-colors duration-300"
  >
    {children}
  </Link>
);

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700 hover:shadow-md transition-all">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
      {title}
    </h3>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{description}</p>
  </div>
);

const StepCard = ({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
      {title}
    </h3>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{description}</p>
  </div>
);

const PricingCard = ({
  title,
  price,
  period,
  features,
  buttonText,
  highlighted = false,
  addClass,
}: {
  title: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  addClass?: string;
}) => (
  <div
    className={`bg-white dark:bg-zinc-800  ${
      highlighted
        ? "border-purple-200 dark:border-purple-400 p-4"
        : "border-zinc-200 dark:border-zinc-700 border p-3 border-t-0 even:border-b-0 border-r-0"
    } relative ${addClass}`}
  >
    {highlighted && (
      <div className="flex items-center w-fit bg-purple-50 text-purple-500  text-xs font-medium py-1 px-2 rounded-full">
        <Gem className="h-4" />
        Most Popular
      </div>
    )}
    <h3
      className={[
        highlighted ? "text-2xl mt-4" : "text-lg",
        "font-semibold mb-2 text-zinc-800 dark:text-zinc-200",
      ].join(" ")}
    >
      {title}
    </h3>
    <div className="mb-2">
      <div
        className={[
          highlighted ? "text-5xl mb-12" : "text-3xl",
          "font-medium text-zinc-800 dark:text-zinc-200",
        ].join(" ")}
      >
        {price}
        <span className="text-zinc-400 font-medium text-sm ml-2">{period}</span>
      </div>
    </div>
    <ul className="flex flex-wrap gap-x-2 space-y-3 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg
            className="h-5 w-5 text-green-500 mr-1 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span
            className={[
              highlighted ? "text-base font-medium" : "text-xs",
              " text-zinc-600 dark:text-zinc-400",
            ].join(" ")}
          >
            {feature}
          </span>
        </li>
      ))}
    </ul>
    <button
      type="button"
      className={`w-full py-2 rounded-lg  font-medium transition-colors ${
        highlighted
          ? "mt-16 -mb-4 bg-gradient-to-r text-lg from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          : "text-sm bg-purple-50 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900"
      }`}
    >
      {buttonText}
    </button>
  </div>
);

const TestimonialCard = ({
  quote,
  name,
  title,
  initial,
}: {
  quote: string;
  name: string;
  title: string;
  initial: string;
}) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-700">
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-700 flex items-center justify-center text-purple-600 dark:text-purple-100 font-bold text-sm mr-3">
        {initial}
      </div>
      <div>
        <h4 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
          {name}
        </h4>
        <p className="text-zinc-500 dark:text-zinc-400 text-xs">{title}</p>
      </div>
    </div>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{quote}</p>
    <div className="mt-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </div>
);

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-zinc-800 rounded  overflow-hidden border border-zinc-100 dark:border-zinc-700">
      <button
        type="button"
        className="w-full px-6 py-4 text-left font-medium text-zinc-800 dark:text-zinc-200 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <svg
          className={`h-5 w-5 text-zinc-500 dark:text-zinc-400 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`px-6 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">{answer}</p>
      </div>
    </div>
  );
};

export {
  NavLink,
  MobileNavLink,
  FeatureCard,
  StepCard,
  PricingCard,
  TestimonialCard,
  FaqItem,
};
