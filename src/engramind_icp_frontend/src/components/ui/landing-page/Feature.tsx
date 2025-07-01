import React from 'react';
import { FeatureCard } from '../HelperComponents';

export default function Feature() {
  return (
    <section
      id="features"
      className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-zinc-950"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 dark:text-zinc-50">
          Your Digital Life Monument
        </h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-200 max-w-3xl mx-auto">
          Eternity Chain combines cutting-edge AI and blockchain technology to
          preserve your authentic self for generations to come.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon="🧠"
          title="AI-Generated Personality"
          description="Advanced AI technology learns your personality, values, and knowledge to create a digital twin that thinks and speaks like you."
        />
        <FeatureCard
          icon="⛓️"
          title="Secured on Blockchain"
          description="Your digital legacy is secured on the Solana blockchain, ensuring it remains accessible and tamper-proof for generations."
        />
        <FeatureCard
          icon="💰"
          title="Monetize Your Wisdom"
          description="Your digital twin can generate income by sharing your expertise and insights with others who value your knowledge."
        />
      </div>
    </section>
  );
}
