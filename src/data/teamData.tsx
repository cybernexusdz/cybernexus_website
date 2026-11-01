import {
  Department,
  DepartmentRole,
  LeadershipRank,
  TeamMember,
} from "../types/team.types";

export const departments: Department[] = [
  {
    id: "leadership",
    name: "Club Leadership",
    description:
      "Sets the club's vision, strategy and priorities; coordinates cross-department initiatives and represents the club externally.",
    icon: "Crown",
    leaderId: 1, // Sabrine
    coLeaderIds: [2], // Sofiane
  },
  {
    id: "hr",
    name: "Human Resources",
    description:
      "Recruits and onboards members, manages volunteer engagement, policies, and supports member development and well-being.",
    icon: "Users",
    leaderId: 7, // MATELA Abdelhafid
    coLeaderIds: [10], // Benzarfa Rania Manel
  },
  {
    id: "external",
    name: "External Relations",
    description:
      "Builds and maintains partnerships with organizations, handles outreach, sponsorships, and community relations.",
    icon: "Handshake",
    leaderId: 13, // Mendjour Lounis
  },
  {
    id: "treasury",
    name: "Treasury",
    description:
      "Oversees budgeting, expense tracking, fundraising, and financial reporting to ensure the club's resources are managed responsibly.",
    icon: "Wallet",
    leaderId: 14, // Hadjadj Kawther
  },
  {
    id: "media",
    name: "Media & Content",
    description:
      "Creates and distributes multimedia content — photography, video, copy, and social media — to promote events and projects.",
    icon: "Camera",
    leaderId: 2, // Sofiane
  },
  {
    id: "development",
    name: "Development",
    description:
      "Designs and builds web and software projects, maintains technical infrastructure, and supports tooling and automation for the club.",
    icon: "Code",
    leaderId: 19, // BRAHIM Youcef
  },
  {
    id: "design",
    name: "Design & Branding",
    description:
      "Shapes the club's visual identity, UI/UX for products, and produces assets for campaigns, events, and digital presence.",
    icon: "Palette",
    leaderId: 16, // Chikhaoui Ahmed
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sabrine",
    image: "/images/team/sabrine-image-front.png",
    socialLinks: [],
    grade: "M1-NET",
    bio: "Leading CyberNexus with vision and design excellence",
    departmentRoles: [
      { departmentId: "leadership", role: "Club Leader", isLead: true },
      { departmentId: "design", role: "UI/UX Designer", isLead: false },
      {
        departmentId: "hr",
        role: "Training & Culture Supervisor",
        isLead: false,
      },
      {
        departmentId: "external",
        role: "External Relations",
        isLead: false,
      },
    ],
  },
  {
    id: 2,
    name: "Sofiane",
    image: "/images/team/sofiane-image-front.jpg",
    socialLinks: [],
    grade: "M1-AID",
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
    bio: "Believe in yourself 🫶🏻",
    grade: "M1-AID",
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
    name: "Gaza. Aya.",
    image: "/images/team/aya-image-front.png",
    bio: "حينمـــا تلتــــــقي الكلمـــــــــة بألـــــف حـرف",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "media", role: "Club Writer" },
      { departmentId: "hr", role: "Data & Records Coordinator" },
    ],
  },
  {
    id: 5,
    name: "Soltana",
    image: "/images/team/soltana-iamge-front.png",
    grade: "L1-Droit",
    bio: "",
    socialLinks: [
      {
        icon: "Instagram",
        href: "https://www.instagram.com/mikas_a0301?igsh=MWk3ZmNoYXMxczdwYg==",
        label: "Instagram",
      },
    ],
    departmentRoles: [{ departmentId: "hr", role: "Legal Advisor" }],
  },
  {
    id: 6,
    name: "Benghanem Riad",
    image: "/images/team/riad-image-front.png",
    bio: "Just chill 🦦",
    grade: "M1-GL",
    socialLinks: [
      {
        icon: "Mail",
        href: "mailto:achrafriadh123456@gmail.com",
        label: "Email",
      },
    ],
    departmentRoles: [
      {
        departmentId: "hr",
        role: "Team Building & Engagement Officer",
        isLead: false,
      },
    ],
  },
  {
    id: 7,
    name: "MATELA Abdelhafid",
    image: "/images/team/hafid-image-front.png",
    grade: "L3-SI",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "hr", role: "HR Lead", isLead: true },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 8,
    name: "Moussa Ahlem",
    image: "/images/team/ahlem-image-front.png",
    bio: "Passion",
    grade: "L3-SI",
    socialLinks: [
      { icon: "Send", href: "https://t.me/+213555865385", label: "Telegram" },
    ],
    departmentRoles: [
      { departmentId: "hr", role: "Emotional Intelligence Trainer" },
    ],
  },
  {
    id: 9,
    name: "Bedoui Denia",
    image: "/images/team/wissam-image-front.png",
    grade: "L3-SI",
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
      { departmentId: "hr", role: "Engagement & Wellbeing Officer" },
      { departmentId: "design", role: "Designer" },
    ],
  },
  {
    id: 10,
    name: "Benzarfa Rania Manel",
    grade: "M1-AID",
    image: "/images/team/rania-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "hr", role: "HR Co-Leader", isLead: true },
    ],
  },
  {
    id: 11,
    name: "Farah",
    grade: "M1-NET",
    bio: "Navigating the digital cosmos 🌸👩🏻‍💻",
    image: "/images/team/farah-image-front.png",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "design", role: "Designer" },
      { departmentId: "media", role: "Content Creator" },
    ],
  },
  {
    id: 12,
    name: "Rafika Rohdea",
    image: "/images/team/rafika-image-front.png",
    grade: "L2",
    bio: "Embodiment of ideas into an unforgettable reality.",
    socialLinks: [
      {
        icon: "Github",
        href: "https://github.com/rafikarohdea",
        label: "Github",
      },
    ],
    departmentRoles: [{ departmentId: "hr", role: "Attendance Coordinator" }],
  },
  {
    id: 13,
    name: "Mendjour Lounis",
    image: "/images/team/lounis-image-front.png",
    grade: "M1-GL",
    socialLinks: [
      {
        icon: "Instagram",
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
    image: "/images/team/kawther-image-front.jpg",
    grade: "M1-GI",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "treasury", role: "Treasurer", isLead: true },
      { departmentId: "hr", role: "Performance Analyst" },
    ],
  },
  {
    id: 15,
    name: "Samira Mostefaoui",
    image: "/images/team/samira-image-front.JPG",
    grade: "L3-SI",
    socialLinks: [
      {
        icon: "Linkedin",
        href: "https://www.linkedin.com/in/mostefaoui-samira-77174b393?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
        label: "LinkedIn",
      },
      {
        icon: "Instagram",
        href: "https://www.instagram.com/sam_lens_?igsh=N3NwaXV5amI2dmVh&utm_source=qr",
        label: "Instagram",
      },
    ],
    departmentRoles: [{ departmentId: "media", role: "Photographer" }],
  },
  {
    id: 16,
    name: "Chikhaoui Ahmed",
    image: "/images/team/chikhaoui-image-front.png",
    grade: "M1-NET",
    bio: "",
    socialLinks: [
      { icon: "Github", href: "https://github.com/mrahmed14", label: "GitHub" },
      { icon: "Globe", href: "https://www.mrahmed.org/", label: "Portfolio" },
    ],
    departmentRoles: [
      { departmentId: "media", role: "Photographer" },
      { departmentId: "design", role: "Design Lead", isLead: true, rank: "leader" },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 17,
    name: "Kamel",
    grade: "M1-GL",
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
    grade: "L1",
    bio: "Here for anything related to spreading benefit",
    socialLinks: [
      {
        icon: "Instagram",
        href: "https://www.instagram.com/mohamed_reggadd?igsh=aGluYnh5d2sycTQ5",
        label: "Instagram",
      },
    ],
    departmentRoles: [{ departmentId: "media", role: "Video Editor" }],
  },
  {
    id: 19,
    name: "BRAHIM Youcef",
    image: "/images/team/joseph-image-front.jpg",
    grade: "L2",
    bio: "Code is like humor. When you have to explain it, it's bad.",
    socialLinks: [
      {
        icon: "Github",
        href: "https://github.com/joseph-cef",
        label: "GitHub",
      },
      {
        icon: "Globe",
        href: "https://my-links-joseph.netlify.app/",
        label: "Portfolio",
      },
    ],
    departmentRoles: [
      {
        departmentId: "development",
        role: "Development Lead",
        isLead: true,
        rank: "leader",
      },
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
      { departmentId: "development", role: "Developer", isLead: false },
    ],
  },

  {
    id: 22,
    name: "Missoum Hadi Adda",
    grade: "L3-SI",
    image: "/images/team/adda-image-front.jpg",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "development", role: "Developer" },
    ],
  },

  {
    id: 24,
    name: "Bousbia Mouhhamed Bachir",
    grade: "M1-GL",
    image: "/images/team/bachir-iamge-front.jpg",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 25,
    name: "Noureddine Yahia",
    image: "/images/team/noureddine-image-front.jpg",
    grade: "M1-GL",
    bio: "Coding my way to better solution",
    socialLinks: [
      { icon: "Github", href: "https://github.com/Yahia47", label: "GitHub" },
      {
        icon: "Linkedin",
        href: "https://www.linkedin.com/in/merdjet-yahia-noureddine-510a94255/",
        label: "LinkedIn",
      },
    ],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },

  {
    id: 27,
    name: "Fatah",
    image: "/images/team/fatah-image-front.png",
    grade: "L3-ISIL",
    bio: "Try to show your best, not what others deem the best",
    socialLinks: [],
    departmentRoles: [
      { departmentId: "hr", role: "Data & Records Coordinator" },
      { departmentId: "development", role: "Developer" },
    ],
  },
  {
    id: 28,
    name: "Abderrhmane Ouahrani",
    image: "/images/team/abdo-image-front.png",
    bio: "",
    socialLinks: [],
    departmentRoles: [{ departmentId: "media", role: "Photographer" }],
  },
  {
    id: 29,
    name: "Abdelaziz Benallou",
    image: "/images/team/aziz-image-front.png",
    bio: "",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Networking & Security" }],
  },
  {
    id: 31,
    name: "Selma Sayah",
    image: "/images/team/selma-image-front.jpg",
    bio: "Observe more.. React less",
    grade: "L3-SI",
    departmentRoles: [
      { departmentId: "media", role: "Content Creator" },
      {
        departmentId: "hr",
        role: "Workshop Operations Coordinator",
      },
    ],
    socialLinks: [
      {
        icon: "Instagram",
        href: "https://www.instagram.com/selmasayahh?igsh=MWIzY2kxbG5lY2JkeA==",
        label: "Instagram",
      },
    ],
  },
  {
    id: 32,
    name: " Ridha Aissani",
    image: "/images/team/ridha-image-front.jpg",
    bio: "",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
  {
    id: 33,
    name: " Dibouche Asma",
    image: "/images/team/asma-image-front.jpg",
    bio: "",
    socialLinks: [],
    departmentRoles: [{ departmentId: "development", role: "Developer" }],
  },
];

