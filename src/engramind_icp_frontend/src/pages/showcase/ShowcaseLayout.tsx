import { AnimatedModal, ShowcaseHeader, SideDrawer } from "../../components/ui";
import Cookies from "js-cookie";
import ShowcaseClientLayout from "./client-layout";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../../theme/theme-toggle";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import IC from "../../utils/IC";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const name = Cookies.get("principal") ?? "";
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    Cookies.remove("principal");
    IC.logout();
    navigate("/");
  };
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <ShowcaseClientLayout name={name}>
      <div className="relative bg-zinc-50 dark:bg-zinc-900 min-h-screen overflow-auto">
        <ShowcaseHeader
          setShowConfirm={setShowConfirm}
          setIsOpenDrawer={setIsOpenDrawer}
          name={name}
        />
        <div className="max-w-7xl mx-auto px-4 py-10 text-neutral-900 dark:text-neutral-100">
          {children}
        </div>
      </div>
      <AnimatedModal
        showCrossIcon={false}
        widthFitContainer
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
      >
        <div>
          <p className="text-lg mb-4 text-zinc-800 font-semibold dark:text-zinc-100 text-center">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 cursor-pointer bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-zinc-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </AnimatedModal>
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
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/rubrics"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Rubrics
          </Link>
          <Link
            to="/showcase/glossary"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/glossary"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Glossary
          </Link>
          <Link
            to="/showcase/scenarios"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/scenarios"
                ? "text-purple-600 font-bold"
                : ""
            }`}
          >
            Scenarios
          </Link>
          <Link
            to="/showcase/file-management"
            className={`hover:text-purple-600 dark:hover:text-purple-400 ${
              pathname === "/showcase/file-management"
                ? "text-purple-600 font-bold"
                : ""
            }`}
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
