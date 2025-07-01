import React from 'react';
import { FaqItem } from '../HelperComponents';

export default function Faq() {
  return (
    <section
      id="faq"
      className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-zinc-950"
    >
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Frequently <br /> Asked <br /> Questions
          </h2>
        </div>

        <div className="md:w-2/3 space-y-6">
          <FaqItem
            question="How secure is my data on Eternity Chain?"
            answer="Your data is encrypted and secured on the Solana blockchain, making it virtually impossible to tamper with or delete. We use military-grade encryption and decentralized storage to ensure your digital legacy remains intact for generations."
          />

          <FaqItem
            question="How accurate is my AI twin?"
            answer="The accuracy depends on the quality and quantity of data you provide. Most users report that their AI captures 85-95% of their personality and communication style after uploading sufficient data. The AI continues to improve as you add more content."
          />

          <FaqItem
            question="What happens to my AI after I'm gone?"
            answer="You can designate inheritors who will manage access to your AI. They can decide whether to keep it private for family only or make it public. Any revenue generated will go to designated beneficiaries according to your instructions."
          />

          <FaqItem
            question="How is my privacy protected?"
            answer="You have complete control over what data you share. Our platform uses zero-knowledge proofs to ensure only authorized users can access your AI. You decide what's private, what's shared with family, and what's public."
          />
        </div>
      </div>
    </section>
  );
}