// Helper function to get members by department with their specific role and leadership hierarchy
export const getMembersByDepartment = (
  departmentId: string,
): Array<
  TeamMember & {
    roleInDepartment: string;
    isLeadInDepartment: boolean;
    leadershipRank: LeadershipRank;
  }
> => {
  const dept = departments.find((d) => d.id === departmentId);

  const rankWeight: Record<LeadershipRank, number> = {
    leader: 0,
    "co-leader": 1,
    member: 2,
  };

  return teamMembers
    .filter((member: TeamMember): boolean =>
      member.departmentRoles.some(
        (dr: DepartmentRole): boolean => dr.departmentId === departmentId,
      ),
    )
    .map((member: TeamMember) => {
      const deptRole = member.departmentRoles.find(
        (dr: DepartmentRole): boolean => dr.departmentId === departmentId,
      )!;

      let leadershipRank: LeadershipRank = "member";
      if (dept?.leaderId === member.id || deptRole.rank === "leader") {
        leadershipRank = "leader";
      } else if (
        dept?.coLeaderIds?.includes(member.id) ||
        deptRole.rank === "co-leader" ||
        (deptRole.isLead && deptRole.role.toLowerCase().includes("co-lead"))
      ) {
        leadershipRank = "co-leader";
      } else if (deptRole.isLead) {
        leadershipRank = "leader";
      }

      return {
        ...member,
        roleInDepartment: deptRole.role,
        isLeadInDepartment: leadershipRank !== "member",
        leadershipRank,
      };
    })
    .sort((a, b) => rankWeight[a.leadershipRank] - rankWeight[b.leadershipRank]);
};

export const getDepartmentLead = (
  departmentId: string,
): (TeamMember & { roleInDepartment: string }) | undefined => {
  const dept = departments.find((d) => d.id === departmentId);

  const member =
    (dept?.leaderId
      ? teamMembers.find((m) => m.id === dept.leaderId)
      : undefined) ||
    teamMembers.find((m: TeamMember): boolean =>
      m.departmentRoles.some(
        (dr: DepartmentRole) => dr.departmentId === departmentId && dr.isLead,
      ),
    );

  if (!member) return undefined;

  const deptRole = member.departmentRoles.find(
    (dr: DepartmentRole) => dr.departmentId === departmentId,
  );

  return {
    ...member,
    roleInDepartment: deptRole?.role || "Department Lead",
  };
};
