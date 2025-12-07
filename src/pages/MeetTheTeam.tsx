import React, { useState } from "react";
import {
  departments,
  teamMembers,
  getMembersByDepartment,
} from "@/data/teamData";
import DepartmentGrid from "@/components/team/DepartmentGrid";
import DepartmentExpanded from "@/components/team/DepartmentExpanded";
import MemberCard from "@/components/team/MemberCard";

type ViewType = "grid" | "expanded";

const MeetTheTeamSection: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>("grid");
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  // Get current department data
  const currentDepartment = selectedDepartment
    ? departments.find((d) => d.id === selectedDepartment)
    : null;

  // Get department members
  const departmentMembers = selectedDepartment
    ? getMembersByDepartment(selectedDepartment)
    : [];

  // Get current member data
  const currentMember = selectedMember
    ? teamMembers.find((m) => m.id === selectedMember)
    : null;

  // Navigation handlers
  const selectDepartment = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    setCurrentView("expanded");
  };

  const selectMember = (memberId: number) => {
    setSelectedMember(memberId);
  };

  const closeMember = () => {
    setSelectedMember(null);
  };

  const backToGrid = () => {
    setCurrentView("grid");
    setSelectedDepartment(null);
    setSelectedMember(null);
  };

  return (
    <section className="relative w-full bg-background">
      {/* Grid view */}
      {currentView === "grid" && (
        <div className="animate-in fade-in duration-500">
          <DepartmentGrid
            departments={departments}
            teamMembers={teamMembers}
            onSelectDepartment={selectDepartment}
          />
        </div>
      )}

      {/* Expanded department view */}
      {currentView === "expanded" && currentDepartment && (
        <div className="animate-in fade-in duration-500">
          <DepartmentExpanded
            department={currentDepartment}
            departmentMembers={departmentMembers}
            onBack={backToGrid}
            onSelectMember={selectMember}
          />
        </div>
      )}

      {/* Member detail modal */}
      {selectedMember && currentMember && currentDepartment && (
        <MemberCard
          member={currentMember}
          currentDepartment={currentDepartment}
          allDepartments={departments}
          onClose={closeMember}
        />
      )}
    </section>
  );
};

export default MeetTheTeamSection;
