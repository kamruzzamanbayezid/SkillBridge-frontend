export type ITutorResponse = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "TUTOR" | "STUDENT" | "ADMIN";
  isBanned: boolean;
  image: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  tutorProfile: ITutorProfile;
};

export type ITutorProfile = {
  id: string;
  userId: string;
  bio: string;
  subject: string;
  experienceYears: number;
  hourlyRate: string | number;
  averageRating: string | number;
  reviewCount: number;
  categoryId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  category: ICategory;
};

export type ICategory = {
  id: string;
  name: string;
  createdAt: string | Date;
};
