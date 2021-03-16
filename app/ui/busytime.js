const { ipcRenderer } = require("electron");

const busytimeForm = document.querySelector("#busytimeForm");
const room = document.querySelector("#room");
const date = document.querySelector("#date");
const startingTime = document.querySelector("#startingTime");
const endingTime = document.querySelector("#endingTime");
const busytimeList = document.querySelector("#busytimeList");

let updateStatus = false;
let idBusytimeToUpdate = "";

function deleteBusytime(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-busytime", id);
  }
  return;
}

function editBusytime(id) {
  updateStatus = true;
  idBusytimeToUpdate = id;
  const busytime = busytimes.find((busytime) => busytime._id === id);
  room.value = busytime.room;
  date.value = busytime.date;
  startingTime.value = busytime.starting_time;
  endingTime.value = busytime.ending_time;
}

function renderBusytimes(busytimes) {
  busytimeList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:70px; display:inline-block; overflow:hidden">Room</th>
          <th style="width:80px; display:inline-block; overflow:hidden">Date</th>
          <th style="width:110px; display:inline-block; overflow:hidden">STime</th>
          <th style="width:150px; display:inline-block; overflow:hidden">ETime</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(busytimes);
  busytimes.map((t) => {
    busytimeList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:70px; display:inline-block; overflow:hidden">${t.room}</td>
        <td style="width:80px; display:inline-block; overflow:hidden">${t.date}</td>
        <td style="width:110px; display:inline-block; overflow:hidden">${t.starting_time}</td>
        <td style="width:110px; display:inline-block; overflow:hidden">${t.ending_time}</td>
        <td style="width:300px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editBusytime('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteBusytime('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let busytimes = [];

ipcRenderer.send("get-busytimes");

busytimeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const busytime = {
    room: room.value,
    date: date.value,
    starting_time: startingTime.value,
    ending_time: endingTime.value,
  };


  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");

  var z = document.getElementById("myDIV3");

  if(date.value == '') {

    x.style.display = "block";
  }

  else if (startingTime.value == '') {

    y.style.display = "block";
  }

  else if (endingTime.value == '') {

    z.style.display = "block";
  }
  else {

  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-busytime", busytime);
  } else {
    ipcRenderer.send("update-busytime", { ...busytime, idBusytimeToUpdate });
  }

  busytimeForm.reset();


  x.style.display = "none";

  y.style.display = "none";

  z.style.display = "none";

  }
});

ipcRenderer.on("new-busytime-created", (e, arg) => {
  console.log(arg);
  const busytimeSaved = JSON.parse(arg);
  busytimes.push(busytimeSaved);
  console.log(busytimes);
  renderBusytimes(busytimes);
  alert("Busytime Created Successfully");
  busytimeName.focus();
});

ipcRenderer.on("get-busytimes", (e, args) => {
  const receivedBusytimes = JSON.parse(args);
  busytimes = receivedBusytimes;
  renderBusytimes(busytimes);
});

ipcRenderer.on("delete-busytime-success", (e, args) => {
  const deletedBusytime = JSON.parse(args);
  const newBusytimes = busytimes.filter((t) => {
    return t._id !== deletedBusytime._id;
  });
  busytimes = newBusytimes;
  renderBusytimes(busytimes);
});

ipcRenderer.on("update-busytime-success", (e, args) => {
  updateStatus = false;
  const updatedBusytime = JSON.parse(args);
  busytimes = busytimes.map((t, i) => {
    if (t._id === updatedBusytime._id) {
      t.name = updatedBusytime.room;
      t.description = updatedBusytime.date;
      t.starting_time = updatedBusytime.starting_time;
      t.ending_time = updatedBusytime.ending_time;
    }
    return t;
  });
  renderBusytimes(busytimes);
});
