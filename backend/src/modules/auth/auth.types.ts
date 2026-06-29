export interface RegisterPayload {
  email: string;

  password: string;

  roleName: "ADMIN" | "STUDENT" | "ORGANIZATION";

  fullName?: string;

  universityId?: string;

  facultyId?: string;

  majorId?: string;

  academicYear?: string;

  organizationName?: string;

  description?: string;
}

export interface LoginPayload {
  email: string;

  password: string;
}
