const { ipcRenderer } = require("electron");

const min30Form = document.querySelector("#min30Form");
const startingHour = document.querySelector("#startingHour");
const endingHour = document.querySelector("#endingHour");
const min30List = document.querySelector("#min30List");

let updateStatus = false;
let idMin30ToUpdate = "";

function deleteMin30(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-min30", id);
  }
  return;
}

function editMin30(id) {
  updateStatus = true;
  idMin30ToUpdate = id;
  const min30 = min30s.find((min30) => min30._id === id);
  startingHour.value = min30.startingHour;
  endingHour.value = min30.endingHour;
}

function renderMin30s(min30s) {
  min30List.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Start</th>
          <th style="width:100px; display:inline-block; overflow:hidden">End</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(min30s);
  min30s.map((t) => {
    min30List.innerHTML += `
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.startingHour}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.endingHour}</td>
              <td style="width:250px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editMin30('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteMin30('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let min30s = [];

ipcRenderer.send("get-min30s");

min30Form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const min30 = {
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
        ipcRenderer.send("new-min30", min30);
    } else {
        ipcRenderer.send("update-min30", { ...min30, idMin30ToUpdate });
    }

    min30Form.reset();

    x.style.display = "none";

    y.style.display = "none";
}
});

ipcRenderer.on("new-min30-created", (e, arg) => {
  console.log(arg);
  const min30Saved = JSON.parse(arg);
  min30s.push(min30Saved);
  console.log(min30s);
  renderMin30s(min30s);
  alert("Time Slot Inserted Successfully");
  startingHour.focus();
});

ipcRenderer.on("get-min30s", (e, args) => {
  const receivedMin30s = JSON.parse(args);
  min30s = receivedMin30s;
  renderMin30s(min30s);
});

ipcRenderer.on("delete-min30-success", (e, args) => {
  const deletedMin30 = JSON.parse(args);
  const newMin30s = min30s.filter((t) => {
    return t._id !== deletedMin30._id;
  });
  min30s = newMin30s;
  renderMin30s(min30s);
});

ipcRenderer.on("update-min30-success", (e, args) => {
  updateStatus = false;
  const updatedMin30 = JSON.parse(args);
  min30s = min30s.map((t, i) => {
    if (t._id === updatedMin30._id) {
      t.startingHour = updatedMin30.startingHour;
      t.endingHour = updatedMin30.endingHour;
    }
    return t;
  });
  renderMin30s(min30s);
});
