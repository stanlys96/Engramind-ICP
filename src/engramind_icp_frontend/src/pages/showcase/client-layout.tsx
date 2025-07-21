"use client";
import { _SERVICE } from "../../../../declarations/engramind_icp_backend/engramind_icp_backend.did";
import { UserContext } from "../../context/UserContext";

export default function ShowcaseClientLayout({
  children,
  name,
  currentNickname,
}: {
  children: React.ReactNode;
  name: string;
  currentNickname: string;
}) {
  return (
    <UserContext.Provider value={{ name, currentNickname }}>
      {children}
    </UserContext.Provider>
  );
}
