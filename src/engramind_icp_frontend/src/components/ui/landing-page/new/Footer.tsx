import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {[
          {
            title: "Product",
            links: [
              { name: "Features", href: "#" },
              { name: "Pricing", href: "#" },
              { name: "Demo", href: "#" },
              { name: "FAQ", href: "#" },
            ],
          },
          {
            title: "Company",
            links: [
              { name: "About Us", href: "#" },
              { name: "Careers", href: "#" },
              { name: "Privacy Policy", href: "#" },
              { name: "Terms of Service", href: "#" },
            ],
          },
          {
            title: "Connect",
            links: [
              { name: "Twitter", href: "#" },
              { name: "Discord", href: "#" },
              { name: "Instagram", href: "#" },
              { name: "Contact Us", href: "#" },
            ],
          },
          {
            title: "Engramind",
            links: [],
          },
        ].map((section, index) => (
          <div key={index}>
            <h3
              className={`text-xl font-semibold ${
                section.title === "Engramind"
                  ? "text-purple-600"
                  : "text-black dark:text-white"
              } mb-4`}
            >
              {section.title}
            </h3>
            {section.links.length > 0 && (
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link to={link.href} className="hover:text-purple-600">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
