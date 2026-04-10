import { Paper, Typography, Box, Divider } from "@mui/material";
import type { Student } from "../page";

type StudentWithAverage = Student & {
  average: number;
};

type ClassSummaryProps = {
  students: Student[];
  classAverage: number;
  subjectAverages: number[];
  studentsAboveClassAverage: StudentWithAverage[];
  studentsBelowAttendance: Student[];
};

export default function ClassSummary({
  students,
  classAverage,
  subjectAverages,
  studentsAboveClassAverage,
  studentsBelowAttendance,
}: ClassSummaryProps) {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
        Resumo da turma
      </Typography>

      {students.length === 0 ? (
        <Typography color="text.secondary">
          Nenhum dado disponível ainda.
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Média geral da turma
            </Typography>
            <Typography variant="body1">{classAverage.toFixed(2)}</Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Média da turma por disciplina
            </Typography>

            {subjectAverages.map((average, index) => (
              <Typography key={index} variant="body2">
                Disciplina {index + 1}: {average.toFixed(2)}
              </Typography>
            ))}
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Alunos acima da média da turma
            </Typography>

            {studentsAboveClassAverage.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum aluno acima da média da turma.
              </Typography>
            ) : (
              studentsAboveClassAverage.map((student) => (
                <Typography key={student.id} variant="body2">
                  {student.name} - média {student.average.toFixed(2)}
                </Typography>
              ))
            )}
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Alunos com frequência abaixo de 75%
            </Typography>

            {studentsBelowAttendance.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Nenhum aluno com frequência abaixo de 75%.
              </Typography>
            ) : (
              studentsBelowAttendance.map((student) => (
                <Typography key={student.id} variant="body2">
                  {student.name} - {student.attendance}%
                </Typography>
              ))
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
}