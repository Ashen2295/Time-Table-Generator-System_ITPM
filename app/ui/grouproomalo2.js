const { ipcRenderer } = require("electron");

const grouproomalo2Form = document.querySelector("#grouproomalo2Form");
const group2 = document.querySelector("#group2");
const room2 = document.querySelector("#room2");
const grouproomalo2List2 = document.querySelector("#grouproomalo2List2");

let updateStatus = false;
let idGrouproomalo2ToUpdate = "";

function deleteGrouproomalo2(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-grouproomalo2", id);
  }
  return;
}

function editGrouproomalo2(id) {
  updateStatus = true;
  idGrouproomalo2ToUpdate = id;
  const grouproomalo2 = grouproomalo2s.find((grouproomalo2) => grouproomalo2._id === id);
  group2.value = grouproomalo2.group2;
  room2.value = grouproomalo2.room2;
}

function renderGrouproomalo2s(grouproomalo2s) {
  grouproomalo2List2.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Tag</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Room</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(grouproomalo2s);
  grouproomalo2s.map((t) => {
    grouproomalo2List2.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.group2}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.room2}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editGrouproomalo2('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteGrouproomalo2('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}



let grouproomalo2s = [];

ipcRenderer.send("get-grouproomalo2s");

grouproomalo2Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const grouproomalo2 = {
    group2: group2.value,
    room2: room2.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-grouproomalo2", grouproomalo2);
  } else {
    ipcRenderer.send("update-grouproomalo2", { ...grouproomalo2, idGrouproomalo2ToUpdate });
  }

  grouproomalo2Form.reset();
});

ipcRenderer.on("new-grouproomalo2-created", (e, arg) => {
  console.log(arg);
  const grouproomalo2Saved = JSON.parse(arg);
  grouproomalo2s.push(grouproomalo2Saved);
  console.log(grouproomalo2s);
  renderGrouproomalo2s(grouproomalo2s);
  alert("Session Allocated Successfully");
  grouproomalo2Name.focus();
});

ipcRenderer.on("get-grouproomalo2s", (e, args) => {
  const receivedGrouproomalo2s = JSON.parse(args);
  grouproomalo2s = receivedGrouproomalo2s;
  renderGrouproomalo2s(grouproomalo2s);
});

ipcRenderer.on("delete-grouproomalo2-success", (e, args) => {
  const deletedGrouproomalo2 = JSON.parse(args);
  const newGrouproomalo2s = grouproomalo2s.filter((t) => {
    return t._id !== deletedGrouproomalo2._id;
  });
  grouproomalo2s = newGrouproomalo2s;
  renderGrouproomalo2s(grouproomalo2s);
});

ipcRenderer.on("update-grouproomalo2-success", (e, args) => {
  updateStatus = false;
  const updatedGrouproomalo2 = JSON.parse(args);
  grouproomalo2s = grouproomalo2s.map((t, i) => {
    if (t._id === updatedGrouproomalo2._id) {
      t.group2 = updatedGrouproomalo2.group2;
      t.room2 = updatedGrouproomalo2.room2;
    }
    return t;
  });
  renderGrouproomalo2s(grouproomalo2s);
});
