const { ipcRenderer } = require("electron");

const sessionForm = document.querySelector("#sessionForm");
const lecturer = document.querySelector("#lecturer");
const subject = document.querySelector("#subject");
const subjectCode = document.querySelector("#subjectCode");
const tag = document.querySelector("#tag");
const groupId = document.querySelector("#groupId");
const subGroupId = document.querySelector("#subGroupId");
const studentCount = document.querySelector("#studentCount");
const durationHour = document.querySelector("#durationHour");
const durationMinute = document.querySelector("#durationMinute");
const sessionList = document.querySelector("#sessionList");

let updateStatus = false;
let idSessionToUpdate = "";

function deleteSession(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-session", id);
  }
  return;
}

function editSession(id) {
  updateStatus = true;
  idSessionToUpdate = id;
  const session = sessions.find((session) => session._id === id);
  lecturer.value = session.lecturer;
  subject.value = session.subject;
  subjectCode.value = session.subject_code;
  tag.value = session.tag;
  groupId.value = session.group_id;
  subGroupId.value = session.sub_group_id;
  studentCount.value = session.student_count;
  durationHour.value = session.duration_hour;
  durationMinute.value = session.duration_minute;
}

function renderSessions(sessions) {
  sessionList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Lecturer</th>
          <th style="width:100px; display:inline-block; overflow:hidden">Subject</th>
          <th style="width:150px; display:inline-block; overflow:hidden">SubjectCode</th>
          <th style="width:100px; display:inline-block; overflow:hidden">S-Count</th>

          </tr>
        </thead>
        </table>
  `
;
  console.log(sessions);
  sessions.map((t) => {
    sessionList.innerHTML +=`
    <table class="table table-striped">
          <tbody>
            <tr>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.lecturer}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.subject}</td>
              <td style="width:150px; display:inline-block; overflow:hidden">${t.subject_code}</td>
              <td style="width:100px; display:inline-block; overflow:hidden">${t.student_count}</td>
              <td style="width:250px; display:inline-block; overflow:hidden">
              <button class="btn btn-btn btn-outline-success" onclick="editSession('${t._id}')">
             Edit
          </button>
              <button class="btn btn-btn btn-outline-danger" onclick="deleteSession('${t._id}')">
              Delete
            </button>
          </td>
            </tr>
    </table>
  `;
  });
}



let sessions = [];

ipcRenderer.send("get-sessions");

sessionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const session = {
    lecturer: lecturer.value,
    subject: subject.value,
    subject_code: subjectCode.value,
    tag: tag.value,
    group_id: groupId.value,
    sub_group_id: subGroupId.value,
    student_count: studentCount.value,
    duration_hour: durationHour.value,
    duration_minute: durationMinute.value,
  };

  var x = document.getElementById("myDIV1");
  var y = document.getElementById("myDIV2");
  var z = document.getElementById("myDIV3");

  if(studentCount.value == '') {

    x.style.display = "block";
  }

  else if (durationHour.value == '') {

    y.style.display = "block";
  }

  else if (durationMinute.value == '') {

    y.style.display = "block";
  }

  else {

  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-session", session);
  } else {
    ipcRenderer.send("update-session", { ...session, idSessionToUpdate });
  }

  sessionForm.reset();


  x.style.display = "none";

  y.style.display = "none";

  z.style.display = "none";

  }

});

ipcRenderer.on("new-session-created", (e, arg) => {
  console.log(arg);
  const sessionSaved = JSON.parse(arg);
  sessions.push(sessionSaved);
  console.log(sessions);
  renderSessions(sessions);
  alert("Session Created Successfully");
  sessionName.focus();
});

ipcRenderer.on("get-sessions", (e, args) => {
  const receivedSessions = JSON.parse(args);
  sessions = receivedSessions;
  renderSessions(sessions);
});

ipcRenderer.on("delete-session-success", (e, args) => {
  const deletedSession = JSON.parse(args);
  const newSessions = sessions.filter((t) => {
    return t._id !== deletedSession._id;
  });
  sessions = newSessions;
  renderSessions(sessions);
});

ipcRenderer.on("update-session-success", (e, args) => {
  updateStatus = false;
  const updatedSession = JSON.parse(args);
  sessions = sessions.map((t, i) => {
    if (t._id === updatedSession._id) {
      t.lecturer = updatedSession.lecturer;
      t.subject = updatedSession.subject;
      t.subject_code = updatedSession.subject_code;
      t.tag = updatedSession.tag;
      t.group_id = updatedSession.group_id;
      t.sub_group_id = updatedSession.sub_group_id;
      t.student_count = updatedSession.student_count;
      t.duration_hour = updatedSession.duration_hour;
      t.duration_minute = updatedSession.duration_minute;
    }
    return t;
  });
  renderSessions(sessions);
});
