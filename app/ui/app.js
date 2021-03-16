const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskNote = document.querySelector("#taskNote");
const taskList = document.querySelector("#taskList");

let updateStatus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-task", id);
  }
  return;
}

function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find((task) => task._id === id);
  taskName.value = task.name;
  taskDescription.value = task.description;
  taskNote.value = task.note;
}

function renderTasks(tasks) {
  taskList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Name</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Block</th>
          <th style="width:160px; display:inline-block; overflow:hidden">Note</th>
          <th style="width:200px; display:inline-block; overflow:hidden"></th>
          </tr>
        </thead>
        </table>
  `;
  console.log(tasks);
  tasks.map((t) => {
    taskList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.name}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.description}</td>
        <td style="width:160px; display:inline-block; overflow:hidden">${t.note}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editTask('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteTask('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let tasks = [];

ipcRenderer.send("get-tasks");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    name: taskName.value,
    description: taskDescription.value,
    note: taskNote.value,
  };

  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");
  var z = document.getElementById("myDIV3");

  if(taskName.value == '') {

    x.style.display = "block";
  }

  else if (taskDescription.value == '') {

    y.style.display = "block";
  }

  else if (taskNote.value == '') {

    z.style.display = "block";
  }
  else {

    console.log("updateStatus");
    console.log(updateStatus);

    if (!updateStatus) {
        ipcRenderer.send("new-task", task);
    } else {
        ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
    }

    taskForm.reset();
    x.style.display = "none";

    y.style.display = "none";

    z.style.display = "none";
}
});

ipcRenderer.on("new-task-created", (e, arg) => {
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);
  console.log(tasks);
  renderTasks(tasks);
  alert("Building Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  const newTasks = tasks.filter((t) => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStatus = false;
  const updatedTask = JSON.parse(args);
  tasks = tasks.map((t, i) => {
    if (t._id === updatedTask._id) {
      t.name = updatedTask.name;
      t.description = updatedTask.description;
      t.note = updatedTask.note;
    }
    return t;
  });
  renderTasks(tasks);
});
