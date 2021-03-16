const { ipcRenderer } = require("electron");

const grouproomalo1Form = document.querySelector("#grouproomalo1Form");
const group1 = document.querySelector("#group1");
const room1 = document.querySelector("#room1");
const grouproomalo1List1 = document.querySelector("#grouproomalo1List1");

let updateStatus = false;
let idGrouproomalo1ToUpdate = "";

function deleteGrouproomalo1(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-grouproomalo1", id);
  }
  return;
}

function editGrouproomalo1(id) {
  updateStatus = true;
  idGrouproomalo1ToUpdate = id;
  const grouproomalo1 = grouproomalo1s.find((grouproomalo1) => grouproomalo1._id === id);
  group1.value = grouproomalo1.group1;
  room1.value = grouproomalo1.room1;
}

function renderGrouproomalo1s(grouproomalo1s) {
  grouproomalo1List1.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Group</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Room</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(grouproomalo1s);
  grouproomalo1s.map((t) => {
    grouproomalo1List1.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.group1}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.room1}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editGrouproomalo1('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteGrouproomalo1('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}



let grouproomalo1s = [];

ipcRenderer.send("get-grouproomalo1s");

grouproomalo1Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const grouproomalo1 = {
    group1: group1.value,
    room1: room1.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-grouproomalo1", grouproomalo1);
  } else {
    ipcRenderer.send("update-grouproomalo1", { ...grouproomalo1, idGrouproomalo1ToUpdate });
  }

  grouproomalo1Form.reset();
});

ipcRenderer.on("new-grouproomalo1-created", (e, arg) => {
  console.log(arg);
  const grouproomalo1Saved = JSON.parse(arg);
  grouproomalo1s.push(grouproomalo1Saved);
  console.log(grouproomalo1s);
  renderGrouproomalo1s(grouproomalo1s);
  alert("Group Allocated Successfully");
  grouproomalo1Name.focus();
});

ipcRenderer.on("get-grouproomalo1s", (e, args) => {
  const receivedGrouproomalo1s = JSON.parse(args);
  grouproomalo1s = receivedGrouproomalo1s;
  renderGrouproomalo1s(grouproomalo1s);
});

ipcRenderer.on("delete-grouproomalo1-success", (e, args) => {
  const deletedGrouproomalo1 = JSON.parse(args);
  const newGrouproomalo1s = grouproomalo1s.filter((t) => {
    return t._id !== deletedGrouproomalo1._id;
  });
  grouproomalo1s = newGrouproomalo1s;
  renderGrouproomalo1s(grouproomalo1s);
});

ipcRenderer.on("update-grouproomalo1-success", (e, args) => {
  updateStatus = false;
  const updatedGrouproomalo1 = JSON.parse(args);
  grouproomalo1s = grouproomalo1s.map((t, i) => {
    if (t._id === updatedGrouproomalo1._id) {
      t.group1 = updatedGrouproomalo1.group1;
      t.room1 = updatedGrouproomalo1.room1;
    }
    return t;
  });
  renderGrouproomalo1s(grouproomalo1s);
});
