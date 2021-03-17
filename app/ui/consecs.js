const { ipcRenderer } = require("electron");

const consecsForm = document.querySelector("#consecsForm");
const description = document.querySelector("#description");
const firstSession = document.querySelector("#firstSession");
const secondSession = document.querySelector("#secondSession");
const consecsList = document.querySelector("#consecsList");

let updateStatus = false;
let idConsecsToUpdate = "";

function deleteConsecs(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-consecs", id);
  }
  return;
}

function editConsecs(id) {
  updateStatus = true;
  idConsecsToUpdate = id;
  const consecs = consecss.find((consecs) => consecs._id === id);
  description.value = consecs.description;
  firstSession.value = consecs.first_session;
  secondSession.value = consecs.second_session;
}

function renderConsecss(consecss) {
  consecsList.innerHTML = "";
  console.log(consecss);
  consecss.map((t) => {
    consecsList.innerHTML += `
        <table class="table table-dark">
            <thead>
            <tr>
            <th scope="col">Description</th>
            <th scope="col">1Session</th>
            <th scope="col">2Session</th>
            </tr>
        </thead>
        <tbody>
        <tr>
          <td>${t.description}</td>
          <td>${t.first_session}</td>
          <td>${t.second_session}</td>
          <td><button class="btn btn-danger" onclick="deleteConsecs('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editConsecs('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
  });
}



let consecss = [];

ipcRenderer.send("get-consecss");

consecsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const consecs = {
    description: description.value,
    first_session: firstSession.value,
    second_session: secondSession.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-consecs", consecs);
  } else {
    ipcRenderer.send("update-consecs", { ...consecs, idConsecsToUpdate });
  }

  consecsForm.reset();
});

ipcRenderer.on("new-consecs-created", (e, arg) => {
  console.log(arg);
  const consecsSaved = JSON.parse(arg);
  consecss.push(consecsSaved);
  console.log(consecss);
  renderConsecss(consecss);
  alert("Consecutive Session Added Successfully");
  description.focus();
});

ipcRenderer.on("get-consecss", (e, args) => {
  const receivedConsecss = JSON.parse(args);
  consecss = receivedConsecss;
  renderConsecss(consecss);
});

ipcRenderer.on("delete-consecs-success", (e, args) => {
  const deletedConsecs = JSON.parse(args);
  const newConsecss = consecss.filter((t) => {
    return t._id !== deletedConsecs._id;
  });
  consecss = newConsecss;
  renderConsecss(consecss);
});

ipcRenderer.on("update-consecs-success", (e, args) => {
  updateStatus = false;
  const updatedConsecs = JSON.parse(args);
  consecss = consecss.map((t, i) => {
    if (t._id === updatedConsecs._id) {
      t.description = updatedConsecs.description;
      t.first_session = updatedConsecs.first_session;
      t.second_session = updatedConsecs.second_session;
    }
    return t;
  });
  renderConsecss(consecss);
});
