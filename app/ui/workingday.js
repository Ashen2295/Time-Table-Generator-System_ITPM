const { ipcRenderer } = require("electron");

const workingdayForm = document.querySelector("#workingdayForm");
const day = document.querySelector("#day");
const monday = document.querySelector("#monday");
const tuesday = document.querySelector("#tuesday");
const wednesday = document.querySelector("#wednesday");
const thursday = document.querySelector("#thursday");
const friday = document.querySelector("#friday");
const workingdayList = document.querySelector("#workingdayList");

let updateStatus = false;
let idWorkingdayToUpdate = "";

function deleteWorkingday(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-workingday", id);
  }
  return;
}

function editWorkingday(id) {
  updateStatus = true;
  idWorkingdayToUpdate = id;
  const workingday = workingdays.find((workingday) => workingday._id === id);
  day.value = workingday.day;
  monday.value = workingday.monday;
  tuesday.value = workingday.tuesday;
  wednesday.value = workingday.wednesday;
  thursday.value = workingday.thursday;
  friday.value = workingday.friday;
}

function renderWorkingdays(workingdays) {
  workingdayList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Working Days</th>
          </tr>
        </thead>
        </table>
  `;
  console.log(workingdays);
  workingdays.map((t) => {
    workingdayList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.day}</td>

        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editWorkingday('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteWorkingday('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}



let workingdays = [];

ipcRenderer.send("get-workingdays");

workingdayForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const workingday = {
    day: day.value,
    monday: monday.value,
    tuesday: tuesday.value,
    wednesday: wednesday.value,
    thursday: thursday.value,
    friday: friday.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-workingday", workingday);
  } else {
    ipcRenderer.send("update-workingday", { ...workingday, idWorkingdayToUpdate });
  }

  workingdayForm.reset();
});

ipcRenderer.on("new-workingday-created", (e, arg) => {
  console.log(arg);
  const workingdaySaved = JSON.parse(arg);
  workingdays.push(workingdaySaved);
  console.log(workingdays);
  renderWorkingdays(workingdays);
  alert("Working Days Inserted Successfully");
  workingdayName.focus();
});

ipcRenderer.on("get-workingdays", (e, args) => {
  const receivedWorkingdays = JSON.parse(args);
  workingdays = receivedWorkingdays;
  renderWorkingdays(workingdays);
});

ipcRenderer.on("delete-workingday-success", (e, args) => {
  const deletedWorkingday = JSON.parse(args);
  const newWorkingdays = workingdays.filter((t) => {
    return t._id !== deletedWorkingday._id;
  });
  workingdays = newWorkingdays;
  renderWorkingdays(workingdays);
});

ipcRenderer.on("update-workingday-success", (e, args) => {
  updateStatus = false;
  const updatedWorkingday = JSON.parse(args);
  workingdays = workingdays.map((t, i) => {
    if (t._id === updatedWorkingday._id) {
      t.day = updatedWorkingday.day;
      t.monday = updatedWorkingday.monday;
      t.tuesday = updatedWorkingday.tuesday;
      t.wednesday = updatedWorkingday.wednesday;
      t.thursday = updatedWorkingday.thursday;
      t.friday = updatedWorkingday.friday;
    }
    return t;
  });
  renderWorkingdays(workingdays);
});
