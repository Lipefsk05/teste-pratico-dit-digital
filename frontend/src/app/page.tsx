"use client";

import { useState } from "react"
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';


export default function Home() {

  const [name, setName] = useState("")
  const [grade1, setGrade1] = useState("")
  const [grade2, setGrade2] = useState("")
  const [grade3, setGrade3] = useState("")
  const [grade4, setGrade4] = useState("")
  const [grade5, setGrade5] = useState("")
  const [attendance, setAttendance] = useState("")
  const [students, setStudents] = useState([])

  function handleAddStudent() {

    const newStudent = {
      name: name,
      grades: [
        Number(grade1),
        Number(grade2),
        Number(grade3),
        Number(grade4),
        Number(grade5)
      ],
      attendance: attendance
    }

    setStudents([...students, newStudent])

    setName("");
    setGrade1("");
    setGrade2("");
    setGrade3("");
    setGrade4("");
    setGrade5("");
    setAttendance("");
  }

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
        <Typography variant="h6" sx={{ mb: 1 }}>
          Cadastrar aluno
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Nome do aluno"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <TextField
            label="Nota da diciplina 1"
            variant="outlined"
            fullWidth
            value={grade1}
            onChange={(event) => setGrade1(event.target.value)}
          />

          <TextField
            label="Nota da diciplina 2"
            variant="outlined"
            fullWidth
            value={grade2}
            onChange={(event) => setGrade2(event.target.value)}
          />

          <TextField
            label="Nota da diciplina 3"
            variant="outlined"
            fullWidth
            value={grade3}
            onChange={(event) => setGrade3(event.target.value)}
          />

          <TextField
            label="Nota da diciplina 4"
            variant="outlined"
            fullWidth
            value={grade4}
            onChange={(event) => setGrade4(event.target.value)}
          />

          <TextField
            label="Nota da diciplina 5"
            variant="outlined"
            fullWidth
            value={grade5}
            onChange={(event) => setGrade5(event.target.value)}
          />

          <TextField
            label="Frequência (%)"
            type="number"
            fullWidth
            value={attendance}
            onChange={(event) => setAttendance(event.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleAddStudent}
          >
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

        <Typography variant="body1">
          Tabela virá aqui.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Resumo da turma
        </Typography>

        <Typography variant="body1">
          Resultados virão aqui.
        </Typography>
      </Paper>
    </Container>
  );
}