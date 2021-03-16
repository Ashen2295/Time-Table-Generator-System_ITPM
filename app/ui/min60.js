const { ipcRenderer } = require("electron");

const min60Form = document.querySelector("#min60Form");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const min60List = document.querySelector("#min60List");

let updateStatus = false;
let idMin60ToUpdate = "";

function deleteMin60(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-min60", id);
  }
  return;
}

function editMin60(id) {
  updateStatus = true;
  idMin60ToUpdate = id;
  const min60 = min60s.find((min60) => min60._id === id);
  startingHour.value = min60.startingHour;
  endingHour.value = min60.endingHour;
}

function renderMin60s(min60s) {
  min60List.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(min60s);
  min60s.map((t) => {
    min60List.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.startingHour}</td>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.endingHour}</td>
        <td style="width:250px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editMin60('${t._id}')">
       Edit
    </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteMin60('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let min60s = [];

ipcRenderer.send("get-min60s");

min60Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const min60 = {
    startingHour: startingHour.value,
    endingHour: endingHour.value,
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
      ipcRenderer.send("new-min60", min60);
    } else {
      ipcRenderer.send("update-min60", { ...min60, idMin60ToUpdate });
    }

    min60Form.reset();

    x.style.display = "none";

    y.style.display = "none";
  }
});

ipcRenderer.on("new-min60-created", (e, arg) => {
  console.log(arg);
  const min60Saved = JSON.parse(arg);
  min60s.push(min60Saved);
  console.log(min60s);
  renderMin60s(min60s);
  alert("Time Slot Inserted Successfully");
  startingHour.focus();
});

ipcRenderer.on("get-min60s", (e, args) => {
  const receivedMin60s = JSON.parse(args);
  min60s = receivedMin60s;
  renderMin60s(min60s);
});

ipcRenderer.on("delete-min60-success", (e, args) => {
  const deletedMin60 = JSON.parse(args);
  const newMin60s = min60s.filter((t) => {
    return t._id !== deletedMin60._id;
  });
  min60s = newMin60s;
  renderMin60s(min60s);
});

ipcRenderer.on("update-min60-success", (e, args) => {
  updateStatus = false;
  const updatedMin60 = JSON.parse(args);
  min60s = min60s.map((t, i) => {
    if (t._id === updatedMin60._id) {
      t.startingHour = updatedMin60.startingHour;
      t.endingHour = updatedMin60.endingHour;
    }
    return t;
  });
  renderMin60s(min60s);
});
