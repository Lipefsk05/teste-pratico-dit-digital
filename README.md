# Sistema de Notas e Frequência

## Descrição

Este projeto foi desenvolvido como solução para um teste técnico de estágio em desenvolvimento.

A aplicação permite cadastrar alunos com suas notas em cinco disciplinas e sua frequência percentual, além de calcular automaticamente:

- média individual de cada aluno
- média geral da turma
- média da turma em cada disciplina
- alunos com média acima da média da turma
- alunos com frequência abaixo de 75%

Os dados são persistidos em um backend utilizando Node.js e armazenados em um arquivo JSON.

---

## Tecnologias utilizadas

### Front-end
- Next.js
- React
- TypeScript
- Material UI

### Back-end
- Node.js
- Express
- CORS
- File System (persistência em JSON)

---

## Estrutura do projeto

```bash
projeto/
  backend/
    src/
      data/
        students.json
      routes/
        students.js
      utils/
        fileHelpers.js
      app.js
      server.js

  frontend/
    src/
      app/
        components/
          StudentForm.tsx
          StudentTable.tsx
          ClassSummary.tsx
        page.tsx
