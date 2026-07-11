"use client";

import { useState } from "react";
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
  const [grade, onGradeChange] = useState<StudentGrade>("SD");

  function getPayload(email: string, password: string): RegisterPayload {
    return {
      name,
      email,
      password,
      accountType,
      gradeId: accountType === "STUDENT" ? grade : undefined,
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
      saveSelectedGrade(grade);
    }
  }

  return {
    accountType,
    fieldsProps: {
      accountType,
      grade,
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
