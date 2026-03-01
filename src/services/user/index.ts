"use server";

import { cookies } from "next/headers";
import { toast } from "sonner";

export const getAllUsers = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token ? token : "",
      },
      cache: "no-store",
    });
    const result = await res.json();
    return result.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch users";
    toast.error(errorMessage);
    return 0;
  }
};

export const getUserByRole = async (role: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/by-role?role=${role}`,
      {
        cache: "no-store",
      },
    );
    const result = await res.json();
    return result.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch users";
    toast.error(errorMessage);
    return 0;
  }
};

export const getStudentCount = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/student-count`,
      {
        cache: "no-store",
      },
    );
    const result = await res.json();
    return result.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch student count";
    toast.error(errorMessage);
    return 0;
  }
};

export const updateUserStatus = async (id: string, isBanned: boolean) => {
  console.log("🚀 ~ updateUserStatus :", id, isBanned);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/manage-status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: token ? token : "",
        },
        cache: "no-store",
        body: JSON.stringify({ isBanned }),
      },
    );

    const result = await res.json();
    console.log("🚀 ~ updateUserStatus ~ result :", result);

    return result?.data;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update";
    toast.error(errorMessage);
    return 0;
  }
};
