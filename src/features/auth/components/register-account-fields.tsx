import { AuthField } from "./auth-field";
import { GradeSelect } from "./grade-select";

export type RegisterAccountType = "STUDENT" | "TEACHER";

type RegisterAccountFieldsProps = {
  accountType: RegisterAccountType;
  gradeId: string;
  name: string;
  schoolAddress: string;
  schoolName: string;
  teacherSubject: string;
  variant?: "plain" | "modal";
  onAccountTypeChange: (value: RegisterAccountType) => void;
  onGradeChange: (id: string, name: string) => void;
  onNameChange: (value: string) => void;
  onSchoolAddressChange: (value: string) => void;
  onSchoolNameChange: (value: string) => void;
  onTeacherSubjectChange: (value: string) => void;
};

export function RegisterAccountFields(props: RegisterAccountFieldsProps) {
  return (
    <>
      <AuthField
        label="Nama"
        placeholder="Contoh: mas dondon"
        value={props.name}
        onChange={props.onNameChange}
      />
      <AccountTypeTabs {...props} />
      {props.accountType === "STUDENT" ? (
        <GradeSelect value={props.gradeId} onChange={props.onGradeChange} />
      ) : (
        <TeacherFields {...props} />
      )}
    </>
  );
}

function AccountTypeTabs({
  accountType,
  onAccountTypeChange,
  variant = "plain",
}: RegisterAccountFieldsProps) {
  const modal = variant === "modal";
  return (
    <div className="grid gap-2">
      <span className="text-sm font-bold text-foreground">Daftar sebagai</span>
      <div className={modal ? modalTabsClass : plainTabsClass}>
        {(["STUDENT", "TEACHER"] as const).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onAccountTypeChange(type)}
            className={getTabClass(accountType === type, modal)}
          >
            {type === "STUDENT" ? "Siswa" : "Guru"}
          </button>
        ))}
      </div>
    </div>
  );
}

function TeacherFields({
  onSchoolAddressChange,
  onSchoolNameChange,
  onTeacherSubjectChange,
  schoolAddress,
  schoolName,
  teacherSubject,
}: RegisterAccountFieldsProps) {
  return (
    <>
      <AuthField
        label="Nama Sekolah"
        placeholder="Contoh: SMP Negeri 1 Yogyakarta"
        value={schoolName}
        onChange={onSchoolNameChange}
      />
      <AuthField
        label="Guru Mata Pelajaran"
        placeholder="Contoh: Matematika"
        value={teacherSubject}
        onChange={onTeacherSubjectChange}
      />
      <AuthField
        label="Alamat Sekolah (Opsional)"
        placeholder="Contoh: Jl. Pendidikan No. 10"
        value={schoolAddress}
        onChange={onSchoolAddressChange}
      />
    </>
  );
}

function getTabClass(active: boolean, modal: boolean) {
  if (modal && active) {
    return "rounded-lg bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300 px-4 py-2.5 text-sm font-black text-slate-800 shadow-md shadow-violet-100";
  }
  if (modal) {
    return "rounded-lg bg-white px-4 py-2.5 text-sm font-black text-slate-500 transition hover:bg-violet-100";
  }
  return `flex-1 rounded-md py-2 text-sm font-semibold transition ${
    active ? "bg-primary text-white" : "bg-background text-muted"
  }`;
}

const modalTabsClass =
  "grid grid-cols-2 gap-2 rounded-2xl border border-violet-100 bg-violet-50 p-1";
const plainTabsClass = "flex gap-2";
