const { ipcRenderer } = require("electron");

const notavgroForm = document.querySelector("#notavgroForm");
const group = document.querySelector("#group");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const notavgroList = document.querySelector("#notavgroList");

let updateStatus = false;
let idNotavgroToUpdate = "";

function deleteNotavgro(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-notavgro", id);
  }
  return;
}

function editNotavgro(id) {
  updateStatus = true;
  idNotavgroToUpdate = id;
  const notavgro = notavgros.find((notavgro) => notavgro._id === id);
  group.value = notavgro.group;
  startingHour.value = notavgro.starting_time_hour;
  endingHour.value = notavgro.ending_time_hour;
}

function renderNotavgros(notavgros) {
  notavgroList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Group</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>

          </tr>
        </thead>
        </table>
  `;
  console.log(notavgros);
  notavgros.map((t) => {
    notavgroList.innerHTML += `
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.group}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.starting_time_hour}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.ending_time_hour}</td>
              <td style="width:200px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editNotavgro('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteNotavgro('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let notavgros = [];

ipcRenderer.send("get-notavgros");

notavgroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const notavgro = {
    group: group.value,
    starting_time_hour: startingHour.value,
    ending_time_hour: endingHour.value,
  };


  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");

  if(startingHour.value == '') {

    x.style.display = "block";
  }

  else if (endingHour.value == '') {

    y.style.display = "block";
  }

  else {

  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-notavgro", notavgro);
  } else {
    ipcRenderer.send("update-notavgro", { ...notavgro, idNotavgroToUpdate });
  }

  notavgroForm.reset();

  x.style.display = "none";

  y.style.display = "none";

  }


});

ipcRenderer.on("new-notavgro-created", (e, arg) => {
  console.log(arg);
  const notavgroSaved = JSON.parse(arg);
  notavgros.push(notavgroSaved);
  console.log(notavgros);
  renderNotavgros(notavgros);
  alert("Not Available Time Added Successfully");
  notavgroName.focus();
});

ipcRenderer.on("get-notavgros", (e, args) => {
  const receivedNotavgros = JSON.parse(args);
  notavgros = receivedNotavgros;
  renderNotavgros(notavgros);
});

ipcRenderer.on("delete-notavgro-success", (e, args) => {
  const deletedNotavgro = JSON.parse(args);
  const newNotavgros = notavgros.filter((t) => {
    return t._id !== deletedNotavgro._id;
  });
  notavgros = newNotavgros;
  renderNotavgros(notavgros);
});

ipcRenderer.on("update-notavgro-success", (e, args) => {
  updateStatus = false;
  const updatedNotavgro = JSON.parse(args);
  notavgros = notavgros.map((t, i) => {
    if (t._id === updatedNotavgro._id) {
      t.group = updatedNotavgro.group;
      t.starting_time_hour = updatedNotavgro.starting_time_hour;
      t.ending_time_hour = updatedNotavgro.ending_time_hour;
    }
    return t;
  });
  renderNotavgros(notavgros);
});
