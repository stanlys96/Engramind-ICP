import React from 'react';
import { StepCard } from '../HelperComponents';

export default function HowItWork() {
  return (
    <section id="how-it-works" className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 dark:text-zinc-50">
            How Eternity Chain Works
          </h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-200 max-w-3xl mx-auto">
            Three simple steps to create your living digital legacy
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <StepCard
            number={1}
            title="Reserve Your Digital Lot"
            description="Secure your unique username on the blockchain and set up your personal Eternity Chain account."
          />
          <StepCard
            number={2}
            title="Upload Your Data"
            description="Share your stories, knowledge, values, and experiences through text, audio, or video inputs."
          />
          <StepCard
            number={3}
            title="Meet Your AI Twin"
            description="Watch as our AI creates your digital twin 'Engramind' that preserves your personality and wisdom."
          />
        </div>
      </div>
    </section>
  );
}
