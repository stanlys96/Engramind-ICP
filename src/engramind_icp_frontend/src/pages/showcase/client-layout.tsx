"use client";
import { UserContext } from "../../context/UserContext";

export default function ShowcaseClientLayout({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <UserContext.Provider value={{ name }}>{children}</UserContext.Provider>
  );
}
