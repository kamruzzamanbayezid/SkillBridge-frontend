export enum USER_ROLE {
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  ADMIN = "ADMIN",
}

export interface USER_DATA {
  id: string;
  name: string;
  email: string;
  role: USER_ROLE;
  image: string;
  isBanned: boolean;
  iat?: number;
  exp?: number;
}
