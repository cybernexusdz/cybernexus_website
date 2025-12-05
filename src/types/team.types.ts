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

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  socialLinks: SocialLink[];
  bio?: string;
  departmentRoles: DepartmentRole[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string; // Optional - for visual differentiation
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
