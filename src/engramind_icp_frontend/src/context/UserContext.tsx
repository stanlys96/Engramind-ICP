"use client";
import { createContext, useContext } from "react";
import { _SERVICE } from "../../../declarations/engramind_icp_backend/engramind_icp_backend.did";

type UserContextType = {
  name: string;
  currentNickname: string;
};

export const UserContext = createContext<UserContextType>({
  name: "Guest",
  currentNickname: "",
});

export const useUser = () => useContext(UserContext);
