import { createContext, useEffect, useState } from "react";
import { ENDOPOINTS } from "@/api/endpoints";

export type TokenContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isTokenLoading: boolean;
};

export const TokenContext = createContext<TokenContextType | null>(null);

export function TokenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  useEffect(() => {
    setIsTokenLoading(true);

    if (token) {
      fetch(ENDOPOINTS.CHECK_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            setToken(null);
            localStorage.removeItem("token");
            return null;
          }
          return res.json().catch(() => null); // Catch JSON parsing errors
        })
        .finally(() => {
          setIsTokenLoading(false);
        });
    } else {
      setIsTokenLoading(false);
    }
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken, isTokenLoading }}>
      {children}
    </TokenContext.Provider>
  );
}
