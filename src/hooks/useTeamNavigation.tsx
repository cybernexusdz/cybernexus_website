// src/hooks/useTeamNavigation.ts
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ViewType = "grid" | "expanded";

export const useTeamNavigation = () => {
  const navigate = useNavigate();
  const { departmentId, memberId } = useParams<{
    departmentId?: string;
    memberId?: string;
  }>();

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    departmentId || null,
  );
  const [selectedMember, setSelectedMember] = useState<number | null>(
    memberId ? parseInt(memberId) : null,
  );

  // Sync state with URL params
  useEffect(() => {
    setSelectedDepartment(departmentId || null);
    setSelectedMember(memberId ? parseInt(memberId) : null);
  }, [departmentId, memberId]);

  const currentView: ViewType = selectedDepartment ? "expanded" : "grid";

  const selectDepartment = useCallback(
    (id: string) => {
      setSelectedDepartment(id);
      navigate(`/meet-the-team/${id}`);
    },
    [navigate],
  );

  const selectMember = useCallback(
    (id: number) => {
      if (selectedDepartment) {
        setSelectedMember(id);
        navigate(`/meet-the-team/${selectedDepartment}/${id}`);
      }
    },
    [selectedDepartment, navigate],
  );

  const closeMember = useCallback(() => {
    setSelectedMember(null);
    if (selectedDepartment) {
      navigate(`/meet-the-team/${selectedDepartment}`);
    }
  }, [selectedDepartment, navigate]);

  const backToGrid = useCallback(() => {
    setSelectedDepartment(null);
    setSelectedMember(null);
    navigate("/meet-the-team");
  }, [navigate]);

  return {
    currentView,
    selectedDepartment,
    selectedMember,
    selectDepartment,
    selectMember,
    closeMember,
    backToGrid,
  };
};
