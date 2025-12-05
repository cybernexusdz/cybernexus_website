// src/pages/MeetTheTeam.tsx
import React, { useEffect } from "react";
import { useTeamNavigation } from "@/hooks/useTeamNavigation";
import {
  departments,
  teamMembers,
  getMembersByDepartment,
} from "@/data/teamData";
import DepartmentGrid from "@/components/team/DepartmentGrid";
import DepartmentExpanded from "@/components/team/DepartmentExpanded";
import MemberCard from "@/components/team/MemberCard";

const MeetTheTeam: React.FC = () => {
  const {
    currentView,
    selectedDepartment,
    selectedMember,
    selectDepartment,
    selectMember,
    closeMember,
    backToGrid,
  } = useTeamNavigation();

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

  return (
    <div className="relative w-full min-h-screen bg-background">
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
    </div>
  );
};

export default MeetTheTeam;
