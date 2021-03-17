const { ipcRenderer } = require("electron");

const tagForm = document.querySelector("#tagForm");
const tagSelect = document.querySelector("#tagSelect");
const tagList = document.querySelector("#tagList");

let updateStatus = false;
let idTagToUpdate = "";

function deleteTag(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-tag", id);
  }
  return;
}

function editTag(id) {
  updateStatus = true;
  idTagToUpdate = id;
  const tag = tags.find((tag) => tag._id === id);
  tagSelect.value = tag.tagSelect;
}

function renderTags(tags) {
  tagList.innerHTML = `<table class="table table-striped">
  <thead>
          <tr>
          <th style="width:100px; display:inline-block; overflow:hidden">Tags</th>
          <th style="width:200px; display:inline-block; overflow:hidden"></th>
          </tr>
        </thead>
        </table>
  `;
  console.log(tags);
  tags.map((t) => {
    tagList.innerHTML += `
    <table class="table table-striped">
    <tbody>
      <tr>
        <td style="width:100px; display:inline-block; overflow:hidden">${t.tagSelect}</td>
        <td style="width:200px; display:inline-block; overflow:hidden">
        <button class="btn btn-btn btn-outline-success" onclick="editTag('${t._id}')">
       Edit
      </button>
        <button class="btn btn-btn btn-outline-danger" onclick="deleteTag('${t._id}')">
        Delete
      </button>
    </td>
      </tr>   
</table>
        `;
  });
}



let tags = [];

ipcRenderer.send("get-tags");

tagForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const tag = {
    tagSelect: tagSelect.value,
  };
  console.log("updateStatus");
  console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-tag", tag);
  } else {
    ipcRenderer.send("update-tag", { ...tag, idTagToUpdate });
  }

  tagForm.reset();
});

ipcRenderer.on("new-tag-created", (e, arg) => {
  console.log(arg);
  const tagSaved = JSON.parse(arg);
  tags.push(tagSaved);
  console.log(tags);
  renderTags(tags);
  alert("Tag Created Successfully");
  tagName.focus();
});

ipcRenderer.on("get-tags", (e, args) => {
  const receivedTags = JSON.parse(args);
  tags = receivedTags;
  renderTags(tags);
});

ipcRenderer.on("delete-tag-success", (e, args) => {
  const deletedTag = JSON.parse(args);
  const newTags = tags.filter((t) => {
    return t._id !== deletedTag._id;
  });
  tags = newTags;
  renderTags(tags);
});

ipcRenderer.on("update-tag-success", (e, args) => {
  updateStatus = false;
  const updatedTag = JSON.parse(args);
  tags = tags.map((t, i) => {
    if (t._id === updatedTag._id) {
      t.tagSelect = updatedTag.tagSelect;
    }
    return t;
  });
  renderTags(tags);
});
