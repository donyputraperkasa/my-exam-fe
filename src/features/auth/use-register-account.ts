"use client";

import { useCallback, useState } from "react";
import type { StudentGrade } from "@/types/auth";
import type { RegisterPayload } from "./api";
import { saveSelectedGrade } from "./session";
import type { RegisterAccountType } from "./components/register-account-fields";

export function useRegisterAccount() {
  const [name, onNameChange] = useState("");
  const [accountType, onAccountTypeChange] =
    useState<RegisterAccountType>("STUDENT");
  const [schoolName, onSchoolNameChange] = useState("");
  const [teacherSubject, onTeacherSubjectChange] = useState("");
  const [schoolAddress, onSchoolAddressChange] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [gradeName, setGradeName] = useState("");

  const onGradeChange = useCallback((id: string, name: string) => {
    setGradeId(id);
    setGradeName(name);
  }, []);

  function getPayload(email: string, password: string): RegisterPayload {
    return {
      name,
      email,
      password,
      accountType,
      gradeId: accountType === "STUDENT" ? gradeId : undefined,
      schoolName: accountType === "TEACHER" ? schoolName : undefined,
      teacherSubject: accountType === "TEACHER" ? teacherSubject : undefined,
      schoolAddress:
        accountType === "TEACHER" && schoolAddress.trim()
          ? schoolAddress
          : undefined,
    };
  }

  function saveGrade() {
    if (accountType === "STUDENT") {
      if (isStudentGrade(gradeName)) saveSelectedGrade(gradeName);
    }
  }

  return {
    accountType,
    fieldsProps: {
      accountType,
      gradeId,
      name,
      schoolAddress,
      schoolName,
      teacherSubject,
      onAccountTypeChange,
      onGradeChange,
      onNameChange,
      onSchoolAddressChange,
      onSchoolNameChange,
      onTeacherSubjectChange,
    },
    getPayload,
    saveGrade,
  };
}

function isStudentGrade(value: string): value is StudentGrade {
  return ["SD", "SMP", "SMA", "SMK"].includes(value);
}
