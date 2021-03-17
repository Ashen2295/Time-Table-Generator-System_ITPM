const { ipcRenderer } = require("electron");

const moduleForm = document.querySelector("#moduleForm");
const offeredYear = document.querySelector("#offeredYear");
const offeredSem = document.querySelector("#offeredSem");
const sName = document.querySelector("#sName");
const sCode = document.querySelector("#sCode");
const lHours = document.querySelector("#lHours");
const lMins = document.querySelector("#lMins");
const tHours = document.querySelector("#tHours");
const tMins = document.querySelector("#tMins");
const labHours = document.querySelector("#labHours");
const labMins = document.querySelector("#labMins");
const eHours = document.querySelector("#eHours");
const eMins = document.querySelector("#eMins");
const moduleList = document.querySelector("#moduleList");

let updateStatus = false;
let idModuleToUpdate = "";

function deleteModule(id) {
    const response = confirm("are you sure you want to delete it?");
    if (response) {
        ipcRenderer.send("delete-module", id);
    }
    return;
}

function editModule(id) {
    updateStatus = true;
    idModuleToUpdate = id;
    const module = modules.find((module) => module._id === id);
    offeredYear.value = module.offeredYear;
    offeredSem.value = module.offeredSem;
    sName.value = module.sName;
    sCode.value = module.sCode;
    lHours.value = module.lHours;
    lMins.value = module.lMins;
    tHours.value = module.tHours;
    tMins.value = module.tMins;
    labHours.value = module.labHours;
    labMins.value = module.labMins;
    eHours.value = module.eHours;
    eMins.value = module.eMins;
}

function renderModules(modules) {
    moduleList.innerHTML = "";
    console.log(modules);
    modules.map((t) => {
        moduleList.innerHTML += `
        <table class="table table-dark">
            <thead>
            <tr>
            <th scope="col">Year</th>
            <th scope="col">Sem</th>
            <th scope="col">Subject</th>
            </tr>
        </thead>
        <tbody>
        <tr>
          <td>${t.offeredYear}</td>
          <td>${t.offeredSem}</td>
          <td>${t.sName}</td>


          <td><button class="btn btn-danger" onclick="deleteModule('${t._id}')">
          🗑 Delete
        </button></td>
          <td><button class="btn btn-secondary" onclick="editModule('${t._id}')">
          ✎ Edit
        </button></td>
        </tr>
      </tbody>
        </table>
        `;
    });
}

let modules = [];

ipcRenderer.send("get-modules");

moduleForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const module = {
        offeredYear: offeredYear.value,
        offeredSem: offeredSem.value,
        sName: sName.value,
        sCode: sCode.value,
        lHours: lHours.value,
        lMins: lMins.value,
        tHours: tHours.value,
        tMins: tMins.value,
        labHours: labHours.value,
        labMins: labMins.value,
        eHours: eHours.value,
        eMins: eMins.value,
    };

    var x = document.getElementById("myDIV1");
    var y = document.getElementById("myDIV2");
    var z = document.getElementById("myDIV3");
    var a = document.getElementById("myDIV4");
    var b = document.getElementById("myDIV5");
    var c = document.getElementById("myDIV6");

    if(sName.value == '') {

        x.style.display = "block";
    }

    else if (sCode.value == '') {

        y.style.display = "block";
    }

    else if (lHours.value == '') {

        z.style.display = "block";
    }

    else if (lMins.value == '') {

        z.style.display = "block";
    }

    else if (tHours.value == '') {

        a.style.display = "block";
    }

    else if (tMins.value == '') {

        a.style.display = "block";
    }

    else if (labHours.value == '') {

        b.style.display = "block";
    }

    else if (labMins.value == '') {

        b.style.display = "block";
    }

    else if (eHours.value == '') {

        c.style.display = "block";
    }

    else if (eMins.value == '') {

        c.style.display = "block";
    }

    else {

    console.log("updateStatus");
    console.log(updateStatus);

    if (!updateStatus) {
        ipcRenderer.send("new-module", module);
    } else {
        ipcRenderer.send("update-module", { ...module, idModuleToUpdate });
    }

    moduleForm.reset();


    x.style.display = "none";

    y.style.display = "none";

    z.style.display = "none";

    a.style.display = "none";

    b.style.display = "none";

    c.style.display = "none";
    }

});

ipcRenderer.on("new-module-created", (e, arg) => {
    console.log(arg);
    const moduleSaved = JSON.parse(arg);
    modules.push(moduleSaved);
    console.log(modules);
    renderModules(modules);
    alert("Module Created Successfully");
    offeredYear.focus();
});

ipcRenderer.on("get-modules", (e, args) => {
    const receivedModules = JSON.parse(args);
    modules = receivedModules;
    renderModules(modules);
});

ipcRenderer.on("delete-module-success", (e, args) => {
    const deletedModule = JSON.parse(args);
    const newModules = tasks.filter((t) => {
        return t._id !== deletedModule._id;
    });
    modules = newModules;
    renderModules(modules);
});

ipcRenderer.on("update-module-success", (e, args) => {
    updateStatus = false;
    const updatedModule = JSON.parse(args);
    modules = modules.map((t, i) => {
        if (t._id === updatedModule._id) {
            t.offeredYear = updatedModule.offeredYear;
            t.offeredSem = updatedModule.offeredSem;
            t.sName = updatedModule.sName;
            t.sCode = updatedModule.sCode;
            t.lHours = updatedModule.lHours;
            t.lMins = updatedModule.lMins;
            t.tHours = updatedModule.tHours;
            t.tMins = updatedModule.tMins;
            t.labHours = updatedModule.labHours;
            t.labMins = updatedModule.labMins;
            t.eHours = updatedModule.eHours;
            t.eMins = updatedModule.eMins;
        }
        return t;
    });
    renderModules(modules);
});
