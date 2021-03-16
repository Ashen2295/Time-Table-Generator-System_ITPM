const { ipcRenderer } = require("electron");

const workingHForm = document.querySelector("#workingHForm");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const workingHList = document.querySelector("#workingHList");

let updateStatus = false;
let idWorkingHToUpdate = "";

function deleteWorkingH(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-workingH", id);
  }
  return;
}

function editWorkingH(id) {
  updateStatus = true;
  idWorkingHToUpdate = id;
  const workingH = workingHs.find((workingH) => workingH._id === id);
  hours.value = workingH.hours;
  minutes.value = workingH.minitues;
}

function renderWorkingHs(workingHs) {
  workingHList.innerHTML = "";
  console.log(workingHs);
  workingHs.map((t) => {
    workingHList.innerHTML += `
        <table class="table table-dark">
            <thead>
            <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            </tr>
        </thead>
        <tbody>
        <tr>
          <td>${t.hours}</td>
          <td>${t.minitues}</td>
          <td><button class="btn btn-danger" onclick="deleteWorkingH('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editWorkingH('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
  });
}



let workingHs = [];

ipcRenderer.send("get-workingHs");

workingHsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const student = {
    hours: hours.value,
    minitues: minitues.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-workingH", workingH);
  } else {
    ipcRenderer.send("update-workingH", { ...workingH, idWorkingHToUpdate });
  }

  workingHForm.reset();
});

ipcRenderer.on("new-workingH-created", (e, arg) => {
  console.log(arg);
  const workingHSaved = JSON.parse(arg);
  workingHs.push(workingHSaved);
  console.log(workingHs);
  renderWorkingHs(workingHs);
  alert("Working Hour Created Successfully");
  hours.focus();
});

ipcRenderer.on("get-workingHs", (e, args) => {
  const receivedworkingHs = JSON.parse(args);
  workingHs = receivedworkingHs;
  renderWorkingHs(workingHs);
});

ipcRenderer.on("delete-workingH-success", (e, args) => {
  const deletedWorkingH = JSON.parse(args);
  const newWorkingHs = workingHs.filter((t) => {
    return t._id !== deletedWorkingH._id;
  });
  workingHs = newWorkingHs;
  renderWorkingHs(workingHs);
});

ipcRenderer.on("update-workingH-success", (e, args) => {
  updateStatus = false;
  const updatedWorkingH = JSON.parse(args);
  workingHs = workingHs.map((t, i) => {
    if (t._id === updatedWorkingH._id) {
      t.hours = updatedWorkingH.hours;
      t.minitues = updatedWorkingH.minitues;
    }
    return t;
  });
  renderWorkingHs(workingHs);
});
