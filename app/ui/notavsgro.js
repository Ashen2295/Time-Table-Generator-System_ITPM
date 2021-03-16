const { ipcRenderer } = require("electron");

const notavsgroForm = document.querySelector("#notavsgroForm");
const sub_group = document.querySelector("#sub_group");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const notavsgroList = document.querySelector("#notavsgroList");


let updateStatus = false;
let idNotavsgroToUpdate = "";

function deleteNotavsgro(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-notavsgro", id);
  }
  return;
}

function editNotavsgro(id) {
  updateStatus = true;
  idNotavsgroToUpdate = id;
  const notavsgro = notavsgros.find((notavsgro) => notavsgro._id === id);
  sub_group.value = notavsgro.sub_group;
  startingHour.value = notavsgro.starting_time_hour;
  endingHour.value = notavsgro.ending_time_hour;
}

function renderNotavsgros(notavsgros) {
  notavsgroList.innerHTML =  `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">subGrp</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>

          </tr>
        </thead>
        </table>
  `;
  console.log(notavsgros);
  notavsgros.map((t) => {
    notavsgroList.innerHTML +=`
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.sub_group}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.starting_time_hour}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.ending_time_hour}</td>
              <td style="width:200px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editNotavsgro('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteNotavsgro('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let notavsgros = [];

ipcRenderer.send("get-notavsgros");

notavsgroForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const notavsgro = {
    sub_group: sub_group.value,
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
    ipcRenderer.send("new-notavsgro", notavsgro);
  } else {
    ipcRenderer.send("update-notavsgro", { ...notavsgro, idNotavsgroToUpdate });
  }

  notavsgroForm.reset();

  x.style.display = "none";

    y.style.display = "none";
  }



});

ipcRenderer.on("new-notavsgro-created", (e, arg) => {
  console.log(arg);
  const notavsgroSaved = JSON.parse(arg);
  notavsgros.push(notavsgroSaved);
  console.log(notavsgros);
  renderNotavsgros(notavsgros);
  alert("Not Available Time Added Successfullyy");
  notavsgroName.focus();
});

ipcRenderer.on("get-notavsgros", (e, args) => {
  const receivedNotavsgros = JSON.parse(args);
  notavsgros = receivedNotavsgros;
  renderNotavsgros(notavsgros);
});

ipcRenderer.on("delete-notavsgro-success", (e, args) => {
  const deletedNotavsgro = JSON.parse(args);
  const newNotavsgros = notavsgros.filter((t) => {
    return t._id !== deletedNotavsgro._id;
  });
  notavsgros = newNotavsgros;
  renderNotavsgros(notavsgros);
});

ipcRenderer.on("update-notavsgro-success", (e, args) => {
  updateStatus = false;
  const updatedNotavsgro = JSON.parse(args);
  notavsgros = notavsgros.map((t, i) => {
    if (t._id === updatedNotavsgro._id) {
      t.sub_group = updatedNotavsgro.sub_group;
      t.starting_time_hour = updatedNotavsgro.starting_time_hour;
      t.ending_time_hour = updatedNotavsgro.ending_time_hour;
    }
    return t;
  });
  renderNotavsgros(notavsgros);
});
