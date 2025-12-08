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
  departmentRoles: DepartmentRole[]; // Different role per department
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide-react icon name
}

export const departments: Department[] = [
  {
    id: "leadership",
    name: "Club Leadership",
    description: "Overall club management and strategic direction",
    icon: "Crown",
  },
  {
    id: "hr",
    name: "Human Resources",
    description: "Member management and HR operations",
    icon: "Users",
  },
  {
    id: "external",
    name: "External Relations",
    description: "Managing external partnerships and relationships",
    icon: "Handshake",
  },
  {
    id: "treasury",
    name: "Treasury",
    description: "Financial management and budgeting",
    icon: "Wallet",
  },
  {
    id: "media",
    name: "Media & Content",
    description: "Content creation, photography, and media production",
    icon: "Camera",
  },
  {
    id: "development",
    name: "Development",
    description: "Technical development and web applications",
    icon: "Code",
  },
  {
    id: "design",
    name: "Design & Branding",
    description: "Visual design, UI/UX, and brand identity",
    icon: "Palette",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sabrine Boughrab",
    image: "/images/team/sabrine-image-front.png",
    socialLinks: [],
    bio: "Leading CyberNexus with vision and design excellence",
    departmentRoles: [
      { departmentId: "leadership", role: "Club Leader", isLead: true },
      { departmentId: "design", role: "Design Lead", isLead: false },
      {
        departmentId: "external",
        role: "External Relations",
        isLead: false,
      },
    ],
  },
  {
    id: 2,
    name: "OULD Hocine Sofiane",
    image: "/images/team/sofiane-image-front.jpg",
    socialLinks: [],
    bio: "Driving media strategy and club operations",
    departmentRoles: [
      { departmentId: "leadership", role: "Co-Leader", isLead: true },
      { departmentId: "media", role: "Media Lead", isLead: true },
    ],
  },
  {
    id: 3,
    name: "Tounsi Abd Essamed",
    image: "/images/team/tounssi-image-front.jpg",
    socialLinks: [
      {
        icon: "Globe",
        href: "https://port-folio-hvbi.vercel.app/",
        label: "Portfolio",
      },
      { icon: "Mail", href: "mailto:mcboosabdo@gmail.com", label: "Email" },
    ],
    departmentRoles: [
      { departmentId: "leadership", role: "General Secretary" },
      { departmentId: "media", role: "Content Creator" },
    ],
  },
  {
    id: 4,
    name: "Gaza Aya",
    image: "/images/team/aya-image-front.png",
    bio: "حينمـــا تلتــــــقي الكلمـــــــــة بألـــــف حـرف",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "media", role: "Club Writer" },
      { departmentId: "hr", role: "Member" },
    ],
  },
  {
    id: 5,
    name: "Soltana",
    image: "/images/team/soltana-iamge-front.png",
    socialLinks: [],
    departmentRoles: [{ departmentId: "hr", role: "Legal Advisor" }],
  },
  {
    id: 6,
    name: "Benghanem Riad",
    image: "/images/team/riad-image-front.png",
    bio: "Just chill 🦦",
    socialLinks: [
      {
        icon: "Mail",
        href: "mailto:achrafriadh123456@gmail.com",
        label: "Email",
      },
    ],
    departmentRoles: [{ departmentId: "hr", role: "HR Lead", isLead: true }],
  },
  {
    id: 7,
    name: "MATELA Abdelhafid",
    image: "/images/team/hafid-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "hr", role: "HR Team Member" },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 8,
    name: "Moussa Ahlem",
    image: "/images/team/ahlem-image-front.png",
    bio: "Passion for people, dedication to excellence.",
    socialLinks: [
      { icon: "Send", href: "https://t.me/+213555865385", label: "Telegram" },
    ],
    departmentRoles: [{ departmentId: "hr", role: "HR Team Member" }],
  },
  {
    id: 9,
    name: "Bedoui Denia",
    image: "/images/team/wissam-image-front.png",
    bio: "Layers in the gaps.",
    socialLinks: [
      { icon: "Github", href: "https://github.com/wssmei", label: "GitHub" },
      {
        icon: "Linkedin",
        href: "https://www.linkedin.com/in/deniabedoui/",
        label: "LinkedIn",
      },
      {
        icon: "Globe",
        href: "https://www.behance.net/deniabd",
        label: "Behance",
      },
    ],
    departmentRoles: [
      { departmentId: "hr", role: "HR Team Member" },
      { departmentId: "design", role: "Designer" },
    ],
  },
  {
    id: 10,
    name: "Benzarfa Rania Manel",
    image: "/images/team/rania-image-front.png",
    socialLinks: [],
    departmentRoles: [{ departmentId: "hr", role: "HR Team Member" }],
  },
  {
    id: 11,
    name: "Farah",
    image: "/images/team/farah-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "media", role: "Content Creator" },
      { departmentId: "design", role: "Designer" },
    ],
  },
  {
    id: 12,
    name: "Rafika Rohdea",
    image: "/images/team/rafika-image-front.png",
    bio: "Embodiment of ideas into an unforgettable reality.",
    socialLinks: [
      {
        icon: "Github",
        href: "https://github.com/rafikarohdea",
        label: "Github",
      },
    ],
    departmentRoles: [{ departmentId: "hr", role: "HR Team Member" }],
  },
  {
    id: 27,
    name: "Fatah",
    image: "/images/team/fatah-image-front.png",
    bio: "Try to show your best, not what others deem the best",
    socialLinks: [],
    departmentRoles: [{ departmentId: "hr", role: "HR Team Member" }],
  },
  {
    id: 13,
    name: "Mendjour Lounis",
    image: "/images/team/lounis-image-front.png",
    socialLinks: [
      {
        icon: "Globe",
        href: "https://www.instagram.com/mendjour.lounis",
        label: "Instagram",
      },
    ],
    departmentRoles: [
      {
        departmentId: "external",
        role: "External Relations Lead",
        isLead: true,
      },
    ],
  },
  {
    id: 14,
    name: "Hadjadj Kawther",
    image: "/images/team/kawther-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "treasury", role: "Treasurer", isLead: true },
    ],
  },
  {
    id: 15,
    name: "Samira Mostefaoui",
    image: "/images/team/samira-image-front.png",
    socialLinks: [],
    departmentRoles: [{ departmentId: "media", role: "Photographer" }],
  },
  {
    id: 16,
    name: "Chikhaoui Ahmed",
    image: "/images/team/chikhaoui-image-front.png",
    bio: "._.",
    socialLinks: [
      { icon: "Github", href: "https://github.com/mrahmed14", label: "GitHub" },
      { icon: "Globe", href: "https://www.mrahmed.org/", label: "Portfolio" },
    ],
    departmentRoles: [
      { departmentId: "media", role: "Photographer" },
      { departmentId: "design", role: "Designer", isLead: true },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 17,
    name: "Kamel",
    image: "/images/team/kamel-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "media", role: "Media Member" },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 18,
    name: "Mohamed Reggad",
    image: "/images/team/reggad-image-front.png",
    bio: "Here for anything related to spreading benefit",
    socialLinks: [],
    departmentRoles: [{ departmentId: "media", role: "Video Editor" }],
  },
  {
    id: 19,
    name: "Hakim Ait Abderrahim",
    image: "/images/team/hakim-image-front.jpg",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "development", role: "Lead Developer", isLead: false },
    ],
  },
  {
    id: 20,
    name: "Mlsvmdl",
    image: "/images/team/mlsvmdl-image-front.jpg",
    bio: "☀️ Chich Loves Poppo ☀️",
    socialLinks: [
      { icon: "Github", href: "https://github.com/mlsvmdl", label: "GitHub" },
    ],

    departmentRoles: [
      { departmentId: "development", role: "Developer", isLead: true },
    ],
  },
  {
    id: 21,
    name: "Nadji",
    image: "/images/team/nadji-image-front.png",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 22,
    name: "Missoum Hadi Adda",
    image: "/images/team/adda-image-front.jpg",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 23,
    name: "Adam Rhmni",
    image: "/images/team/adam-image-front.jpg",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 24,
    name: "Bousbia Mouhhamed Bachir",
    image: "/images/team/bachir-iamge-front.jpg",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 25,
    name: "Noureddine Yahia",
    image: "/images/team/noureddine-image-front.jpg",
    bio: "Coding my way to better solution",
    socialLinks: [
      { icon: "Github", href: "https://github.com/Yahia47", label: "GitHub" },
      {
        icon: "Linkedin",
        href: "https://www.linkedin.com/in/merdjet-yahia-noureddine-510a94255 /",
        label: "LinkedIn",
      },
    ],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 26,
    name: "Amine",
    image: "/images/team/amine-image-front.jpg",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
];

// Helper function to get members by department with their specific role
export const getMembersByDepartment = (
  departmentId: string,
): Array<
  TeamMember & { roleInDepartment: string; isLeadInDepartment: boolean }
> => {
  return teamMembers
    .filter((member) =>
      member.departmentRoles.some((dr) => dr.departmentId === departmentId),
    )
    .map((member) => {
      const deptRole = member.departmentRoles.find(
        (dr) => dr.departmentId === departmentId,
      )!;
      return {
        ...member,
        roleInDepartment: deptRole.role,
        isLeadInDepartment: deptRole.isLead || false,
      };
    });
};

// Helper function to get department lead
export const getDepartmentLead = (
  departmentId: string,
): (TeamMember & { roleInDepartment: string }) | undefined => {
  const member = teamMembers.find((m) =>
    m.departmentRoles.some(
      (dr) => dr.departmentId === departmentId && dr.isLead,
    ),
  );

  if (!member) return undefined;

  const deptRole = member.departmentRoles.find(
    (dr) => dr.departmentId === departmentId,
  )!;

  return {
    ...member,
    roleInDepartment: deptRole.role,
  };
};
