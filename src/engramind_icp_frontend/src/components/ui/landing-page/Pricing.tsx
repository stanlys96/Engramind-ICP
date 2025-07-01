import React from 'react';
import { PricingCard } from '../HelperComponents';

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-20 mx-auto px-4 sm:px-6 lg:px-8 dark:bg-zinc-950"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-zinc-800 dark:text-zinc-50">
          Simple, Transparent Pricing
        </h2>
        <p className="text-3xl text-zinc-500 max-w-3xl mx-auto">
          Invest in your digital immortality with our flexible pricing options
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-8 max-w-5xl mx-auto border border-zinc-200 dark:border-none">
        <PricingCard
          title="Initial Package"
          price="$99"
          period="one-time"
          addClass="border-b pb-12 lg:pb-0 lg:mb-0 lg:border-b-0 dark:border-none"
          features={[
            'Secure your unique username on-chain',
            'First AI personality generation (1GB data)',
            'Basic AI twin setup',
          ]}
          buttonText="Get Started"
          highlighted={true}
        />

        <div className="flex flex-col ">
          <PricingCard
            title="Upload-as-you-go"
            price="$0.99"
            period="/GB"
            addClass="border-t border-l-0 lg:border-t-0 lg:border-l dark:border-none"
            features={[
              'Add stories, voice notes, texts, photos',
              'Pay only for what you upload',
              'AI retraining with each update',
            ]}
            buttonText="Learn More"
          />

          <PricingCard
            title="Monetize Plan"
            price="20%"
            period="commission"
            addClass="border-l-0 lg:border-l dark:border-none"
            features={[
              'Let your AI become a digital mentor',
              'Earn passive income from your wisdom',
              'Automatic payments to your wallet',
            ]}
            buttonText="Learn More"
          />
        </div>
      </div>
    </section>
  );
}
