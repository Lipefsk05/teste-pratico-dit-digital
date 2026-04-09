"use client";

import { useState } from "react";
import { Container, Typography, Box, Paper, TextField, Button } from "@mui/material";

type Student = {
  name: string;
  grades: number[];
  attendance: number;
};

type FormErrors = {
  name: string;
  grade1: string;
  grade2: string;
  grade3: string;
  grade4: string;
  grade5: string;
  attendance: string;
};

export default function Home() {
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

  function handleAddStudent() {
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

    const newStudent: Student = {
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

    setStudents([...students, newStudent]);

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
  }

  const studentAverages = students.map((student) => {
    const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / student.grades.length;
  });

  const classAverage =
    studentAverages.length > 0
      ? studentAverages.reduce((acc, average) => acc + average, 0) / studentAverages.length
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

  const studentsAboveClassAverage = students.filter((student) => {
    const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
    const average = sum / student.grades.length;
    return average > classAverage;
  });

  const studentsBelowAttendance = students.filter(
    (student) => student.attendance < 75
  );


  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Sistema de Notas e Frequência
        </Typography>

        <Typography variant="body1">
          Cadastre os alunos, visualize as médias e acompanhe a frequência da turma.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Cadastrar aluno
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Nome do aluno"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Nota da disciplina 1"
            type="number"
            variant="outlined"
            fullWidth
            value={grade1}
            onChange={(event) => setGrade1(event.target.value)}
            error={!!errors.grade1}
            helperText={errors.grade1}
          />

          <TextField
            label="Nota da disciplina 2"
            type="number"
            variant="outlined"
            fullWidth
            value={grade2}
            onChange={(event) => setGrade2(event.target.value)}
            error={!!errors.grade2}
            helperText={errors.grade2}
          />

          <TextField
            label="Nota da disciplina 3"
            type="number"
            variant="outlined"
            fullWidth
            value={grade3}
            onChange={(event) => setGrade3(event.target.value)}
            error={!!errors.grade3}
            helperText={errors.grade3}
          />

          <TextField
            label="Nota da disciplina 4"
            type="number"
            variant="outlined"
            fullWidth
            value={grade4}
            onChange={(event) => setGrade4(event.target.value)}
            error={!!errors.grade4}
            helperText={errors.grade4}
          />

          <TextField
            label="Nota da disciplina 5"
            type="number"
            variant="outlined"
            fullWidth
            value={grade5}
            onChange={(event) => setGrade5(event.target.value)}
            error={!!errors.grade5}
            helperText={errors.grade5}
          />

          <TextField
            label="Frequência (%)"
            type="number"
            variant="outlined"
            fullWidth
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
            error={!!errors.attendance}
            helperText={errors.attendance}
          />

          <Button variant="contained" onClick={handleAddStudent}>
            Cadastrar aluno
          </Button>

          <Typography>
            Quantidade de alunos: {students.length}
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Alunos cadastrados
        </Typography>

        {students.length === 0 ? (
          <Typography>Nenhum aluno cadastrado ainda.</Typography>
        ) : (
          students.map((student, index) => {
            const sum = student.grades.reduce((acc, grade) => acc + grade, 0);
            const average = sum / student.grades.length;

            return (
              <Paper key={index} sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1">{student.name}</Typography>

                <Typography variant="body2">
                  Notas: {student.grades.join(", ")}
                </Typography>

                <Typography variant="body2">
                  Média: {average.toFixed(2)}
                </Typography>

                <Typography variant="body2">
                  Frequência: {student.attendance}%
                </Typography>
              </Paper>
            );
          })
        )}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Resumo da turma
        </Typography>

        {students.length === 0 ?
          (<Typography>Nenhum dado disponivel ainda.</Typography>)
          :
          (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" sx={{ mc: 1 }}>
                  Média geral da turma
                </Typography>
                <Typography>{classAverage.toFixed(2)}</Typography>
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variable="subtitle1" sx={{ mb: 1 }}>
                  media da turma por disciplina
                </Typography>

                {subjectAverages.map((average, index) => (
                  <Typography key={index}>
                    Disciplina {index + 1}: {average.toFixed(2)}
                  </Typography>
                ))}
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variable="subtitle1" sx={{ mb: 1 }}>
                  Alunos acima da média da turma
                </Typography>
                {studentsAboveClassAverage.length === 0 ?
                  (<Typography>Nenhum aluno acima da média da turma.</Typography>)
                  :
                  (
                    studentsAboveClassAverage.map((student, index) => (
                      <Typography key={index}>
                        {student.name}
                      </Typography>
                    ))
                  )}
              </Paper>

              <Paper sx={{ p: 2 }}>
                <Typography variable="subtitle1" sx={{ mb: 1 }}>
                  Alunos com frequência abaixo de 75%
                </Typography>

                {studentsBelowAttendance.length === 0 ?
                  (<Typography>Nenhum aluno com frequência abaixo de 75%</Typography>)
                  :
                  (
                    studentsBelowAttendance.map((student, index) =>
                    (
                      <Typography key={index}>
                        {student.name} - {student.attendance}%
                      </Typography>
                    ))
                  )}
              </Paper>

            </Box>
          )
        }
      </Paper>
    </Container>
  );
}