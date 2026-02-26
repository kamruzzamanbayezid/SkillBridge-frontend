export interface TUTOR_CATEGORY {
  id: string;
  name: string;
  bio: string;
  averageRating: number;
  createdAt: string | Date;
}

export interface TUTOR_USER {
  image: string;
  name?: string; // যদি ডাটাতে থাকে
  email?: string; // যদি ডাটাতে থাকে
}

export interface TUTOR_DATA {
  id: string;
  userId: string;
  categoryId: string;
  subjects: string;
  experienceYears: number;
  hourlyRate: number;
  reviewCount: number;
  averageRating: number; // মেইন অবজেক্টেও যদি থাকে
  createdAt: string | Date;
  updatedAt: string | Date;

  // Relations
  category: TUTOR_CATEGORY;
  user: TUTOR_USER;
}
