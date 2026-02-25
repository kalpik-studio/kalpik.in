import { createContext, useContext } from "react";

const nonceContext = createContext<string | undefined>(undefined);

export function useNonceContext(): string | undefined {
  return useContext(nonceContext);
}

export function NonceProvider({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce: string;
}) {
  return (
    <nonceContext.Provider value={nonce}>{children}</nonceContext.Provider>
  );
}
