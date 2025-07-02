export function useTheme() {
  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");

    // Save preference to localStorage
    if (root.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  const setInitialTheme = () => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const root = document.documentElement;

    if (stored === "dark" || (!stored && prefersDark)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const theme = () => {
    return localStorage.getItem("theme");
  };

  return { toggleTheme, setInitialTheme, theme };
}
