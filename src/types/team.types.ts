// src/types/team.types.ts

import { LucideIcon } from "lucide-react";

export interface SocialLink {
  icon: string | LucideIcon;
  label: string;
  href: string;
}

export interface DepartmentRole {
  departmentId: string;
  role: string;
  isLead?: boolean;
}

export type AcademicGrade =
  | "L1" // 1ère licence
  | "L2" // 2ème licence
  | "L3-SI" // 3ème licence — SI (Systèmes Informatiques)
  | "L3-ISIL" // 3ème licence — ISIL (Information Systems & Software Engineering)
  | "M1-SE" // Master 1 — Software Engineering
  | "M1-AID" // Master 1 — Artificial Intelligence & Digitalization
  | "M1-NET" // Master 1 — Networks
  | "M1-GI" // Master 1 — GI (General Informatics / Génie Informatique)
  | "M2-SE" // Master 2 — Software Engineering
  | "M2-AID" // Master 2 — Artificial Intelligence & Digitalization
  | "M2-NET" // Master 2 — Networks
  | "M2-GI"; // Master 2 — GI (General Informatics / Génie Informatique)

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  grade?: AcademicGrade | string;
  socialLinks: SocialLink[];
  bio?: string;
  departmentRoles: DepartmentRole[]; // Different role per department
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export interface Position {
  x: number;
  y: number;
}

export interface NodePosition extends Position {
  id: string | number;
}

export type ViewState = "grid" | "expanded";

export interface TeamNavigationState {
  currentView: ViewState;
  selectedDepartment: string | null;
  selectedMember: number | null;
}
