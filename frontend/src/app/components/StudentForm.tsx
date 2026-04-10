import { Paper, Typography, Box, TextField, Button } from "@mui/material";
import type { FormErrors } from "../page";

type StudentFormProps = {
  name: string;
  setName: (value: string) => void;
  grade1: string;
  setGrade1: (value: string) => void;
  grade2: string;
  setGrade2: (value: string) => void;
  grade3: string;
  setGrade3: (value: string) => void;
  grade4: string;
  setGrade4: (value: string) => void;
  grade5: string;
  setGrade5: (value: string) => void;
  attendance: string;
  setAttendance: (value: string) => void;
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  onAddStudent: () => void;
  studentsCount: number;
  isFormIncomplete: boolean;
};

export default function StudentForm({
  name,
  setName,
  grade1,
  setGrade1,
  grade2,
  setGrade2,
  grade3,
  setGrade3,
  grade4,
  setGrade4,
  grade5,
  setGrade5,
  attendance,
  setAttendance,
  errors,
  setErrors,
  onAddStudent,
  studentsCount,
  isFormIncomplete,
}: StudentFormProps) {
  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Cadastrar aluno
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome do aluno"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (errors.name) {
              setErrors((prev) => ({ ...prev, name: "" }));
            }
          }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Nota da disciplina 1"
          type="number"
          variant="outlined"
          fullWidth
          value={grade1}
          onChange={(event) => {
            setGrade1(event.target.value);
            if (errors.grade1) {
              setErrors((prev) => ({ ...prev, grade1: "" }));
            }
          }}
          error={!!errors.grade1}
          helperText={errors.grade1}
        />

        <TextField
          label="Nota da disciplina 2"
          type="number"
          variant="outlined"
          fullWidth
          value={grade2}
          onChange={(event) => {
            setGrade2(event.target.value);
            if (errors.grade2) {
              setErrors((prev) => ({ ...prev, grade2: "" }));
            }
          }}
          error={!!errors.grade2}
          helperText={errors.grade2}
        />

        <TextField
          label="Nota da disciplina 3"
          type="number"
          variant="outlined"
          fullWidth
          value={grade3}
          onChange={(event) => {
            setGrade3(event.target.value);
            if (errors.grade3) {
              setErrors((prev) => ({ ...prev, grade3: "" }));
            }
          }}
          error={!!errors.grade3}
          helperText={errors.grade3}
        />

        <TextField
          label="Nota da disciplina 4"
          type="number"
          variant="outlined"
          fullWidth
          value={grade4}
          onChange={(event) => {
            setGrade4(event.target.value);
            if (errors.grade4) {
              setErrors((prev) => ({ ...prev, grade4: "" }));
            }
          }}
          error={!!errors.grade4}
          helperText={errors.grade4}
        />

        <TextField
          label="Nota da disciplina 5"
          type="number"
          variant="outlined"
          fullWidth
          value={grade5}
          onChange={(event) => {
            setGrade5(event.target.value);
            if (errors.grade5) {
              setErrors((prev) => ({ ...prev, grade5: "" }));
            }
          }}
          error={!!errors.grade5}
          helperText={errors.grade5}
        />

        <TextField
          label="Frequência (%)"
          type="number"
          variant="outlined"
          fullWidth
          value={attendance}
          onChange={(event) => {
            setAttendance(event.target.value);
            if (errors.attendance) {
              setErrors((prev) => ({ ...prev, attendance: "" }));
            }
          }}
          error={!!errors.attendance}
          helperText={errors.attendance}
        />

        <Button
          variant="contained"
          size="large"
          onClick={onAddStudent}
          disabled={isFormIncomplete}
        >
          Cadastrar aluno
        </Button>

        <Typography variant="body2" color="text.secondary">
          Quantidade de alunos cadastrados: {studentsCount}
        </Typography>
      </Box>
    </Paper>
  );
}