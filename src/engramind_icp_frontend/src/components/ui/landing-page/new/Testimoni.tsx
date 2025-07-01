import React from "react";

export default function Testimoni() {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-semibold mb-4">What Our Users Say</h2>
        <p className="text-xl text-zinc-500 mb-16">
          Real experiences from people preserving their legacy with Eternity
          Chain
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:gap-4">
          {[
            {
              name: "Marcus Ibrahim",
              role: "Historian & Author",
              avatar: "/assets/avatar/avatar1.png",
              testimonial:
                "As someone who's spent a lifetime collecting stories, Eternity Chain gives me peace of mind knowing my research and personal insights will live on.",
            },
            {
              name: "Jackson Blum",
              role: "Historian & Author",
              avatar: "/assets/avatar/avatar3.png",
              testimonial:
                "After losing family members, I wanted to preserve our stories. My grandchildren can now interact with our ancestors' wisdom.",
            },
            {
              name: "Jack Lockley",
              role: "Tech Entrepreneur",
              avatar: "/assets/avatar/avatar2.png",
              testimonial:
                "My Engram AI is already generating revenue by sharing my business insights. It's amazing to see my digital twin helping others.",
            },
            {
              name: "Joceline Ann",
              role: "Teacher",
              avatar: "/assets/avatar/avatar4.png",
              testimonial:
                "After losing loved ones, I felt the need to preserve our family’s stories. Now, my grandchildren can connect with the wisdom of those who came before them.",
            },
          ].map((user, index) => (
            <div
              key={index}
              className={`p-6 border border-zinc-200 dark:border-zinc-800 lg:rounded-lg  odd:border-b-0 lg:odd:border-b`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4 ">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-lg">{user.name}</h4>
                    <p className="text-sm text-zinc-500">{user.role}</p>
                  </div>
                </div>
                <div className="text-purple-500 text-xl">★★★★★</div>
              </div>
              <p className="text-left text-zinc-600 dark:text-zinc-400">
                {user.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
