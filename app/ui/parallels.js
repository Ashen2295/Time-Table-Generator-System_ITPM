const { ipcRenderer } = require("electron");

const parallelsForm = document.querySelector("#parallelsForm");
const description = document.querySelector("#description");
const session1 = document.querySelector("#session1");
const session2 = document.querySelector("#session2");
const session3 = document.querySelector("#session3");
const session4 = document.querySelector("#session4");
const session5 = document.querySelector("#session5");
const parallelsList = document.querySelector("#parallelsList");

let updateStatus = false;
let idParallelsToUpdate = "";

function deleteParallels(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-parallels", id);
  }
  return;
}

function editParallels(id) {
  updateStatus = true;
  idParallelsToUpdate = id;
  const parallels = parallelss.find((parallels) => parallels._id === id);
  description.value = parallels.description;
  session1.value = parallels.session_1;
  session2.value = parallels.session_2;
  session3.value = parallels.session_3;
  session4.value = parallels.session_4;
  session5.value = parallels.session_5;
}

function renderParallelss(parallelss) {
  parallelsList.innerHTML = "";
  console.log(parallelss);
  parallelss.map((t) => {
    parallelsList.innerHTML += `
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
          <td><button class="btn btn-danger" onclick="deleteParallels('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editParallels('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
  });
}



let parallelss = [];

ipcRenderer.send("get-parallelss");

parallelsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const parallels = {
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
    ipcRenderer.send("new-parallels", parallels);
  } else {
    ipcRenderer.send("update-parallels", { ...parallels, idParallelsToUpdate });
  }

  parallelsForm.reset();
});

ipcRenderer.on("new-parallels-created", (e, arg) => {
  console.log(arg);
  const parallelsSaved = JSON.parse(arg);
  parallelss.push(parallelsSaved);
  console.log(parallelss);
  renderParallelss(parallelss);
  alert("Parallel Session Added Successfully");
  parallelsName.focus();
});

ipcRenderer.on("get-parallelss", (e, args) => {
  const receivedParallelss = JSON.parse(args);
  parallelss = receivedParallelss;
  renderParallelss(parallelss);
});

ipcRenderer.on("delete-parallels-success", (e, args) => {
  const deletedParallels = JSON.parse(args);
  const newParallelss = parallelss.filter((t) => {
    return t._id !== deletedParallels._id;
  });
  parallelss = newParallelss;
  renderParallelss(parallelss);
});

ipcRenderer.on("update-parallels-success", (e, args) => {
  updateStatus = false;
  const updatedParallels = JSON.parse(args);
  parallelss = parallelss.map((t, i) => {
    if (t._id === updatedParallels._id) {
      t.description = updatedParallels.description;
      t.session_1 = updatedParallels.session_1;
      t.session_2 = updatedParallels.session_2;
      t.session_3 = updatedParallels.session_3;
      t.session_4 = updatedParallels.session_4;
      t.session_5 = updatedParallels.session_5;
    }
    return t;
  });
  renderParallelss(parallelss);
});
