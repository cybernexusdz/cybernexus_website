import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import CyberCard from "@/components/ui/CyberCard";
import { useCyberScrollAnimation } from "@/hooks/useCyberScrollAnimation";
import WorkshopSessionsModal, {
  type WorkshopWithSessions,
} from "@/components/workshops/WorkshopSessionsModal";
import EnrollModal from "@/components/workshops/EnrollModal";
import UploadModal from "@/components/workshops/UploadModal";
import MaterialsModal from "@/components/workshops/MaterialsModal";
import { supabase } from "@/lib/supabase";
import {
  X,
  FileType,
  Terminal,
  Code2,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Globe,
  Cpu,
  Brain,
  Layers,
  ChevronLeft,
  ChevronRight,
  Star,
  Code,
  Server,
  UserPlus,
  PenTool,
  UploadCloud,
  Lock,
  Download,
  LogOut,
} from "lucide-react";

// Category color mapping
const categoryColorMap: Record<string, { id: string; icon: any; title: string; color: string; bgColor: string; borderColor: string; glowColor: "cyan" | "purple" | "primary" | "pink" | "secondary" }> = {
  frontend: { id: "frontend", icon: Code, title: "Frontend Development", color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", glowColor: "cyan" },
  backend: { id: "backend", icon: Server, title: "Backend Development", color: "text-purple-400", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/20", glowColor: "purple" },
  oop: { id: "oop", icon: Layers, title: "Object-Oriented Programming", color: "text-green-400", bgColor: "bg-green-500/10", borderColor: "border-green-500/20", glowColor: "primary" },
  algorithms: { id: "algorithms", icon: Brain, title: "Algorithms & Data Structures", color: "text-pink-400", bgColor: "bg-pink-500/10", borderColor: "border-pink-500/20", glowColor: "pink" },
  networking: { id: "networking", icon: Globe, title: "Networking Principles", color: "text-blue-400", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/20", glowColor: "cyan" },
  ai: { id: "ai", icon: Cpu, title: "Artificial Intelligence", color: "text-orange-400", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/20", glowColor: "primary" },
  uiux: { id: "uiux", icon: PenTool, title: "UI/UX Design", color: "text-yellow-400", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/20", glowColor: "primary" },
};

type WorkshopStatus = "upcoming" | "open" | "full";
type WorkshopLevel = "Beginner" | "Intermediate" | "Advanced";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  category: string;
  level: WorkshopLevel;
  seats: number;
  enrolled: number;
  status: WorkshopStatus;
  tags: string[];
  featured?: boolean;
}

const workshops: Workshop[] = [
  {
    id: 1,
    title: "Frontend Workshop",
    description:
      "Master modern frontend development with HTML, CSS, and JavaScript. Build responsive, interactive web pages from scratch using real-world techniques and best practices.",
    date: "April 13, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Lab 204, Tech Building",
    instructor: "Adda Hadi Missom",
    category: "frontend",
    level: "Beginner",
    seats: 30,
    enrolled: 22,
    status: "open",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    featured: true,
  },
  {
    id: 2,
    title: "Backend Workshop",
    description:
      "Dive into server-side development with Node.js and Express. Learn how to build REST APIs, connect to databases, and handle authentication.",
    date: "April 14, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Lab 204, Tech Building",
    instructor: "Kamel Abada",
    category: "backend",
    level: "Beginner",
    seats: 25,
    enrolled: 18,
    status: "open",
    tags: ["Node.js", "Express", "REST API", "MongoDB"],
    featured: true,
  },
  {
    id: 3,
    title: "OOP Workshop",
    description:
      "Understand the core principles of Object-Oriented Programming — encapsulation, inheritance, polymorphism, and abstraction. Hands-on exercises in Python and Java.",
    date: "April 7, 2026",
    time: "4:00 PM",
    duration: "2.5 hours",
    location: "Lab 102, CS Building",
    instructor: "Ait abderrahim abdelhakim",
    category: "oop",
    level: "Beginner",
    seats: 30,
    enrolled: 26,
    status: "open",
    tags: ["OOP", "Python", "Java", "Design Patterns"],
    featured: true,
  },
  {
    id: 4,
    title: "Algorithmes",
    description: "Deep dive into advanced algorithms, dynamic programming, and complex data structures optimizations.",
    date: "April 11, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Lab 305, Tech Building",
    instructor: "Ait abderrahim abdelhakim",
    category: "algorithms",
    level: "Intermediate",
    seats: 25,
    enrolled: 0,
    status: "open",
    tags: ["Algorithms", "Data Structures", "Optimization"],
    featured: true,
  },
  {
    id: 5,
    title: "Networking Principles",
    description: "Understand the fundamentals of computer networking, protocols, and network architecture.",
    date: "Coming Soon",
    time: "TBA",
    duration: "3 hours",
    location: "Lab 201, Tech Building",
    instructor: "Abdelaziz Benallou",
    category: "networking",
    level: "Intermediate",
    seats: 30,
    enrolled: 30,
    status: "upcoming",
    tags: ["Networking", "Protocols", "OSI"],
    featured: true,
  },
  {
    id: 6,
    title: "Artificial Intelligence",
    description: "Introduction to Artificial Intelligence, machine learning concepts, and basic neural networks.",
    date: "February 8, 2026",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Lab 402, CS Building",
    instructor: "Tounsi Abdessamed",
    category: "ai",
    level: "Beginner",
    seats: 40,
    enrolled: 40,
    status: "upcoming",
    tags: ["AI", "Machine Learning", "Neural Networks"],
    featured: true,
  },
  {
    id: 7,
    title: "UI/UX Design",
    description: "Learn the fundamentals of user interface and user experience design, wireframing, and interactive prototyping using Figma.",
    date: "February 8, 2026",
    time: "10:00 AM",
    duration: "3 hours",
    location: "Lab 105, Design Building",
    instructor: "Sabrine Boughrab",
    category: "uiux",
    level: "Beginner",
    seats: 30,
    enrolled: 30,
    status: "upcoming",
    tags: ["UI/UX", "Figma", "Design"],
    featured: true,
  },
];

const workshopSessionsData: Record<number, WorkshopWithSessions> = {
  1: {
    id: 1, title: "Frontend Workshop", description: "Master modern frontend development",
    instructor: "Adda Hadi Missom", category: "frontend", level: "Beginner", tags: ["HTML", "CSS", "JavaScript"],
    totalSessions: 1, completedSessions: 0,
    sessions: [
      { id: 101, sessionNumber: 1, title: "HTML Fundamentals & Semantic Markup", description: "Learn HTML5 elements, semantic tags, forms, and accessibility best practices.", date: "April 13, 2026", time: "2:00 PM", duration: "3h", location: "Lab 204", topics: ["HTML5", "Semantic", "Forms"], status: "upcoming", attendees: 0, resources: ["slides.pdf", "starter-code.zip"] },
    ],
  },
  2: {
    id: 2, title: "Backend Workshop", description: "Server-side development with Node.js",
    instructor: "Kamel Abada", category: "backend", level: "Beginner", tags: ["Node.js", "Express", "MongoDB"],
    totalSessions: 1, completedSessions: 0,
    sessions: [
      { id: 201, sessionNumber: 1, title: "Node.js Fundamentals", description: "Understand the Node.js runtime, modules, npm, and async programming.", date: "April 14, 2026", time: "2:00 PM", duration: "3h", location: "Lab 204", topics: ["Node.js", "npm", "Async"], status: "upcoming", attendees: 0 },
    ],
  },
  3: {
    id: 3, title: "OOP Workshop", description: "Object-Oriented Programming fundamentals",
    instructor: "Ait abderrahim abdelhakim", category: "oop", level: "Beginner", tags: ["OOP", "Python", "Java"],
    totalSessions: 1, completedSessions: 1,
    sessions: [
      { id: 301, sessionNumber: 1, title: "Classes, Objects & Encapsulation", description: "Understand classes, objects, attributes, methods, and data encapsulation.", date: "April 7, 2026", time: "4:00 PM", duration: "2.5h", location: "Lab 102", topics: ["Classes", "Objects", "Encapsulation"], status: "completed", attendees: 26 },
    ],
  },
  4: {
    id: 4, title: "Algorithmes", description: "Deep dive into advanced algorithms, dynamic programming, and complex data structures optimizations.",
    instructor: "Ait abderrahim abdelhakim", category: "algorithms", level: "Intermediate", tags: ["Algorithms", "Optimization"],
    totalSessions: 3, completedSessions: 2,
    sessions: [
      { id: 401, sessionNumber: 1, title: "Introduction to Algorithmes", description: "Fundamentals of sorting, searching, and algorithm complexity.", date: "November 29, 2025", time: "2:00 PM", duration: "3h", location: "Lab 305", topics: ["Sorting", "Complexity"], status: "completed", attendees: 25 },
      { id: 402, sessionNumber: 2, title: "Intermediate Algorithmes", description: "Data structures, hash maps, and recursion.", date: "December 20, 2025", time: "2:00 PM", duration: "3h", location: "Lab 305", topics: ["Data Structures", "Recursion"], status: "completed", attendees: 22 },
      { id: 403, sessionNumber: 3, title: "Advanced Algorithmes", description: "Learn dynamic programming, breadth-first search, and shortest path algorithms.", date: "April 11, 2026", time: "2:00 PM", duration: "3h", location: "Lab 305", topics: ["Graphs", "DP", "BFS"], status: "upcoming", attendees: 0 },
    ],
  },
  5: {
    id: 5, title: "Networking Principles", description: "Understand the fundamentals of networking and protocols.",
    instructor: "Abdelaziz Benallou", category: "networking", level: "Intermediate", tags: ["Networking", "OSI", "TCP/IP"],
    totalSessions: 2, completedSessions: 1,
    sessions: [
      { id: 501, sessionNumber: 1, title: "Networking Basics & OSI Model", description: "Introduction to OSI model, IP addressing, and fundamental protocols.", date: "February 4, 2026", time: "2:00 PM", duration: "3h", location: "Lab 201", topics: ["OSI", "IP Addressing"], status: "completed", attendees: 20 },
      { id: 502, sessionNumber: 2, title: "Advanced Protocols & Security", description: "Deep dive into routing, switching, and network security basics.", date: "April 15, 2026", time: "2:00 PM", duration: "3h", location: "Lab 201", topics: ["Routing", "Security"], status: "upcoming", attendees: 0 },
    ],
  },
  6: {
    id: 6, title: "Artificial Intelligence", description: "Fundamentals of AI and Machine Learning.",
    instructor: "Tounsi Abdessamed", category: "ai", level: "Beginner", tags: ["AI", "ML"],
    totalSessions: 1, completedSessions: 1,
    sessions: [
      { id: 601, sessionNumber: 1, title: "Intro to Artificial Intelligence", description: "Basic concepts of AI, history, and overview of Machine Learning.", date: "February 8, 2026", time: "2:00 PM", duration: "3h", location: "Lab 402", topics: ["AI basics", "ML overview"], status: "completed", attendees: 28 },
    ],
  },
  7: {
    id: 7, title: "UI/UX Design", description: "Design fundamentals and prototyping with Figma.",
    instructor: "Sabrine Boughrab", category: "uiux", level: "Beginner", tags: ["UI", "UX", "Figma"],
    totalSessions: 2, completedSessions: 2,
    sessions: [
      { id: 701, sessionNumber: 1, title: "Introduction to User Experience", description: "Learn the core principles of UI/UX, wireframing, and Figma basics.", date: "December 12, 2025", time: "2:00 PM", duration: "3h", location: "Lab 105", topics: ["Figma", "Wireframing"], status: "completed", attendees: 30 },
      { id: 702, sessionNumber: 2, title: "Prototyping & User Testing", description: "Advanced interactive prototyping, animation, and remote user testing.", date: "February 8, 2026", time: "2:00 PM", duration: "3h", location: "Lab 105", topics: ["Prototyping", "User Testing"], status: "completed", attendees: 28 },
    ],
  },
};

// Calendar data - upcoming 14 days with workshops
const generateCalendarDays = () => {
  const days = [];
  const today = new Date(); // Always starts from the current day
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    const workshopsOnDay = workshops.filter((w) => {
      const wDate = new Date(w.date);
      return wDate.toDateString() === date.toDateString();
    });
    days.push({
      date: dateStr,
      dayName: dayNames[date.getDay()],
      dayNumber: date.getDate(),
      isToday: i === 0,
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
      workshops: workshopsOnDay,
    });
  }
  return days;
};

const calendarDays = generateCalendarDays();

// Stats dynamically calculated below

const getLevelColor = (level: WorkshopLevel) => {
  switch (level) {
    case "Beginner":
      return "text-green-400 border-green-500/30 bg-green-500/10";
    case "Intermediate":
      return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    case "Advanced":
      return "text-red-400 border-red-500/30 bg-red-500/10";
  }
};

const getStatusConfig = (status: WorkshopStatus) => {
  switch (status) {
    case "open":
      return {
        text: "Open",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        dot: "bg-green-400",
      };
    case "full":
      return {
        text: "Full",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        dot: "bg-red-400",
      };
    case "upcoming":
      return {
        text: "Coming Soon",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        dot: "bg-yellow-400",
      };
  }
};

const getCategoryColor = (categoryId: string) => {
  return categoryColorMap[categoryId] || categoryColorMap["web"];
};

const WorkshopsPage: React.FC = () => {
  const [selectedFeaturedWorkshop, setSelectedFeaturedWorkshop] = useState<number | null>(null);
  const [calendarStart, setCalendarStart] = useState(0);
  const [enrollingWorkshop, setEnrollingWorkshop] = useState<{ id: number; title: string; category: string } | null>(null);
  const [uploadingWorkshop, setUploadingWorkshop] = useState<{ id: number; title: string } | null>(null);
  const [viewingMaterialsWorkshop, setViewingMaterialsWorkshop] = useState<{ id: number; title: string } | null>(null);
  const [activeAdminMenu, setActiveAdminMenu] = useState<number | null>(null);
  const [enrollmentCounts, setEnrollmentCounts] = useState<Record<number, number>>({});
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchEnrollments = async () => {
    try {
      const { data, error } = await supabase.from('workshop_enrollments').select('workshop_id');
      if (error) {
        console.error("Error fetching enrollments:", error);
        return;
      }
      if (data) {
        const counts: Record<number, number> = {};
        data.forEach((row: any) => {
          counts[row.workshop_id] = (counts[row.workshop_id] || 0) + 1;
        });
        setEnrollmentCounts(counts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchEnrollments();
    setIsAdmin(localStorage.getItem("cybernexus_admin") === "true");
  }, []);

  // Animations
  const heroRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 1.0,
    delay: 0.1,
  });

  const statsRef = useCyberScrollAnimation({
    animation: "cyberGlitchCenter",
    duration: 0.8,
    delay: 0.2,
    stagger: 0.1,
  });


  const totalDatabaseAttendees = Object.values(enrollmentCounts).reduce((a, b) => a + b, 0);
  const displayStats = [
    { label: "Workshops Held", value: "7", icon: BookOpen },
    { label: "Total Attendees", value: totalDatabaseAttendees.toString(), icon: Users },
    { label: "Expert Instructors", value: "6", icon: Star },
    { label: "Technologies Covered", value: "6", icon: Cpu },
  ];

  const featuredWorkshops = workshops.filter((w) => w.featured);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isAdmin && (
        <button 
          onClick={() => {
            localStorage.removeItem("cybernexus_admin");
            setIsAdmin(false);
          }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-10 duration-500 group pointer-events-auto"
        >
          <Badge className="bg-primary/20 backdrop-blur-md text-primary font-mono px-4 py-2 shadow-lg shadow-primary/20 border border-primary/50 flex items-center gap-2 group-hover:bg-red-500/20 group-hover:text-red-400 group-hover:border-red-500/50 group-hover:shadow-red-500/20 transition-all cursor-pointer">
            <Lock className="w-4 h-4 group-hover:hidden" />
            <LogOut className="w-4 h-4 hidden group-hover:block" />
            <span className="group-hover:hidden">ADMIN ACCESS ACTIVE</span>
            <span className="hidden group-hover:inline">LOGOUT</span>
          </Badge>
        </button>
      )}
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        {/* Background Effects */}
        <div className="cyber-grid absolute inset-0 opacity-30" />
        <div className="cyber-grid-diagonal absolute inset-0 opacity-20" />
        <div className="circuit-line circuit-line-1" />
        <div className="circuit-line circuit-line-2" />
        <div className="scanlines absolute inset-0 pointer-events-none opacity-20" />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="data-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 15}s`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}

        <div ref={heroRef} className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          {/* Badge */}
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="border-primary/50 bg-background/80 backdrop-blur-sm px-4 py-2 font-mono neon-border-subtle"
            >
              <Terminal className="w-4 h-4 mr-2 inline animate-pulse-fast" />
              &lt;WORKSHOP_SYSTEM /&gt;
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground font-mono">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Workshops
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto font-mono leading-relaxed">
            <span className="text-primary animate-pulse-slow">&gt;_</span> Level
            up your skills with hands-on workshops led by experienced
            developers. Build real projects, learn real tools.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent data-line" />
            <Code2 className="w-4 h-4 text-primary/40 animate-pulse-fast" />
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-10" />

        <div
          ref={statsRef}
          className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10"
        >
          {displayStats.map((stat, index) => (
            <CyberCard
              key={index}
              variant="hologram"
              glowColor="primary"
              className="p-6 text-center"
            >
              <div className="relative z-10 space-y-3">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-black text-primary font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/60 font-mono">
                  {stat.label}
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </section>

      {/* ==================== FEATURED WORKSHOPS ==================== */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="cyber-grid-diagonal absolute inset-0 opacity-15" />
        <div className="circuit-line circuit-line-3" />

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Badge
                variant="outline"
                className="border-yellow-500/50 bg-yellow-500/10 backdrop-blur-sm px-4 py-2 font-mono"
              >
                <Star className="w-4 h-4 mr-2 inline text-yellow-400" />
                FEATURED
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground font-mono">
              <span className="text-primary">&gt;</span> All{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                Workshops
              </span>
            </h2>
          </div>

          {/* Featured Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWorkshops.map((workshop, index) => {
              const catInfo = getCategoryColor(workshop.category);
              const statusConfig = getStatusConfig(workshop.status);
              const enrolledCount = enrollmentCounts[workshop.id] || 0;
              const progressPercent = (enrolledCount / workshop.seats) * 100;

              return (
                <div
                  key={workshop.id}
                  onClick={() => setSelectedFeaturedWorkshop(workshop.id)}
                >
                  <CyberCard
                    variant="hologram"
                    glowColor={catInfo.glowColor}
                    className={`p-6 ${catInfo.borderColor} hover:scale-[1.02] transition-transform duration-300 cursor-pointer`}
                  >
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-lg ${catInfo.bgColor} border ${catInfo.borderColor} flex items-center justify-center`}>
                          <catInfo.icon className={`w-5 h-5 ${catInfo.color}`} />
                        </div>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono ${statusConfig.bg} ${statusConfig.border} border`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot} animate-pulse`} />
                          <span className={statusConfig.color}>{statusConfig.text}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-foreground font-mono leading-tight">{workshop.title}</h3>
                      <Badge variant="outline" className={`text-xs font-mono ${getLevelColor(workshop.level)}`}>{workshop.level}</Badge>
                      <div className="space-y-2 text-sm text-foreground/70">
                        <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary/60" /><span className="font-mono font-bold text-foreground/90">{workshop.instructor}</span></div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary/60" /><span className="font-mono">{workshop.date}</span></div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary/60" /><span className="font-mono">{workshop.time} · {workshop.duration}</span></div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono text-foreground/60"><span>{enrolledCount}/{workshop.seats} enrolled</span><span>{Math.round(progressPercent)}%</span></div>
                        <div className="relative h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                          <div className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ${progressPercent >= 100 ? "bg-red-500/70" : progressPercent >= 75 ? "bg-yellow-500/70" : "bg-primary/70"}`} style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {workshop.tags.map((tag, i) => (<span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-foreground/5 text-foreground/50 border border-foreground/10">{tag}</span>))}
                      </div>
                      {/* View Sessions hint */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-mono ${catInfo.color} opacity-70`}>View all sessions</span>
                          <ArrowRight className={`w-3.5 h-3.5 ${catInfo.color} opacity-70`} />
                        </div>
                        <div className="flex flex-wrap items-center justify-end gap-2">
                          {isAdmin && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingMaterialsWorkshop({ id: workshop.id, title: workshop.title });
                              }}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-primary/30 text-primary font-mono font-bold text-xs hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Materials
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (workshop.status === "open") {
                                setEnrollingWorkshop({ id: workshop.id, title: workshop.title, category: workshop.category });
                              }
                            }}
                            disabled={workshop.status !== "open"}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-bold text-xs transition-all duration-300 ${workshop.status !== "open" ? "bg-foreground/10 text-foreground/40 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:scale-105 hover:shadow-lg hover:shadow-primary/20"}`}
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            {workshop.status === "full" ? "Closed" : workshop.status === "upcoming" ? "Coming Soon" : "Enroll"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </CyberCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* ==================== CALENDAR SECTION ==================== */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="cyber-grid absolute inset-0 opacity-15" />
        <div className="circuit-line circuit-line-2" />

        <div className="max-w-6xl mx-auto space-y-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-foreground font-mono">
                <span className="text-primary">&gt;</span> Workshop{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">Calendar</span>
              </h2>
              <p className="text-foreground/60 font-mono text-sm">Upcoming 14 days schedule</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCalendarStart(Math.max(0, calendarStart - 7))} 
                disabled={calendarStart === 0} 
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
                aria-label="Previous Week"
              >
                <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button 
                onClick={() => setCalendarStart(Math.min(7, calendarStart + 7))} 
                disabled={calendarStart >= 7} 
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/40 hover:text-primary hover:border-primary/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
                aria-label="Next Week"
              >
                <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {calendarDays.slice(calendarStart, calendarStart + 7).map((day, i) => {
              const hasWorkshops = day.workshops.length > 0;
              return (
                <div key={i} className={`rounded-xl border transition-all duration-300 ${
                  day.isToday ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20" : day.isWeekend ? "border-foreground/5 bg-foreground/[0.02]" : "border-foreground/10 bg-card/30"
                } ${hasWorkshops ? "hover:scale-[1.03] hover:border-primary/30" : ""}`}>
                  {/* Day Header */}
                  <div className={`px-3 py-2 border-b ${day.isToday ? "border-primary/20" : "border-foreground/5"} text-center`}>
                    <div className={`text-[10px] font-mono uppercase tracking-wider ${day.isToday ? "text-primary" : "text-foreground/40"}`}>{day.dayName}</div>
                    <div className={`text-xl font-black font-mono ${day.isToday ? "text-primary" : "text-foreground/80"}`}>{day.dayNumber}</div>
                    {day.isToday && <div className="text-[9px] font-mono text-primary/60">TODAY</div>}
                  </div>
                  {/* Workshops */}
                  <div className="p-2 min-h-[80px] space-y-1.5">
                    {day.workshops.length > 0 ? day.workshops.map((w) => {
                      const cat = getCategoryColor(w.category);
                      return (
                        <div key={w.id} className={`p-2 rounded-lg ${cat.bgColor} border ${cat.borderColor} cursor-pointer hover:scale-[1.02] transition-all duration-200`}>
                          <div className={`text-[10px] font-bold font-mono ${cat.color} leading-tight line-clamp-2`}>{w.title}</div>
                          <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-foreground/40">
                            <Clock className="w-2.5 h-2.5" />{w.time}
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="flex items-center justify-center h-full text-foreground/15 text-[10px] font-mono">No workshops</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SESSIONS MODAL ==================== */}
      {selectedFeaturedWorkshop && workshopSessionsData[selectedFeaturedWorkshop] && (() => {
        const wsData = workshopSessionsData[selectedFeaturedWorkshop];
        const catInfo = getCategoryColor(wsData.category);
        return (
          <WorkshopSessionsModal
            workshop={wsData}
            onClose={() => setSelectedFeaturedWorkshop(null)}
            onEnroll={() => {
              setSelectedFeaturedWorkshop(null);
              setEnrollingWorkshop({ id: wsData.id, title: wsData.title, category: wsData.category });
            }}
            categoryColor={catInfo.color}
            categoryBgColor={catInfo.bgColor}
            categoryBorderColor={catInfo.borderColor}
            categoryIcon={catInfo.icon}
            glowColor={catInfo.glowColor}
          />
        );
      })()}

      {/* ==================== ENROLL MODAL ==================== */}
      {enrollingWorkshop && (() => {
        const catInfo = getCategoryColor(enrollingWorkshop.category);
        return (
          <EnrollModal
            workshopId={enrollingWorkshop.id}
            workshopTitle={enrollingWorkshop.title}
            glowColor={catInfo.glowColor}
            categoryColor={catInfo.color}
            categoryBorderColor={catInfo.borderColor}
            onClose={() => setEnrollingWorkshop(null)}
            onSuccess={fetchEnrollments}
          />
        );
      })()}
      {uploadingWorkshop && (
        <UploadModal
          workshopTitle={uploadingWorkshop.title}
          onClose={() => setUploadingWorkshop(null)}
        />
      )}
      {viewingMaterialsWorkshop && (
        <MaterialsModal
          workshopTitle={viewingMaterialsWorkshop.title}
          onClose={() => setViewingMaterialsWorkshop(null)}
          onUploadClick={() => {
            setUploadingWorkshop({ id: viewingMaterialsWorkshop.id, title: viewingMaterialsWorkshop.title });
            setViewingMaterialsWorkshop(null);
          }}
        />
      )}
    </div>
  );
};

export default WorkshopsPage;
