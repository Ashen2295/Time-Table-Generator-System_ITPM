const { ipcRenderer } = require("electron");

const notavlecForm = document.querySelector("#notavlecForm");
const lecturer = document.querySelector("#lecturer");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const notavlecList = document.querySelector("#notavlecList");


let updateStatus = false;
let idNotavlecToUpdate = "";

function deleteNotavlec(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-notavlec", id);
  }
  return;
}

function editNotavlec(id) {
  updateStatus = true;
  idNotavlecToUpdate = id;
  const notavlec = notavlecs.find((notavlec) => notavlec._id === id);
  lecturer.value = notavlec.lecturer;
  startingHour.value = notavlec.starting_time_hour;
  endingHour.value = notavlec.ending_time_hour;
}

function renderNotavlecs(notavlecs) {
  notavlecList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Lecturer</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>

          </tr>
        </thead>
        </table>
  `;
  console.log(notavlecs);
  notavlecs.map((t) => {
    notavlecList.innerHTML +=`
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.lecturer}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.starting_time_hour}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.ending_time_hour}</td>
              <td style="width:250px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editNotavlec('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteNotavlec('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let notavlecs = [];

ipcRenderer.send("get-notavlecs");

notavlecForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const notavlec = {
    lecturer: lecturer.value,
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
    ipcRenderer.send("new-notavlec", notavlec);
  } else {
    ipcRenderer.send("update-notavlec", { ...notavlec, idNotavlecToUpdate });
  }

  notavlecForm.reset();


  x.style.display = "none";

  y.style.display = "none";

  }

});

ipcRenderer.on("new-notavlec-created", (e, arg) => {
  console.log(arg);
  const notavlecSaved = JSON.parse(arg);
  notavlecs.push(notavlecSaved);
  console.log(notavlecs);
  renderNotavlecs(notavlecs);
  alert("Not Available Time Added Successfully");
  notavlecName.focus();
});

ipcRenderer.on("get-notavlecs", (e, args) => {
  const receivedNotavlecs = JSON.parse(args);
  notavlecs = receivedNotavlecs;
  renderNotavlecs(notavlecs);
});

ipcRenderer.on("delete-notavlec-success", (e, args) => {
  const deletedNotavlec = JSON.parse(args);
  const newNotavlecs = notavlecs.filter((t) => {
    return t._id !== deletedNotavlec._id;
  });
  notavlecs = newNotavlecs;
  renderNotavlecs(notavlecs);
});

ipcRenderer.on("update-notavlec-success", (e, args) => {
  updateStatus = false;
  const updatedNotavlec = JSON.parse(args);
  notavlecs = notavlecs.map((t, i) => {
    if (t._id === updatedNotavlec._id) {
      t.lecturer = updatedNotavlec.lecturer;
      t.starting_time_hour = updatedNotavlec.starting_time_hour;
      t.ending_time_hour = updatedNotavlec.ending_time_hour;
    }
    return t;
  });
  renderNotavlecs(notavlecs);
});
