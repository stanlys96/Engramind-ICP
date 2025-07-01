import React from 'react';
import { TestimonialCard } from '../HelperComponents';

export default function Testimoni() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            What Our Users Say
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-200 max-w-3xl mx-auto">
            Real experiences from people preserving their legacy with Eternity
            Chain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TestimonialCard
            quote="As someone who's spent a lifetime collecting stories, Eternity Chain gives me peace of mind knowing my research and personal insights will live on."
            name="Marcus J."
            title="Historian & Author"
            initial="M"
          />

          <TestimonialCard
            quote="My Engram AI is already generating revenue by sharing my business insights. It's amazing to see my digital twin helping others."
            name="Sophia R."
            title="Tech Entrepreneur"
            initial="S"
          />

          <TestimonialCard
            quote="After losing family members, I wanted to preserve our stories. My grandchildren can now interact with our ancestors' wisdom."
            name="David T."
            title="Family Historian"
            initial="D"
          />
        </div>
      </div>
    </section>
  );
}
