"use server"

import { cookies } from "next/headers";
import { toast } from "sonner";

export const getTutorSlots = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/slots`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? token : "",
        },
        cache: "no-store",
      },
    );

    const result = await res.json();
    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error?.message : "Failed to fetch slots";
    toast.error(errorMessage);
    return 0;
  }
};
