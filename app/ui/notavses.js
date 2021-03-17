const { ipcRenderer } = require("electron");

const notavsesForm = document.querySelector("#notavsesForm");
const session = document.querySelector("#session");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const notavsesList = document.querySelector("#notavsesList");


let updateStatus = false;
let idNotavsesToUpdate = "";

function deleteNotavses(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-notavses", id);
  }
  return;
}

function editNotavses(id) {
  updateStatus = true;
  idNotavsesToUpdate = id;
  const notavses = notavsess.find((notavses) => notavses._id === id);
  session.value = notavses.session;
  startingHour.value = notavses.starting_time_hour;
  endingHour.value = notavses.ending_time_hour;
}

function renderNotavsess(notavsess) {
  notavsesList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:200px; display:inline-block; overflow:hidden">Session</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(notavsess);
  notavsess.map((t) => {
    notavsesList.innerHTML += `
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:200px; display:inline-block; overflow:hidden">${t.session}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.starting_time_hour}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.ending_time_hour}</td>
              <td style="width:250px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editNotavses('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteNotavses('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let notavsess = [];

ipcRenderer.send("get-notavsess");

notavsesForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const notavses = {
    session: session.value,
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
    ipcRenderer.send("new-notavses", notavses);
  } else {
    ipcRenderer.send("update-notavses", { ...notavses, idNotavsesToUpdate });
  }

  notavsesForm.reset();
  x.style.display = "none";

  y.style.display = "none";

  }



});

ipcRenderer.on("new-notavses-created", (e, arg) => {
  console.log(arg);
  const notavsesSaved = JSON.parse(arg);
  notavsess.push(notavsesSaved);
  console.log(notavsess);
  renderNotavsess(notavsess);
  alert("Not Available Time Added Successfully");
  notavsesName.focus();
});

ipcRenderer.on("get-notavsess", (e, args) => {
  const receivedNotavsess = JSON.parse(args);
  notavsess = receivedNotavsess;
  renderNotavsess(notavsess);
});

ipcRenderer.on("delete-notavses-success", (e, args) => {
  const deletedNotavses = JSON.parse(args);
  const newNotavsess = notavsess.filter((t) => {
    return t._id !== deletedNotavses._id;
  });
  notavsess = newNotavsess;
  renderNotavsess(notavsess);
});

ipcRenderer.on("update-notavses-success", (e, args) => {
  updateStatus = false;
  const updatedNotavses = JSON.parse(args);
  notavsess = notavsess.map((t, i) => {
    if (t._id === updatedNotavses._id) {
      t.session = updatedNotavses.session;
      t.starting_time_hour = updatedNotavses.starting_time_hour;
      t.starting_time_minute = updatedNotavses.starting_time_minute;
      t.ending_time_hour = updatedNotavses.ending_time_hour;
      t.ending_time_minute = updatedNotavses.ending_time_minute;
    }
    return t;
  });
  renderNotavsess(notavsess);
});
