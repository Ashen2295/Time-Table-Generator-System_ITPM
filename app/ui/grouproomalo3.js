const { ipcRenderer } = require("electron");

const grouproomalo3Form = document.querySelector("#grouproomalo3Form");
const group3 = document.querySelector("#group3");
const room3 = document.querySelector("#room3");
const grouproomalo3List3 = document.querySelector("#grouproomalo3List3");

let updateStatus = false;
let idGrouproomalo3ToUpdate = "";

function deleteGrouproomalo3(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-grouproomalo3", id);
  }
  return;
}

function editGrouproomalo3(id) {
  updateStatus = true;
  idGrouproomalo3ToUpdate = id;
  const grouproomalo3 = grouproomalo3s.find((grouproomalo3) => grouproomalo3._id === id);
  group3.value = grouproomalo3.group3;
  room3.value = grouproomalo3.room3;
}

function renderGrouproomalo3s(grouproomalo3s) {
  grouproomalo3List3.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Session</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Room</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(grouproomalo3s);
  grouproomalo3s.map((t) => {
    grouproomalo3List3.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.group3}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.room3}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editGrouproomalo3('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteGrouproomalo3('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}


let grouproomalo3s = [];

ipcRenderer.send("get-grouproomalo3s");

grouproomalo3Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const grouproomalo3 = {
    group3: group3.value,
    room3: room3.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-grouproomalo3", grouproomalo3);
  } else {
    ipcRenderer.send("update-grouproomalo3", { ...grouproomalo3, idGrouproomalo3ToUpdate });
  }

  grouproomalo3Form.reset();
});

ipcRenderer.on("new-grouproomalo3-created", (e, arg) => {
  console.log(arg);
  const grouproomalo3Saved = JSON.parse(arg);
  grouproomalo3s.push(grouproomalo3Saved);
  console.log(grouproomalo3s);
  renderGrouproomalo3s(grouproomalo3s);
  alert("Consecutive Created Successfully");
  grouproomalo3Name.focus();
});

ipcRenderer.on("get-grouproomalo3s", (e, args) => {
  const receivedGrouproomalo3s = JSON.parse(args);
  grouproomalo3s = receivedGrouproomalo3s;
  renderGrouproomalo3s(grouproomalo3s);
});

ipcRenderer.on("delete-grouproomalo3-success", (e, args) => {
  const deletedGrouproomalo3 = JSON.parse(args);
  const newGrouproomalo3s = grouproomalo3s.filter((t) => {
    return t._id !== deletedGrouproomalo3._id;
  });
  grouproomalo3s = newGrouproomalo3s;
  renderGrouproomalo3s(grouproomalo3s);
});

ipcRenderer.on("update-grouproomalo3-success", (e, args) => {
  updateStatus = false;
  const updatedGrouproomalo3 = JSON.parse(args);
  grouproomalo3s = grouproomalo3s.map((t, i) => {
    if (t._id === updatedGrouproomalo3._id) {
      t.group3 = updatedGrouproomalo3.group3;
      t.room3 = updatedGrouproomalo3.room3;
    }
    return t;
  });
  renderGrouproomalo3s(grouproomalo3s);
});
