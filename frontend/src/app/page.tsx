"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import ClassSummary from "./components/ClassSummary";

export type Student = {
  id: number;
  name: string;
  grades: number[];
  attendance: number;
};

export type FormErrors = {
  name: string;
  grade1: string;
  grade2: string;
  grade3: string;
  grade4: string;
  grade5: string;
  attendance: string;
};

export default function Home() {
  const API_URL = "http://localhost:3001/students";

  const [name, setName] = useState("");
  const [grade1, setGrade1] = useState("");
  const [grade2, setGrade2] = useState("");
  const [grade3, setGrade3] = useState("");
  const [grade4, setGrade4] = useState("");
  const [grade5, setGrade5] = useState("");
  const [attendance, setAttendance] = useState("");

  const [students, setStudents] = useState<Student[]>([]);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    grade1: "",
    grade2: "",
    grade3: "",
    grade4: "",
    grade5: "",
    attendance: "",
  });

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    }

    fetchStudents();
  }, []);

  async function handleAddStudent() {
    const newErrors: FormErrors = {
      name: "",
      grade1: "",
      grade2: "",
      grade3: "",
      grade4: "",
      grade5: "",
      attendance: "",
    };

    if (name.trim() === "") {
      newErrors.name = "Nome obrigatório";
    }

    if (grade1 === "" || Number(grade1) < 0 || Number(grade1) > 10) {
      newErrors.grade1 = "Nota deve ser entre 0 e 10";
    }

    if (grade2 === "" || Number(grade2) < 0 || Number(grade2) > 10) {
      newErrors.grade2 = "Nota deve ser entre 0 e 10";
    }

    if (grade3 === "" || Number(grade3) < 0 || Number(grade3) > 10) {
      newErrors.grade3 = "Nota deve ser entre 0 e 10";
    }

    if (grade4 === "" || Number(grade4) < 0 || Number(grade4) > 10) {
      newErrors.grade4 = "Nota deve ser entre 0 e 10";
    }

    if (grade5 === "" || Number(grade5) < 0 || Number(grade5) > 10) {
      newErrors.grade5 = "Nota deve ser entre 0 e 10";
    }

    if (attendance === "" || Number(attendance) < 0 || Number(attendance) > 100) {
      newErrors.attendance = "Frequência deve ser entre 0 e 100";
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error !== "");
    if (hasError) return;

    const newStudent = {
      name: name.trim(),
      grades: [
        Number(grade1),
        Number(grade2),
        Number(grade3),
        Number(grade4),
        Number(grade5),
      ],
      attendance: Number(attendance),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar aluno.");
      }

      const createdStudent = await response.json();

      setStudents((prevStudents) => [...prevStudents, createdStudent]);

      setName("");
      setGrade1("");
      setGrade2("");
      setGrade3("");
      setGrade4("");
      setGrade5("");
      setAttendance("");

      setErrors({
        name: "",
        grade1: "",
        grade2: "",
        grade3: "",
        grade4: "",
        grade5: "",
        attendance: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  }

  async function handleRemoveStudent(id: number) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao remover aluno.");
      }

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
    }
  }

  async function handleClearStudents() {
    try {
      await Promise.all(
        students.map((student) =>
          fetch(`${API_URL}/${student.id}`, {
            method: "DELETE",
          })
        )
      );

      setStudents([]);
    } catch (error) {
      console.error("Erro ao limpar lista:", error);
    }
  }

  const isFormIncomplete =
    name.trim() === "" ||
    grade1 === "" ||
    grade2 === "" ||
    grade3 === "" ||
    grade4 === "" ||
    grade5 === "" ||
    attendance === "";

  const studentsWithAverage = students.map((student) => {
    const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / student.grades.length;

    return {
      ...student,
      average,
    };
  });

  const classAverage =
    studentsWithAverage.length > 0
      ? studentsWithAverage.reduce((acc, student) => acc + student.average, 0) /
        studentsWithAverage.length
      : 0;

  const subjectAverages =
    students.length > 0
      ? [0, 1, 2, 3, 4].map((subjectIndex) => {
          const subjectSum = students.reduce(
            (acc, student) => acc + student.grades[subjectIndex],
            0
          );
          return subjectSum / students.length;
        })
      : [];

  const studentsAboveClassAverage = studentsWithAverage.filter(
    (student) => student.average > classAverage
  );

  const studentsBelowAttendance = students.filter(
    (student) => student.attendance < 75
  );

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          Sistema de Notas e Frequência
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Cadastre os alunos, acompanhe as médias e identifique rapidamente quem
          precisa de atenção.
        </Typography>
      </Box>

      <StudentForm
        name={name}
        setName={setName}
        grade1={grade1}
        setGrade1={setGrade1}
        grade2={grade2}
        setGrade2={setGrade2}
        grade3={grade3}
        setGrade3={setGrade3}
        grade4={grade4}
        setGrade4={setGrade4}
        grade5={grade5}
        setGrade5={setGrade5}
        attendance={attendance}
        setAttendance={setAttendance}
        errors={errors}
        setErrors={setErrors}
        onAddStudent={handleAddStudent}
        studentsCount={students.length}
        isFormIncomplete={isFormIncomplete}
      />

      <StudentTable
        students={studentsWithAverage}
        onRemoveStudent={handleRemoveStudent}
        onClearStudents={handleClearStudents}
      />

      <ClassSummary
        students={students}
        classAverage={classAverage}
        subjectAverages={subjectAverages}
        studentsAboveClassAverage={studentsAboveClassAverage}
        studentsBelowAttendance={studentsBelowAttendance}
      />
    </Container>
  );
}