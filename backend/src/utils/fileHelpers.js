const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

async function readStudentsFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeStudentsFile(students) {
  await fs.writeFile(filePath, JSON.stringify(students, null, 2), "utf-8");
}

module.exports = {
  readStudentsFile,
  writeStudentsFile,
};