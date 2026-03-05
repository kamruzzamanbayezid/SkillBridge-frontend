"use server";

import { cookies } from "next/headers";
import { toast } from "sonner";

export const allCategory = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? token : "",
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Failed to fetch categories";
    toast.error(errorMessage);
    return 0;
  }
};

export const createCategory = async (name: string) => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories/create-category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? token : "",
        },
        body: JSON.stringify({ name }),
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Failed to fetch categories";
    toast.error(errorMessage);
    return 0;}
};
