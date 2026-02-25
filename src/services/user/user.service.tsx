import { toast } from "sonner";

export const getAllUser = async (role: string) => {
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
