const { ipcRenderer } = require("electron");

const lecroomaloForm = document.querySelector("#lecroomaloForm");
const lecturer = document.querySelector("#lecturer");
const room = document.querySelector("#room");
const lecroomaloList = document.querySelector("#lecroomaloList");

let updateStatus = false;
let idLecroomaloToUpdate = "";

function deleteLecroomalo(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-lecroomalo", id);
  }
  return;
}

function editLecroomalo(id) {
  updateStatus = true;
  idLecroomaloToUpdate = id;
  const lecroomalo = lecroomalos.find((lecroomalo) => lecroomalo._id === id);
  lecturer.value = lecroomalo.lecturer;
  room.value = lecroomalo.room;
}

function renderLecroomalos(lecroomalos) {
  lecroomaloList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Name</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Room</th>

          </tr>
        </thead>
        </table>
  `;
  console.log(lecroomalos);
  lecroomalos.map((t) => {
    lecroomaloList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.room}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.lecturer}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editLecroomalo('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteLecroomalo('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}



let lecroomalos = [];

ipcRenderer.send("get-lecroomalos");

lecroomaloForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const lecroomalo = {
    lecturer: lecturer.value,
    room: room.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-lecroomalo", lecroomalo);
  } else {
    ipcRenderer.send("update-lecroomalo", { ...lecroomalo, idLecroomaloToUpdate });
  }

  lecroomaloForm.reset();
});

ipcRenderer.on("new-lecroomalo-created", (e, arg) => {
  console.log(arg);
  const lecroomaloSaved = JSON.parse(arg);
  lecroomalos.push(lecroomaloSaved);
  console.log(lecroomalos);
  renderLecroomalos(lecroomalos);
  alert("Lecture Room Allocated Successfully");
  lecroomaloName.focus();
});

ipcRenderer.on("get-lecroomalos", (e, args) => {
  const receivedLecroomalos = JSON.parse(args);
  lecroomalos = receivedLecroomalos;
  renderLecroomalos(lecroomalos);
});

ipcRenderer.on("delete-lecroomalo-success", (e, args) => {
  const deletedLecroomalo = JSON.parse(args);
  const newLecroomalos = lecroomalos.filter((t) => {
    return t._id !== deletedLecroomalo._id;
  });
  lecroomalos = newLecroomalos;
  renderLecroomalos(lecroomalos);
});

ipcRenderer.on("update-lecroomalo-success", (e, args) => {
  updateStatus = false;
  const updatedLecroomalo = JSON.parse(args);
  lecroomalos = lecroomalos.map((t, i) => {
    if (t._id === updatedLecroomalo._id) {
      t.lecturer = updatedLecroomalo.lecturer;
      t.room = updatedLecroomalo.room;
    }
    return t;
  });
  renderLecroomalos(lecroomalos);
});
