const { ipcRenderer } = require("electron");

const notovForm = document.querySelector("#notovForm");
const description = document.querySelector("#description");
const session1 = document.querySelector("#session1");
const session2 = document.querySelector("#session2");
const session3 = document.querySelector("#session3");
const session4 = document.querySelector("#session4");
const session5 = document.querySelector("#session5");
const notovList = document.querySelector("#notovList");

let updateStatus = false;
let idNotovToUpdate = "";

function deleteNotov(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-notov", id);
  }
  return;
}

function editNotov(id) {
  updateStatus = true;
  idNotovToUpdate = id;
  const notov = notovs.find((notov) => notov._id === id);
  description.value = notov.description;
  session1.value = notov.session_1;
  session2.value = notov.session_2;
  session3.value = notov.session_3;
  session4.value = notov.session_4;
  session5.value = notov.session_5;
}

function renderNotovs(notovs) {
  notovList.innerHTML = "";
  console.log(notovs);
  notovs.map((t) => {
    notovList.innerHTML += `
        <table class="table table-dark">
            <thead>
            <tr>
            <th scope="col">Description</th>
            <th scope="col">Sessions</th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>${t.description}</td>
        <td>
      ${t.session_1}
      ${t.session_2}
      ${t.session_3}
      ${t.session_4}
          ${t.session_5}</td>
          <td><button class="btn btn-danger" onclick="deleteNotov('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editNotov('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
  });
}



let notovs = [];

ipcRenderer.send("get-notovs");

notovForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const notov = {
    description: description.value,
    session_1: session1.value,
    session_2: session2.value,
    session_3: session3.value,
    session_4: session4.value,
    session_5: session5.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-notov", notov);
  } else {
    ipcRenderer.send("update-notov", { ...notov, idNotovToUpdate });
  }

  notovForm.reset();
});

ipcRenderer.on("new-notov-created", (e, arg) => {
  console.log(arg);
  const notovSaved = JSON.parse(arg);
  notovs.push(notovSaved);
  console.log(notovs);
  renderNotovs(notovs);
  alert("Not Overlap Sessions Added Successfully");
  notovName.focus();
});

ipcRenderer.on("get-notovs", (e, args) => {
  const receivedNotovs = JSON.parse(args);
  notovs = receivedNotovs;
  renderNotovs(notovs);
});

ipcRenderer.on("delete-notov-success", (e, args) => {
  const deletedNotov = JSON.parse(args);
  const newNotovs = notovs.filter((t) => {
    return t._id !== deletedNotov._id;
  });
  notovs = newNotovs;
  renderNotovs(notovs);
});

ipcRenderer.on("update-notov-success", (e, args) => {
  updateStatus = false;
  const updatedNotov = JSON.parse(args);
  notovs = notovs.map((t, i) => {
    if (t._id === updatedNotov._id) {
      t.description = updatedNotov.description;
      t.session_1 = updatedNotov.session_1;
      t.session_2 = updatedNotov.session_2;
      t.session_3 = updatedNotov.session_3;
      t.session_4 = updatedNotov.session_4;
      t.session_5 = updatedNotov.session_5;
    }
    return t;
  });
  renderNotovs(notovs);
});
