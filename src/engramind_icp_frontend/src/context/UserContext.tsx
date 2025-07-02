"use client";
import { createContext, useContext } from "react";

type UserContextType = {
  name: string;
};

export const UserContext = createContext<UserContextType>({
  name: "Guest",
});

export const useUser = () => useContext(UserContext);
