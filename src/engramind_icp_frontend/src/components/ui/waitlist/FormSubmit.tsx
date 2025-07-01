import React, { useState } from 'react';
import Modal from '../Modal';
import { FormInput } from './FormInput';

export default function FormSubmit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    occupation: '',
    knowGenAI: '',
    reason: '',
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email) return; // basic guard

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/submit-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          occupation: form.occupation,
          reason: form.reason,
          knowGenAI: form.knowGenAI,
        }),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setError(null);
        // setModalMessage('Successfully submitted!');
        setShowModal(true);
        // Optional: Reset form if needed
        setForm({
          name: '',
          email: '',
          occupation: '',
          reason: '',
          knowGenAI: '',
        });
      } else {
        setError(result.message || 'Submission failed.');
        // setModalMessage(result.message || 'Submission failed.');
        setShowModal(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Something went wrong. Please try again later.');
      //   setModalMessage('Something went wrong. Please try again later.');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg px-8 border-0 md:max-w-md md:p-8 md:border border-zinc-300 w-full pt-8 pb-12">
      <h1 className="mb-2 text-center text-xl font-semibold dark:text-neutral-50 text-neutral-900">
        Request Early Access to Engramind
      </h1>
      <p className="mb-4 text-center text-sm text-neutral-400">
        Tell us why Engramind matters to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          form={form}
          handleChange={handleChange}
          name="name"
          label="Name"
          type="text"
          required
          placeholder="John Doe"
        />

        <FormInput
          form={form}
          handleChange={handleChange}
          name="email"
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
        />

        <FormInput
          form={form}
          handleChange={handleChange}
          name="occupation"
          label="Occupation"
          type="text"
          required
          placeholder="Your occupation"
        />

        <div>
          <span className="mb-1 block text-sm font-medium dark:text-neutral-300 text-neutral-700 capitalize">
            Are you familiar with Generative AI technology
          </span>
          <div className="flex gap-6">
            <label className="inline-flex items-center gap-2 dark:text-neutral-300 text-neutral-700 text-sm">
              <input
                type="radio"
                name="knowGenAI"
                value="yes"
                checked={form.knowGenAI === 'yes'}
                onChange={handleChange}
                required
                className="accent-indigo-500"
              />
              Yes
            </label>
            <label className="inline-flex items-center gap-2 dark:text-neutral-300 text-neutral-700 text-sm">
              <input
                type="radio"
                name="knowGenAI"
                value="no"
                checked={form.knowGenAI === 'no'}
                onChange={handleChange}
                required
                className="accent-indigo-500"
              />
              No
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="reason"
            className="mb-1 block text-sm font-medium dark:text-neutral-300 text-neutral-700 capitalize"
          >
            Describe your goal to utilize engramind
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={2}
            onChange={handleChange}
            value={form.reason}
            className="w-full rounded-md border dark:border-neutral-600 border-zinc-300 dark:bg-neutral-700 bg-zinc-50 p-3 text-sm lg:text-base dark:text-neutral-50 text-zinc-800 placeholder-neutral-500 focus:border-indigo-500 focus:outline-none"
            placeholder="Tell us what inspires you..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-purple-600 py-3 font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-indigo-900"
        >
          {loading ? 'Submitting...' : 'Join Early Access'}
        </button>
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
        )}
        <p className="text-xs text-center text-zinc-400 mt-2">
          Your information is secure and will only be used for Engramind
          updates.
        </p>
        <p className="mt-4 text-center text-xs text-neutral-400 dark:text-neutral-500 hidden">
          By logging in, you agree to our{' '}
          <a
            href="/terms"
            className="text-purple-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="text-purple-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
        </p>
      </form>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={error ? 'Submission Failed' : 'Submission Status'}
        email={form.email}
        type={error ? 'error' : 'success'}
      />
    </div>
  );
}
