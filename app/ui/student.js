const { ipcRenderer } = require("electron");

const studentForm = document.querySelector("#studentForm");
const acedemicYear = document.querySelector("#acedemicYear");
const programme = document.querySelector("#programme");
const groupCount = document.querySelector("#groupCount");
const subGroupCount = document.querySelector("#subGroupCount");
const studentList = document.querySelector("#studentList");

let updateStatus = false;
let idStudentToUpdate = "";

function deleteStudent(id) {
  const response = confirm("Do you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-student", id);
  }
  return;
}

function editStudent(id) {
  updateStatus = true;
  idStudentToUpdate = id;
  const student = students.find((student) => student._id === id);
  acedemicYear.value = student.year;
  programme.value = student.programme;
  groupCount.value = student.group_count;
  subGroupCount.value = student.sub_group_count;
}

function renderStudents(students) {
  studentList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="min-height:80px;width:150px; display:inline-block; overflow:hidden">Year & Semester</th>
          <th style="min-height:80px;width:200px; display:inline-block; overflow:hidden">Degree Programme</th>
          <th style="min-height:80px;width:100px; display:inline-block; overflow:hidden">Group Count</th>
          <th style="min-height:80px;width:150px; display:inline-block; overflow:hidden">Sub-Group   Count</th>
          <th style="min-height:80px;width:50px; display:inline-block; overflow:hidden"></th>
          </tr>
        </thead>
        </table>
  `;
  console.log(students);
  students.map((t) => {
    studentList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr class="w-100">
        <td style="width:150px; display:inline-block; overflow:hidden">${t.year}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">${t.programme}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.group_count}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.sub_group_count}</td>
        <td style="width:200px; display:inline-block; overflow:hidden;text-align:right">
        <button class="btn btn-btn text-light font-weight-medium bg-success" onclick="editStudent('${t._id}')">
       Edit
    </button>
        <button class="btn btn-btn text-light font-weight-medium bg-danger" onclick="deleteStudent('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let students = [];

ipcRenderer.send("get-students");

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    year: acedemicYear.value,
    programme: programme.value,
    group_count: groupCount.value,
    sub_group_count: subGroupCount.value,
  };


  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");

  if(groupCount.value == '') {

    x.style.display = "block";
  }

  else if (subGroupCount.value == '') {

    y.style.display = "block";
  }

  else {
    console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-student", student);
  } else {
    ipcRenderer.send("update-student", { ...student, idStudentToUpdate });
  }

  studentForm.reset();

  x.style.display = "none";

    y.style.display = "none";
  }

});

ipcRenderer.on("new-student-created", (e, arg) => {
  console.log(arg);
  const studentSaved = JSON.parse(arg);
  students.push(studentSaved);
  console.log(students);
  renderStudents(students);
  alert("Record added successfully");
  studentName.focus();
});

ipcRenderer.on("get-students", (e, args) => {
  const receivedStudents = JSON.parse(args);
  students = receivedStudents;
  renderStudents(students);
});

ipcRenderer.on("delete-student-success", (e, args) => {
  const deletedStudent = JSON.parse(args);
  const newStudents = students.filter((t) => {
    return t._id !== deletedStudent._id;
  });
  students = newStudents;
  renderStudents(students);
});

ipcRenderer.on("update-student-success", (e, args) => {
  updateStatus = false;
  const updatedStudent = JSON.parse(args);
  students = students.map((t, i) => {
    if (t._id === updatedStudent._id) {
      t.year = updatedStudent.year;
      t.programme = updatedStudent.programme;
      t.group_count = updatedStudent.group_count;
      t.sub_group_count = updatedStudent.sub_group_count;
    }
    return t;
  });
  renderStudents(students);
});
