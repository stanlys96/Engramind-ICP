import { Header } from "../../components/ui/showcase/Header";
import Cookies from "js-cookie";
import ShowcaseClientLayout from "./client-layout";
import { jwtVerify } from "jose";
import SideDrawer from "../../components/ui/SideDrawer";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BellDot } from "lucide-react";
import ThemeToggle from "../../theme/theme-toggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");
  let name = "Guest";
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  if (token) {
    try {
      if (token) {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        //   name?: string;
        // };
        name = "User";
      }
    } catch {
      name = "Guest";
    }
  }

  return (
    <ShowcaseClientLayout name={name}>
      <div className="relative bg-zinc-50 dark:bg-zinc-900 min-h-screen overflow-auto">
        <Header setIsOpenDrawer={setIsOpenDrawer} name={name} />
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
      <SideDrawer
        isOpen={isOpenDrawer}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
      >
        <nav className="gap-6 text-md flex flex-col text-gray-700 dark:text-gray-300 leading-relaxed">
          <Link
            to="/showcase"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase" ? "text-purple-600 font-bold" : ""
            }`}
          >
            Persona
          </Link>
          <Link
            to="/showcase/rubrics"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Rubrics
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Glossary
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Scenarios
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400`}
          >
            File Management
          </Link>
          <Link
            to="/showcase/how-it-works"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/how-it-works"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            How It Works
          </Link>
          <Link
            to="/showcase/faq"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/faq" ? "text-purple-600 font-bold" : ""
            }`}
          >
            FAQ
          </Link>
        </nav>
        <div className="flex flex-col gap-4 items-start mt-[20px] relative">
          <div className="flex gap-x-2 justify-center items-center">
            <img
              // onClick={() => navigate("/dashboard")}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
              className="rounded-full w-8 h-8 cursor-pointer hover:shadow-lg transition-all duration-300"
              width={400}
              height={300}
            />
            <div className="text-sm text-purple-600 dark:text-purple-300 capitalize font-semibold">
              {name}
            </div>
          </div>
          <button
            // onClick={() => setShowConfirm(true)}
            className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer transition"
          >
            Logout
          </button>
          <ThemeToggle customClassName="" />
        </div>
      </SideDrawer>
    </ShowcaseClientLayout>
  );
}
