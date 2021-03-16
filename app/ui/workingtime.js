const { ipcRenderer } = require("electron");

const workingtimeForm = document.querySelector("#workingtimeForm");
const hour = document.querySelector("#hour");
const minute = document.querySelector("#minute");
const workingtimeList = document.querySelector("#workingtimeList");

let updateStatus = false;
let idWorkingtimeToUpdate = "";

function deleteWorkingtime(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-workingtime", id);
  }
  return;
}

function editWorkingtime(id) {
  updateStatus = true;
  idWorkingtimeToUpdate = id;
  const workingtime = workingtimes.find((workingtime) => workingtime._id === id);
  hour.value = workingtime.hour;
  minute.value = workingtime.minute;
}

function renderWorkingtimes(workingtimes) {
  workingtimeList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Hours</th>
          <th style="width:200px; display:inline-block; overflow:hidden"></th>
          </tr>
        </thead>
        </table>
  `;
  console.log(workingtimes);
  workingtimes.map((t) => {
    workingtimeList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.hour}:${t.minute}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editWorkingtime('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteWorkingtime('${t._id}')">
        Delete
      </button>
    </td>
      </tr>
</table>
        `;
  });
}



let workingtimes = [];

ipcRenderer.send("get-workingtimes");

workingtimeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const workingtime = {
    hour: hour.value,
    minute: minute.value,
  };

  var x = document.getElementById("myDIV1");

  if(hour.value == '') {
    x.style.display = "block";
  }

  else if (minute.value == '') {
    x.style.display = "block";
  }

  else {
    console.log("updateStatus");
    console.log(updateStatus);

    if (!updateStatus) {
        ipcRenderer.send("new-workingtime", workingtime);
    } else {
        ipcRenderer.send("update-workingtime", { ...workingtime, idWorkingtimeToUpdate });
    }

    workingtimeForm.reset();

    x.style.display = "none";
  }
});

ipcRenderer.on("new-workingtime-created", (e, arg) => {
  console.log(arg);
  const workingtimeSaved = JSON.parse(arg);
  workingtimes.push(workingtimeSaved);
  console.log(workingtimes);
  renderWorkingtimes(workingtimes);
  alert("Working Time Inserted Successfully");
  workingtimeName.focus();
});

ipcRenderer.on("get-workingtimes", (e, args) => {
  const receivedWorkingtimes = JSON.parse(args);
  workingtimes = receivedWorkingtimes;
  renderWorkingtimes(workingtimes);
});

ipcRenderer.on("delete-workingtime-success", (e, args) => {
  const deletedWorkingtime = JSON.parse(args);
  const newWorkingtimes = workingtimes.filter((t) => {
    return t._id !== deletedWorkingtime._id;
  });
  workingtimes = newWorkingtimes;
  renderWorkingtimes(workingtimes);
});

ipcRenderer.on("update-workingtime-success", (e, args) => {
  updateStatus = false;
  const updatedWorkingtime = JSON.parse(args);
  workingtimes = workingtimes.map((t, i) => {
    if (t._id === updatedWorkingtime._id) {
      t.hour = updatedWorkingtime.hour;
      t.minute = updatedWorkingtime.minute;
    }
    return t;
  });
  renderWorkingtimes(workingtimes);
});
