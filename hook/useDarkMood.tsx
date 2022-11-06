import { useEffect, useState } from "react";

const useDarkMood = () => {
  const [theme, setTheme] = useState<string>("dark");
  const colorTheme = theme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add(theme);
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return [colorTheme, setTheme] as const;
};

export default useDarkMood;
