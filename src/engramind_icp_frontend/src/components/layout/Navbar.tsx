"use client";

import { useEffect, useState } from "react";
import { MobileNavLink, NavLink } from "../ui/HelperComponents";
import ThemeToggle from "../../theme/theme-toggle";
import IC from "../../utils/IC";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { settingNickname, settingPrincipal } from "../../stores/user-slice";
import Cookies from "js-cookie";
import { toast } from "sonner";

type NavbarProps = {
  showMenu: boolean;
};

export default function Navbar({ showMenu }: NavbarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [backend, setBackend] = useState<_SERVICE>();

  const handleConnectWallet = async () => {
    const toastId = toast.loading(`Logging in...`, {
      id: "login",
      duration: Infinity,
    });
    IC.getAuth(async (authClient) => {
      authClient.login({
        ...IC.defaultAuthOption,
        onSuccess: async () => {
          const principal = authClient?.getIdentity()?.getPrincipal();
          const principalText = authClient
            ?.getIdentity()
            ?.getPrincipal()
            ?.toText();
          await backend?.addNewUser(principal);
          Cookies.set("principal", principalText, { expires: 1 });
          dispatch(settingPrincipal(principalText));
          toast.success(`Successfully logged in!`, {
            id: toastId,
            duration: 4000,
          });
          navigate("/showcase");
        },
        onError: (error) => {
          toast.error(error?.toString(), {
            id: toastId,
            duration: 4000,
          });
        },
      });
    });
  };

  useEffect(() => {
    setMounted(true);
    const hasSession = document.cookie.includes("session=");
    setIsLoggedIn(hasSession);
  }, []);

  useEffect(() => {
    IC.getBackend((result: _SERVICE) => {
      setBackend(result);
    });
  }, []);

  if (!mounted) {
    // Prevent SSR hydration mismatch
    return null;
  }

  return (
    <nav className="fixed w-full bg-white/30 backdrop-blur-sm bg-opacity-95 z-50 border-b border-gray-100 shadow-sm dark:bg-zinc-950/30 dark:border-zinc-700 ">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ">
        {/* Menu Content  */}
        <div className="flex justify-between items-center py-4">
          {/* Header Logo */}
          <div
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/engramind.svg"
              className="block dark:hidden"
              alt="Logo"
              width={120}
              height={80}
            />
            <img
              src="/engramindDark.svg"
              className="hidden dark:block"
              alt="Logo"
              width={120}
              height={80}
            />
          </div>

          {/* Menu Navigation */}
          <div className="justify-around w-1/3 md:w-1/2 hidden md:flex">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </div>

          {/* Button Get Started */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex gap-x-2">
                {/* <a
                  href={"/auth/login"}
                  className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Login
                </a> */}
                <a
                  onClick={() => handleConnectWallet()}
                  className="px-4 cursor-pointer py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  Connect
                </a>
              </div>

              <ThemeToggle />
            </div>
          )}

          {/* Menu Hamburger */}
          <div className="md:hidden">
            <button
              id="menu"
              type="button"
              name="menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-400"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0.5 opacity-0 "
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink href="#features">Features</MobileNavLink>
          <MobileNavLink href="#how-it-works">How It Works</MobileNavLink>
          <MobileNavLink href="#pricing">Pricing</MobileNavLink>
          <MobileNavLink href="#faq">FAQ</MobileNavLink>
          <div>
            <ThemeToggle />
          </div>
          <div className="pt-4 flex flex-col space-y-3">
            {/* <button className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium text-sm">
          Login
        </button> */}
            <button
              onClick={() => handleConnectWallet()}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
