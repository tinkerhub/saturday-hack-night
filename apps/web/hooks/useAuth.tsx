import { useContext } from "react";
import { AuthContext } from "@app/contexts";

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === null) {
    throw new Error("Unable to use AuthContext outside of AuthProvider");
  }
  return auth;
};
