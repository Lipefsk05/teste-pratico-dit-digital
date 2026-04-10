const express = require("express");
const { readStudentsFile, writeStudentsFile } = require("../utils/fileHelpers");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await readStudentsFile();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, grades, attendance } = req.body;

    if (
      !name ||
      !Array.isArray(grades) ||
      grades.length !== 5 ||
      attendance === undefined
    ) {
      return res.status(400).json({ message: "Dados inválidos." });
    }

    const hasInvalidGrade = grades.some(
      (grade) => typeof grade !== "number" || grade < 0 || grade > 10
    );

    const invalidAttendance =
      typeof attendance !== "number" || attendance < 0 || attendance > 100;

    if (hasInvalidGrade || invalidAttendance) {
      return res.status(400).json({
        message: "Notas devem estar entre 0 e 10 e frequência entre 0 e 100.",
      });
    }

    const students = await readStudentsFile();

    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      grades,
      attendance,
    };

    students.push(newStudent);
    await writeStudentsFile(students);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar aluno." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const students = await readStudentsFile();

    const filteredStudents = students.filter((student) => student.id !== id);

    if (filteredStudents.length === students.length) {
      return res.status(404).json({ message: "Aluno não encontrado." });
    }

    await writeStudentsFile(filteredStudents);

    res.json({ message: "Aluno removido com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover aluno." });
  }
});

module.exports = router;