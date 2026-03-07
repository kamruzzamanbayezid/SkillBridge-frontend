"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { toast } from "sonner";

export const loginUser = async (userData: Record<string, unknown>) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();

    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to login user";
    toast.error(errorMessage);
    return 0;
  }
};

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

export const getCurrentUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie?.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? token : "",
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch current user!";
    toast.error(errorMessage);
    return 0;
  }
};

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
