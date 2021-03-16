
const { ipcRenderer } = require("electron");

const lecturerForm = document.querySelector("#lecturerForm");
const lecName = document.querySelector("#lecName");
const lecId = document.querySelector("#lecId");
const faculty = document.querySelector("#faculty");
const department = document.querySelector("#department");
const center = document.querySelector("#center");
const building = document.querySelector("#building");
const category = document.querySelector("#category");
const lecturerList = document.querySelector("#lecturerList");

let updateStatus = false;
let idLecturerToUpdate = "";

function deleteLecturer(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-lecturer", id);
  }
  return;
}

function editLecturer(id) {
  updateStatus = true;
  idLecturerToUpdate = id;
  const lecturer = lecturers.find((lecturer) => lecturer._id === id);
  lecName.value = lecturer.lecName;
  lecId.value = lecturer.lecId;
  faculty.value = lecturer.faculty;
  department.value = lecturer.department;
  center.value = lecturer.center;
  building.value = lecturer.building;
  category.value = lecturer.category;
}

function renderLecturers(lecturers) {
  lecturerList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">LecName</th>
          <th style="width:100px; display:inline-block; overflow:hidden">dept</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Building</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(lecturers);
  lecturers.map((t) => {
    lecturerList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.lecName}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.department}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.building}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editLecturer('${t._id}')">
       Edit
    </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteLecturer('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}


let lecturers = [];

ipcRenderer.send("get-lecturers");

lecturerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const lecturer = {
    lecName: lecName.value,
    lecId: lecId.value,
    faculty: faculty.value,
    department: department.value,
    center: center.value,
    building: building.value,
    category: category.value,

  };

  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");

  if(lecName.value == '') {

    x.style.display = "block";
  }

  else if (lecId.value == '') {

    y.style.display = "block";
  }
  else {
    console.log("updateStatus");
    console.log(updateStatus);

    if (!updateStatus) {
      ipcRenderer.send("new-lecturer", lecturer);
    } else {
      ipcRenderer.send("update-lecturer", { ...lecturer, idLecturerToUpdate });
    }
    lecturerForm.reset();

    x.style.display = "none";

    y.style.display = "none";
  }

});

ipcRenderer.on("new-lecturer-created", (e, arg) => {
  console.log(arg);
  const lecturerSaved = JSON.parse(arg);
  lecturers.push(lecturerSaved);
  console.log(lecturers);
  renderLecturers(lecturers);
  alert("Lecturer Created Successfully");
  lecName.focus();
});

ipcRenderer.on("get-lecturers", (e, args) => {
  const receivedLecturers = JSON.parse(args);
  lecturers = receivedLecturers;
  renderLecturers(lecturers);
});

ipcRenderer.on("delete-lecturer-success", (e, args) => {
  const deletedLecturer = JSON.parse(args);
  const newLecturers = lecturers.filter((t) => {
    return t._id !== deletedLecturer._id;
  });
  lecturers = newLecturers;
  renderLecturers(lecturers);
});

ipcRenderer.on("update-lecturer-success", (e, args) => {
  updateStatus = false;
  const updatedLecturers = JSON.parse(args);
  lecturers = lecturers.map((t, i) => {
    if (t._id === updatedLecturers._id) {
      t.lecName = updatedLecturer.lecName;
      t.lecId = updatedLecturer.lecId;
      t.faculty = updatedLecturer.faculty;
      t.department = updatedLecturer.department;
      t.center = updatedLecturer.center;
      t.building = updatedLecturer.building;
      t.category = updatedLecturer.category;
       }
    return t;
  });
  renderLecturers(lecturers);
});

      t.lecName = updatedLecturer.lecName;
      t.lecId = updatedLecturer.lecId;
      t.faculty = updatedLecturer.faculty;
      t.department = updatedLecturer.department;
      t.center = updatedLecturer.center;
      t.building = updatedLecturer.building;
      t.category = updatedLecturer.category;
