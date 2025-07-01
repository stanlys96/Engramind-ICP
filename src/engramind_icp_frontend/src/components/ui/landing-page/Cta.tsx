import React from 'react';

export default function Cta() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Immortalize Your Legacy?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Start today. Create a digital twin that preserves your wisdom,
          personality, and stories for generations to come.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Reserve My Username
          </button>
          <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
            Learn More
          </button>
        </div>

        <p className="mt-8 text-sm opacity-80 max-w-lg mx-auto">
          Limited time offer: First 500 registrations receive 50% off the
          initial package.{' '}
          <span className="font-medium">Only 127 spots left!</span>
        </p>
      </div>
    </section>
  );
}
