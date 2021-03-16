const { ipcRenderer } = require("electron");

const roomForm = document.querySelector("#roomForm");
const building = document.querySelector("#building");
const roomName = document.querySelector("#room");
const roomCap = document.querySelector("#roomCap");
const roomTyp = document.querySelector("#roomTyp");
const roomList = document.querySelector("#roomList");

let updateStatus = false;
let idRoomToUpdate = "";

function deleteRoom(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-room", id);
  }
  return;
}

function editRoom(id) {
  updateStatus = true;
  idRoomToUpdate = id;
  const room = rooms.find((room) => room._id === id);
  building.value = room.buildingName;
  roomName.value = room.roomName;
  roomCap.value = room.categoty;
  roomTyp.value = room.type;
}

function renderRooms(rooms) {
  roomList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">B-Name</th>
          <th style="width:60px; display:inline-block; overflow:hidden">Room</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Capacity</th>
          <th style="width:220px; display:inline-block; overflow:hidden">Type</th>
          <th style="width:100px; display:inline-block; overflow:hidden"></th>

          </tr>
        </thead>
        </table>
  `;
  console.log(rooms);
  rooms.map((t) => {
    roomList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.buildingName}</td>
        <td style="width:60px; display:inline-block; overflow:hidden">${t.roomName}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.categoty}</td>
        <td style="width:150px; display:inline-block; overflow:hidden">${t.type}</td>
        <td style="width:160px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editRoom('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteRoom('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let rooms = [];

ipcRenderer.send("get-rooms");

roomForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const room = {
    buildingName: building.value,
    roomName: roomName.value,
    categoty: roomCap.value,
    type: roomTyp.value,
  };

  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");

  if(roomName.value == '') {

    x.style.display = "block";
  }

  else if (roomCap.value == '') {

    y.style.display = "block";
  }
  else {
    console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-room", room);
  } else {
    ipcRenderer.send("update-room", { ...room, idRoomToUpdate });
  }

  roomForm.reset();
  x.style.display = "none";

    y.style.display = "none";
  }
});

ipcRenderer.on("new-room-created", (e, arg) => {
  console.log(arg);
  const roomSaved = JSON.parse(arg);
  rooms.push(roomSaved);
  console.log(rooms);
  renderRooms(rooms);
  alert("Room Inserted Successfully");
  building.focus();
});

ipcRenderer.on("get-rooms", (e, args) => {
  const receivedRooms = JSON.parse(args);
  rooms = receivedRooms;
  renderRooms(rooms);
});

ipcRenderer.on("delete-room-success", (e, args) => {
  const deletedRoom = JSON.parse(args);
  const newRooms = rooms.filter((t) => {
    return t._id !== deletedRoom._id;
  });
  rooms = newRooms;
  renderRooms(rooms);
});

ipcRenderer.on("update-room-success", (e, args) => {
  updateStatus = false;
  const updatedRoom = JSON.parse(args);
  rooms = rooms.map((t, i) => {
    if (t._id === updatedRoom._id) {
      t.buildingName = updatedRoom.buildingName;
      t.roomName = updatedRoom.roomName;
      t.categoty = updatedRoom.categoty;
      t.type = updatedRoom.type;
    }
    return t;
  });
  renderRooms(rooms);
});
