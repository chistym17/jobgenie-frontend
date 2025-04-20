import { useState, useEffect } from "react";

interface User {
  email: string;
  name?: string;
  [key: string]: any;
}

function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function useCurrentUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    const payload = parseJwt(token);
    if (payload && payload.sub) {
      setUser({ email: payload.sub, name: payload.name });
    } else {
      setUser(null);
    }
  }, []);

  return user;
}
