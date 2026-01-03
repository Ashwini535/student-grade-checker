let students = [];
let subjects = [];
let totalMarks = 0;
let facultyName = "";

document.getElementById("loginTime").innerText =
  "🕒 Login Time: " + new Date().toLocaleString();


function toggleTheme() {
  document.body.classList.toggle("dark");
}

document.getElementById("facultyForm").addEventListener("submit", e => {
  e.preventDefault();
  facultyName = faculty.value;
  subjects = subjectsInput = document.getElementById("subjects").value.split(",");
  totalMarks = Number(totalMarksInput = document.getElementById("totalMarks").value);
  alert("Faculty details saved");
});

document.getElementById("studentForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const marksArray = document.getElementById("marks").value.split(",").map(Number);

  const totalObtained = marksArray.reduce((a, b) => a + b, 0);
  const maxTotal = subjects.length * totalMarks;
  const percentage = (totalObtained / maxTotal) * 100;

  let grade =
    percentage >= 90 ? "A" :
    percentage >= 75 ? "B" :
    percentage >= 60 ? "C" :
    percentage >= 40 ? "D" : "Fail";

  students.push({ name, roll, percentage, grade });
  students.sort((a, b) => b.percentage - a.percentage);

  render();
  studentForm.reset();
});

function render() {
  const list = document.getElementById("studentList");
  list.innerHTML = "";

  let totalPercent = 0;
  let highest = 0;

  students.forEach((s, i) => {
    totalPercent += s.percentage;
    if (s.percentage > highest) highest = s.percentage;

    list.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${s.name}</td>
        <td>${s.roll}</td>
        <td>${s.percentage.toFixed(2)}%</td>
        <td>${s.grade}</td>
        <td>
          <div class="progress">
            <div class="progress-bar" style="width:${s.percentage}%"></div>
          </div>
        </td>
      </tr>`;
  });

  totalStudents.innerText = students.length;
  classAverage.innerText =
    students.length ? (totalPercent / students.length).toFixed(2) : 0;
  highestPercent.innerText = highest.toFixed(2);
}

downloadBtn.onclick = () => {
  let csv = "Name,Roll,Percentage,Grade\n";
  students.forEach(s => {
    csv += `${s.name},${s.roll},${s.percentage.toFixed(2)},${s.grade}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "student_grades.csv";
  a.click();
};
