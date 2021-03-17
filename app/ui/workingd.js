const { ipcRenderer } = require("electron");

const workingdForm = document.querySelector("#workingdForm");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const workingdList = document.querySelector("#workingdList");

let updateStatus = false;
let idWorkingdToUpdate = "";

function deleteWorkingd(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-workingd", id);
  }
  return;
}

function editWorkingd(id) {
  updateStatus = true;
  idWorkingdToUpdate = id;
  const workingd = workingds.find((workingd) => workingd._id === id);
  hour.value = workingd.hour;
  minute.value = workingd.minute;
}

function renderWorkingds(workingds) {
  workingdList.innerHTML = "";
  console.log(workingds);
  workingds.map((t) => {
    workingdList.innerHTML += `
        <table class="table table-dark">
            <thead>
            <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            </tr>
        </thead>
        <tbody>
        <tr>
          <td>${t.hour}</td>
          <td>${t.minute}</td>
          <td><button class="btn btn-danger" onclick="deleteWorkingd('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editWorkingd('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
  });
}



let workingds = [];

ipcRenderer.send("get-workingds");

workingdForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const workingd = {
    hour: hour.value,
    minute: minute.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-workingd", workingd);
  } else {
    ipcRenderer.send("update-workingd", { ...workingd, idWorkingdToUpdate });
  }

  workingdForm.reset();
});

ipcRenderer.on("new-workingd-created", (e, arg) => {
  console.log(arg);
  const workingdSaved = JSON.parse(arg);
  workingds.push(workingdSaved);
  console.log(workingds);
  renderWorkingds(workingds);
  alert("Workingd Created Successfully");
  hour.focus();
});

ipcRenderer.on("get-workingds", (e, args) => {
  const receivedWorkingds = JSON.parse(args);
  workingds = receivedWorkingds;
  renderWorkingds(workingds);
});

ipcRenderer.on("delete-workingd-success", (e, args) => {
  const deletedWorkingd = JSON.parse(args);
  const newWorkingds = workingds.filter((t) => {
    return t._id !== deletedWorkingd._id;
  });
  workingds = newWorkingds;
  renderWorkingds(workingds);
});

ipcRenderer.on("update-workingd-success", (e, args) => {
  updateStatus = false;
  const updatedWorkingd = JSON.parse(args);
  workingds = workingds.map((t, i) => {
    if (t._id === updatedWorkingd._id) {
      t.hour = updatedWorkingd.hour;
      t.minute = updatedWorkingd.minute;
    }
    return t;
  });
  renderWorkingds(workingds);
});
