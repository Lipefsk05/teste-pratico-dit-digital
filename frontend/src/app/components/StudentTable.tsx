import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
} from "@mui/material";

type StudentWithAverage = {
  id: number;
  name: string;
  grades: number[];
  attendance: number;
  average: number;
};

type StudentTableProps = {
  students: StudentWithAverage[];
  onRemoveStudent: (id: number) => void;
  onClearStudents: () => void;
};

export default function StudentTable({
  students,
  onRemoveStudent,
  onClearStudents,
}: StudentTableProps) {
  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Alunos cadastrados
        </Typography>

        {students.length > 0 && (
          <Button color="error" variant="outlined" onClick={onClearStudents}>
            Limpar lista
          </Button>
        )}
      </Box>

      {students.length === 0 ? (
        <Typography color="text.secondary">
          Nenhum aluno cadastrado ainda.
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Disciplina 1</strong></TableCell>
                <TableCell><strong>Disciplina 2</strong></TableCell>
                <TableCell><strong>Disciplina 3</strong></TableCell>
                <TableCell><strong>Disciplina 4</strong></TableCell>
                <TableCell><strong>Disciplina 5</strong></TableCell>
                <TableCell><strong>Média</strong></TableCell>
                <TableCell><strong>Frequência</strong></TableCell>
                <TableCell><strong>Ações</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.grades[0]}</TableCell>
                  <TableCell>{student.grades[1]}</TableCell>
                  <TableCell>{student.grades[2]}</TableCell>
                  <TableCell>{student.grades[3]}</TableCell>
                  <TableCell>{student.grades[4]}</TableCell>
                  <TableCell>{student.average.toFixed(2)}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      variant="text"
                      onClick={() => onRemoveStudent(student.id)}
                    >
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}