const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Room = require("./models/Room");
const Student = require("./models/Student");
const Workingd = require("./models/Workingd.js");
const Min30 = require("./models/Min30");
const Module = require("./models/Modules");
const Min60 = require("./models/Min60");
const Session = require("./models/Session");
const Consecs = require("./models/Consecs");
const Parallels = require("./models/Parallels");
const Notov = require("./models/Notov");
const Notavgro = require("./models/Notavgro");
const Notavsgro = require("./models/Notavsgro");
const Notavlec = require("./models/Notavlec");
const Notavses = require("./models/Notavses");
const Tag = require("./models/Tag");
const Lecturer = require("./models/Lecturer");
const WorkingH = require("./models/WorkingHour");
const Busytime = require("./models/Busytime");
const Lecroomalo = require("./models/Lecroomalo");
const Grouproomalo1 = require("./models/Grouproomalo1");
const Grouproomalo2 = require("./models/Grouproomalo2");
const Grouproomalo3 = require("./models/Grouproomalo3");
const Workingday = require("./models/Workingday");
const Workingtime = require("./models/Workingtime");



function createWindow() {
    const win = new BrowserWindow({
        width: 500,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile("app/index.html");
}

ipcMain.on("new-task", async (e, arg) => {
    const newTask = new Task(arg);
    const taskSaved = await newTask.save();
    console.log("taskSaved");
    console.log(taskSaved);
    e.reply("new-task-created", JSON.stringify(taskSaved));
});

ipcMain.on("get-tasks", async (e, arg) => {
    const tasks = await Task.find();
    e.reply("get-tasks", JSON.stringify(tasks));
});

ipcMain.on("delete-task", async (e, args) => {
    const taskDeleted = await Task.findByIdAndDelete(args);
    e.reply("delete-task-success", JSON.stringify(taskDeleted));
});

ipcMain.on("update-task", async (e, args) => {
    console.log(args);
    const updatedTask = await Task.findByIdAndUpdate(
        args.idTaskToUpdate,
        { name: args.name, description: args.description, note: args.note },
        { new: true }
    );
    e.reply("update-task-success", JSON.stringify(updatedTask));
});

ipcMain.on("new-room", async (e, arg) => {
    const newRoom = new Room(arg);
    const roomSaved = await newRoom.save();
    console.log("roomSaved");
    console.log(roomSaved);
    e.reply("new-room-created", JSON.stringify(roomSaved));
});

ipcMain.on("get-rooms", async (e, arg) => {
    const rooms = await Room.find();
    e.reply("get-rooms", JSON.stringify(rooms));
});

ipcMain.on("delete-room", async (e, args) => {
    const roomDeleted = await Room.findByIdAndDelete(args);
    e.reply("delete-room-success", JSON.stringify(roomDeleted));
});

ipcMain.on("update-room", async (e, args) => {
    console.log(args);
    const updatedRoom = await Room.findByIdAndUpdate(
        args.idRoomToUpdate,
        {
            buildingName: args.buildingName,
            roomName: args.roomName,
            categoty: args.categoty,
            type: args.type,
        },
        { new: true }
    );
    e.reply("update-room-success", JSON.stringify(updatedRoom));
});

ipcMain.on("new-student", async (e, arg) => {
    const newStudent = new Student(arg);
    const studentSaved = await newStudent.save();
    console.log("studentSaved");
    console.log(studentSaved);
    e.reply("new-student-created", JSON.stringify(studentSaved));
});

ipcMain.on("get-students", async (e, arg) => {
    const students = await Student.find();
    e.reply("get-students", JSON.stringify(students));
});

ipcMain.on("delete-student", async (e, args) => {
    const studentDeleted = await Student.findByIdAndDelete(args);
    e.reply("delete-student-success", JSON.stringify(studentDeleted));
});

ipcMain.on("update-student", async (e, args) => {
    console.log(args);
    const updatedStudent = await Student.findByIdAndUpdate(
        args.idStudentToUpdate,
        {
            year: args.year,
            programme: args.programme,
            group_count: args.group_count,
            sub_group_count: args.sub_group_count,
        },
        { new: true }
    );
    e.reply("update-student-success", JSON.stringify(updatedStudent));
});

ipcMain.on("new-workingd", async (e, arg) => {
    const newWorkingd = new Workingd(arg);
    const workingdSaved = await newWorkingd.save();
    console.log("workingdSaved");
    console.log(workingdSaved);
    e.reply("new-workingd-created", JSON.stringify(workingdSaved));
});

ipcMain.on("get-workingds", async (e, arg) => {
    const workingds = await Workingd.find();
    e.reply("get-workingds", JSON.stringify(workingds));
});

ipcMain.on("delete-workingd", async (e, args) => {
    const workingdDeleted = await Workingd.findByIdAndDelete(args);
    e.reply("delete-workingd-success", JSON.stringify(workingdDeleted));
});

ipcMain.on("update-workingd", async (e, args) => {
    console.log(args);
    const updatedWorkingd = await Workingd.findByIdAndUpdate(
        args.idWorkingdToUpdate,
        { hour: args.hour, minute: args.minute },
        { new: true }
    );
    e.reply("update-workingd-success", JSON.stringify(updatedWorkingd));
});

ipcMain.on("new-min30", async (e, arg) => {
    const newMin30 = new Min30(arg);
    const min30Saved = await newMin30.save();
    console.log("min30Saved");
    console.log(min30Saved);
    e.reply("new-min30-created", JSON.stringify(min30Saved));
});

ipcMain.on("get-min30s", async (e, arg) => {
    const min30s = await Min30.find();
    e.reply("get-min30s", JSON.stringify(min30s));
});

ipcMain.on("delete-min30", async (e, args) => {
    const min30Deleted = await Min30.findByIdAndDelete(args);
    e.reply("delete-min30-success", JSON.stringify(min30Deleted));
});

ipcMain.on("update-min30", async (e, args) => {
    console.log(args);
    const updatedMin30 = await Min30.findByIdAndUpdate(
        args.idMin30ToUpdate,
        {
            startingHour: args.startingHour,
            startingMinute: args.startingMinute,
            endingHour: args.endingHour,
            endingMinute: args.endingMinute,
        },
        { new: true }
    );
    e.reply("update-min30-success", JSON.stringify(updatedMin30));
});

ipcMain.on("new-module", async (e, arg) => {
    const newModule = new Module(arg);
    const moduleSaved = await newModule.save();
    console.log("moduleSaved");
    console.log(moduleSaved);
    e.reply("new-module-created", JSON.stringify(moduleSaved));
});

ipcMain.on("get-modules", async (e, arg) => {
    const modules = await Module.find();
    e.reply("get-modules", JSON.stringify(modules));
});

ipcMain.on("delete-module", async (e, args) => {
    const moduleDeleted = await Module.findByIdAndDelete(args);
    e.reply("delete-module-success", JSON.stringify(moduleDeleted));
});

ipcMain.on("update-module", async (e, args) => {
    console.log(args);
    const updatedModule = await Module.findByIdAndUpdate(
        args.idModuleToUpdate,
        {
            offeredYear: args.offeredYear,
            offeredSem: args.offeredSem,
            sName: args.sName,
            sCode: args.sCode,
            lHours: args.lHours,
            lMins: args.lMins,
            tHours: args.tHours,
            tMins: args.tMins,
            labHours: args.labHours,
            labMins: args.labMins,
            eHours: args.eHours,
            eMins: args.eMins,
        },
        { new: true }
    );
    e.reply("update-Module-success", JSON.stringify(updatedModule));
});



ipcMain.on("new-min60", async (e, arg) => {
    const newMin60 = new Min60(arg);
    const min60Saved = await newMin60.save();
    console.log("min60Saved");
    console.log(min60Saved);
    e.reply("new-min60-created", JSON.stringify(min60Saved));
});

ipcMain.on("get-min60s", async (e, arg) => {
    const min60s = await Min60.find();
    e.reply("get-min60s", JSON.stringify(min60s));
});

ipcMain.on("delete-min60", async (e, args) => {
    const min60Deleted = await Min60.findByIdAndDelete(args);
    e.reply("delete-min60-success", JSON.stringify(min60Deleted));
});

ipcMain.on("update-min60", async (e, args) => {
    console.log(args);
    const updatedMin60 = await Min60.findByIdAndUpdate(
        args.idMin60ToUpdate,
        {
            startingHour: args.startingHour,
            startingMinute: args.startingMinute,
            endingHour: args.endingHour,
            endingMinute: args.endingMinute,
        },
        { new: true }
    );
    e.reply("update-min60-success", JSON.stringify(updatedMin60));
});



ipcMain.on("new-session", async (e, arg) => {
    const newSession = new Session(arg);
    const sessionSaved = await newSession.save();
    console.log("sessionSaved");
    console.log(sessionSaved);
    e.reply("new-session-created", JSON.stringify(sessionSaved));
});

ipcMain.on("get-sessions", async (e, arg) => {
    const sessions = await Session.find();
    e.reply("get-sessions", JSON.stringify(sessions));
});

ipcMain.on("delete-session", async (e, args) => {
    const sessionDeleted = await Session.findByIdAndDelete(args);
    e.reply("delete-session-success", JSON.stringify(sessionDeleted));
});

ipcMain.on("update-session", async (e, args) => {
    console.log(args);
    const updatedSession = await Session.findByIdAndUpdate(
        args.idSessionToUpdate,
        { lecturer: args.lecturer, subject: args.subject, subject_code: args.subject_code, tag: args.tag, group_id: args.group_id, sub_group_id: args.sub_group_id, student_count: args.student_count, duration_hour: args.duration_hour, duration_minute: args.duration_minute},
        { new: true }
    );
    e.reply("update-session-success", JSON.stringify(updatedSession));
});





ipcMain.on("new-consecs", async (e, arg) => {
    const newConsecs = new Consecs(arg);
    const consecsSaved = await newConsecs.save();
    console.log("consecsSaved");
    console.log(consecsSaved);
    e.reply("new-consecs-created", JSON.stringify(consecsSaved));
});

ipcMain.on("get-consecss", async (e, arg) => {
    const consecss = await Consecs.find();
    e.reply("get-consecss", JSON.stringify(consecss));
});

ipcMain.on("delete-consecs", async (e, args) => {
    const consecsDeleted = await Consecs.findByIdAndDelete(args);
    e.reply("delete-consecs-success", JSON.stringify(consecsDeleted));
});

ipcMain.on("update-consecs", async (e, args) => {
    console.log(args);
    const updatedConsecs = await Consecs.findByIdAndUpdate(
        args.idConsecsToUpdate,
        { description: args.description, first_session: args.first_session, second_session: args.second_session},
        { new: true }
    );
    e.reply("update-consecs-success", JSON.stringify(updatedConsecs));
});






ipcMain.on("new-parallels", async (e, arg) => {
    const newParallels = new Parallels(arg);
    const parallelsSaved = await newParallels.save();
    console.log("parallelsSaved");
    console.log(parallelsSaved);
    e.reply("new-parallels-created", JSON.stringify(parallelsSaved));
});

ipcMain.on("get-parallelss", async (e, arg) => {
    const parallelss = await Parallels.find();
    e.reply("get-parallelss", JSON.stringify(parallelss));
});

ipcMain.on("delete-parallels", async (e, args) => {
    const parallelsDeleted = await Parallels.findByIdAndDelete(args);
    e.reply("delete-parallels-success", JSON.stringify(parallelsDeleted));
});

ipcMain.on("update-parallels", async (e, args) => {
    console.log(args);
    const updatedParallels = await Parallels.findByIdAndUpdate(
        args.idParallelsToUpdate,
        { description: args.description, session_1: args.session_1, session_2: args.session_2, session_3: args.session_3, session_4: args.session_4, session_5: args.session_5},
        { new: true }
    );
    e.reply("update-parallels-success", JSON.stringify(updatedParallels));
});





ipcMain.on("new-notov", async (e, arg) => {
    const newNotov = new Notov(arg);
    const notovSaved = await newNotov.save();
    console.log("notovSaved");
    console.log(notovSaved);
    e.reply("new-notov-created", JSON.stringify(notovSaved));
});

ipcMain.on("get-notovs", async (e, arg) => {
    const notovs = await Notov.find();
    e.reply("get-notovs", JSON.stringify(notovs));
});

ipcMain.on("delete-notov", async (e, args) => {
    const notovDeleted = await Notov.findByIdAndDelete(args);
    e.reply("delete-notov-success", JSON.stringify(notovDeleted));
});

ipcMain.on("update-notov", async (e, args) => {
    console.log(args);
    const updatedNotov = await Notov.findByIdAndUpdate(
        args.idNotovToUpdate,
        { description: args.description, session_1: args.session_1, session_2: args.session_2, session_3: args.session_3, session_4: args.session_4, session_5: args.session_5},
        { new: true }
    );
    e.reply("update-notov-success", JSON.stringify(updatedNotov));
});


ipcMain.on("new-notavgro", async (e, arg) => {
    const newNotavgro = new Notavgro(arg);
    const notavgroSaved = await newNotavgro.save();
    console.log("notavgroSaved");
    console.log(notavgroSaved);
    e.reply("new-notavgro-created", JSON.stringify(notavgroSaved));
});

ipcMain.on("get-notavgros", async (e, arg) => {
    const notavgros = await Notavgro.find();
    e.reply("get-notavgros", JSON.stringify(notavgros));
});

ipcMain.on("delete-notavgro", async (e, args) => {
    const notavgroDeleted = await Notavgro.findByIdAndDelete(args);
    e.reply("delete-notavgro-success", JSON.stringify(notavgroDeleted));
});

ipcMain.on("update-notavgro", async (e, args) => {
    console.log(args);
    const updatedNotavgro = await Notavgro.findByIdAndUpdate(
        args.idNotavgroToUpdate,
        { group: args.group, starting_time_hour: args.starting_time_hour, starting_time_minute: args.starting_time_minute, ending_time_hour: args.ending_time_hour, ending_time_minute: args.ending_time_minute},
        { new: true }
    );
    e.reply("update-notavgro-success", JSON.stringify(updatedNotavgro));
});








ipcMain.on("new-notavsgro", async (e, arg) => {
    const newNotavsgro = new Notavsgro(arg);
    const notavsgroSaved = await newNotavsgro.save();
    console.log("notavsgroSaved");
    console.log(notavsgroSaved);
    e.reply("new-notavsgro-created", JSON.stringify(notavsgroSaved));
});

ipcMain.on("get-notavsgros", async (e, arg) => {
    const notavsgros = await Notavsgro.find();
    e.reply("get-notavsgros", JSON.stringify(notavsgros));
});

ipcMain.on("delete-notavsgro", async (e, args) => {
    const notavsgroDeleted = await Notavsgro.findByIdAndDelete(args);
    e.reply("delete-notavsgro-success", JSON.stringify(notavsgroDeleted));
});

ipcMain.on("update-notavsgro", async (e, args) => {
    console.log(args);
    const updatedNotavsgro = await Notavsgro.findByIdAndUpdate(
        args.idNotavsgroToUpdate,
        { sub_group: args.sub_group, starting_time_hour: args.starting_time_hour, starting_time_minute: args.starting_time_minute, ending_time_hour: args.ending_time_hour, ending_time_minute: args.ending_time_minute},
        { new: true }
    );
    e.reply("update-notavsgro-success", JSON.stringify(updatedNotavsgro));
});






ipcMain.on("new-notavlec", async (e, arg) => {
    const newNotavlec = new Notavlec(arg);
    const notavlecSaved = await newNotavlec.save();
    console.log("notavlecSaved");
    console.log(notavlecSaved);
    e.reply("new-notavlec-created", JSON.stringify(notavlecSaved));
});

ipcMain.on("get-notavlecs", async (e, arg) => {
    const notavlecs = await Notavlec.find();
    e.reply("get-notavlecs", JSON.stringify(notavlecs));
});

ipcMain.on("delete-notavlec", async (e, args) => {
    const notavlecDeleted = await Notavlec.findByIdAndDelete(args);
    e.reply("delete-notavlec-success", JSON.stringify(notavlecDeleted));
});

ipcMain.on("update-notavlec", async (e, args) => {
    console.log(args);
    const updatedNotavlec = await Notavlec.findByIdAndUpdate(
        args.idNotavlecToUpdate,
        { lecturer: args.lecturer, starting_time_hour: args.starting_time_hour, starting_time_minute: args.starting_time_minute, ending_time_hour: args.ending_time_hour, ending_time_minute: args.ending_time_minute},
        { new: true }
    );
    e.reply("update-notavlec-success", JSON.stringify(updatedNotavlec));
});




ipcMain.on("new-notavses", async (e, arg) => {
    const newNotavses = new Notavses(arg);
    const notavsesSaved = await newNotavses.save();
    console.log("notavsesSaved");
    console.log(notavsesSaved);
    e.reply("new-notavses-created", JSON.stringify(notavsesSaved));
});

ipcMain.on("get-notavsess", async (e, arg) => {
    const notavsess = await Notavses.find();
    e.reply("get-notavsess", JSON.stringify(notavsess));
});

ipcMain.on("delete-notavses", async (e, args) => {
    const notavsesDeleted = await Notavses.findByIdAndDelete(args);
    e.reply("delete-notavses-success", JSON.stringify(notavsesDeleted));
});





ipcMain.on("update-notavses", async (e, args) => {
    console.log(args);
    const updatedNotavses = await Notavses.findByIdAndUpdate(
        args.idNotavsesToUpdate,
        {
            session: args.session,
            starting_time_hour: args.starting_time_hour,
            starting_time_minute: args.starting_time_minute,
            ending_time_hour: args.ending_time_hour,
            ending_time_minute: args.ending_time_minute,
        },
        { new: true }
    );
    e.reply("update-notavses-success", JSON.stringify(updatedNotavses));
});




ipcMain.on("new-workingH", async (e, arg) => {
    const newWorkingH = new WorkingH(arg);
    const workingHSaved = await newWorkingH.save();
    console.log("workingHSaved");
    console.log(workingHSaved);
    e.reply("new-workingH-created", JSON.stringify(workingHSaved));
  });

  ipcMain.on("get-workingHs", async (e, arg) => {
    const workingHs = await WorkingH.find();
    e.reply("get-workingHs", JSON.stringify(workingHs));
  });

  ipcMain.on("delete-workingH", async (e, args) => {
    const workingHDeleted = await WorkingH.findByIdAndDelete(args);
    e.reply("delete-workingH-success", JSON.stringify(workingHDeleted));
  });

  ipcMain.on("update-workingH", async (e, args) => {
    console.log(args);
    const updatedWorkingH = await WorkingH.findByIdAndUpdate(
      args.idWorkingHToUpdate,
      { hours: args.hours, minitues: args.minitues},
      { new: true }
    );
    e.reply("update-workingH-success", JSON.stringify(updatedWorkingH));
  });


ipcMain.on("new-lecturer", async (e, arg) => {
    const newLecturer = new Lecturer(arg);
    const lecturerSaved = await newLecturer.save();
    console.log("lecturerSaved");
    console.log(lecturerSaved);
    e.reply("new-lecturer-created", JSON.stringify(lecturerSaved));
  });

  ipcMain.on("get-lecturers", async (e, arg) => {
    const lecturers = await Lecturer.find();
    e.reply("get-lecturers", JSON.stringify(lecturers));
  });

  ipcMain.on("delete-lecturer", async (e, args) => {
    const lecturerDeleted = await Lecturer.findByIdAndDelete(args);
    e.reply("delete-lecturer-success", JSON.stringify(lecturerDeleted));
  });

  ipcMain.on("update-lecturer", async (e, args) => {
    console.log(args);
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      args.idLecturerToUpdate,
      { lecName: args.lecName, lecId: args.lecId, faculty: args.faculty, department: args.department, center: args.center, building: args.building, category: args.category},
      { new: true }
    );
    e.reply("update-lecturer-success", JSON.stringify(updatedLecturer));
  });


  ipcMain.on("new-tag", async (e, arg) => {
    const newTag = new Tag(arg);
    const tagSaved = await newTag.save();
    console.log("tagSaved");
    console.log(tagSaved);
    e.reply("new-tag-created", JSON.stringify(tagSaved));
  });

  ipcMain.on("get-tags", async (e, arg) => {
    const tags = await Tag.find();
    e.reply("get-tags", JSON.stringify(tags));
  });

  ipcMain.on("delete-tag", async (e, args) => {
    const tagDeleted = await Tag.findByIdAndDelete(args);
    e.reply("delete-tag-success", JSON.stringify(tagDeleted));
  });

  ipcMain.on("update-tag", async (e, args) => {
    console.log(args);
    const updatedTag = await Tag.findByIdAndUpdate(
      args.idTagToUpdate,
      { tagSelect: args.tagSelect},
      { new: true }
    );
    e.reply("update-tag-success", JSON.stringify(updatedTag));
  });



  

  ipcMain.on("new-busyTime", async (e, arg) => {
    const newBusyTime = new BusyTime(arg);
    const busyTimeSaved = await newBusyTime.save();
    console.log("busyTimeSaved");
    console.log(busyTimeSaved);
    e.reply("new-busyTime-created", JSON.stringify(busyTimeSaved));
  });
  
  ipcMain.on("get-busyTimes", async (e, arg) => {
    const busyTimes = await Task.find();
    e.reply("get-busyTimes", JSON.stringify(busyTimes));
  });
  
  ipcMain.on("delete-busyTime", async (e, args) => {
    const busyTimeDeleted = await Task.findByIdAndDelete(args);
    e.reply("delete-busyTime-success", JSON.stringify(busyTimeDeleted));
  });
  
  ipcMain.on("update-busyTime", async (e, args) => {
    console.log(args);
    const updatedBusyTime = await BusyTime.findByIdAndUpdate(
      args.idBusyTimeToUpdate,
      { room: args.room, date: args.date, startingHours: args.startingHours, startingMins: args.startingMins, endingHours: args.endingHours, endingMins: args.endingMins},
      { new: true }
    );
    e.reply("update-busyTime-success", JSON.stringify(updatedBusyTime));
  });













  ipcMain.on("new-busytime", async (e, arg) => {
    const newBusytime = new Busytime(arg);
    const busytimeSaved = await newBusytime.save();
    console.log("busytimeSaved");
    console.log(busytimeSaved);
    e.reply("new-busytime-created", JSON.stringify(busytimeSaved));
});

ipcMain.on("get-busytimes", async (e, arg) => {
    const busytimes = await Busytime.find();
    e.reply("get-busytimes", JSON.stringify(busytimes));
});

ipcMain.on("delete-busytime", async (e, args) => {
    const busytimeDeleted = await Busytime.findByIdAndDelete(args);
    e.reply("delete-busytime-success", JSON.stringify(busytimeDeleted));
});

ipcMain.on("update-busytime", async (e, args) => {
    console.log(args);
    const updatedBusytime = await Busytime.findByIdAndUpdate(
        args.idBusytimeToUpdate,
        { room: args.room, date: args.date, starting_time: args.ending_time },
        { new: true }
    );
    e.reply("update-busytime-success", JSON.stringify(updatedBusytime));
});



ipcMain.on("new-lecroomalo", async (e, arg) => {
    const newLecroomalo = new Lecroomalo(arg);
    const lecroomaloSaved = await newLecroomalo.save();
    console.log("lecroomaloSaved");
    console.log(lecroomaloSaved);
    e.reply("new-lecroomalo-created", JSON.stringify(lecroomaloSaved));
});

ipcMain.on("get-lecroomalos", async (e, arg) => {
    const lecroomalos = await Lecroomalo.find();
    e.reply("get-lecroomalos", JSON.stringify(lecroomalos));
});

ipcMain.on("delete-lecroomalo", async (e, args) => {
    const lecroomaloDeleted = await Lecroomalo.findByIdAndDelete(args);
    e.reply("delete-lecroomalo-success", JSON.stringify(lecroomaloDeleted));
});

ipcMain.on("update-lecroomalo", async (e, args) => {
    console.log(args);
    const updatedLecroomalo = await Lecroomalo.findByIdAndUpdate(
        args.idLecroomaloToUpdate,
        { lecturer: args.lecturer, room: args.room },
        { new: true }
    );
    e.reply("update-lecroomalo-success", JSON.stringify(updatedLecroomalo));
});




ipcMain.on("new-grouproomalo1", async (e, arg) => {
    const newGrouproomalo1 = new Grouproomalo1(arg);
    const grouproomalo1Saved = await newGrouproomalo1.save();
    console.log("grouproomalo1Saved");
    console.log(grouproomalo1Saved);
    e.reply("new-grouproomalo1-created", JSON.stringify(grouproomalo1Saved));
});

ipcMain.on("get-grouproomalo1s", async (e, arg) => {
    const grouproomalo1s = await Grouproomalo1.find();
    e.reply("get-grouproomalo1s", JSON.stringify(grouproomalo1s));
});

ipcMain.on("delete-grouproomalo1", async (e, args) => {
    const grouproomalo1Deleted = await Grouproomalo1.findByIdAndDelete(args);
    e.reply("delete-grouproomalo1-success", JSON.stringify(grouproomalo1Deleted));
});

ipcMain.on("update-grouproomalo1", async (e, args) => {
    console.log(args);
    const updatedGrouproomalo1 = await Grouproomalo1.findByIdAndUpdate(
        args.idGrouproomalo1ToUpdate,
        { group1: args.group1, room1: args.room1 },
        { new: true }
    );
    e.reply("update-grouproomalo1-success", JSON.stringify(updatedGrouproomalo1));
});



ipcMain.on("new-grouproomalo2", async (e, arg) => {
    const newGrouproomalo2 = new Grouproomalo2(arg);
    const grouproomalo2Saved = await newGrouproomalo2.save();
    console.log("grouproomalo2Saved");
    console.log(grouproomalo2Saved);
    e.reply("new-grouproomalo2-created", JSON.stringify(grouproomalo2Saved));
});

ipcMain.on("get-grouproomalo2s", async (e, arg) => {
    const grouproomalo2s = await Grouproomalo2.find();
    e.reply("get-grouproomalo2s", JSON.stringify(grouproomalo2s));
});

ipcMain.on("delete-grouproomalo2", async (e, args) => {
    const grouproomalo2Deleted = await Grouproomalo2.findByIdAndDelete(args);
    e.reply("delete-grouproomalo2-success", JSON.stringify(grouproomalo2Deleted));
});

ipcMain.on("update-grouproomalo2", async (e, args) => {
    console.log(args);
    const updatedGrouproomalo2 = await Grouproomalo2.findByIdAndUpdate(
        args.idGrouproomalo2ToUpdate,
        { group2: args.group2, room2: args.room2 },
        { new: true }
    );
    e.reply("update-grouproomalo2-success", JSON.stringify(updatedGrouproomalo2));
});





ipcMain.on("new-grouproomalo3", async (e, arg) => {
    const newGrouproomalo3 = new Grouproomalo3(arg);
    const grouproomalo3Saved = await newGrouproomalo3.save();
    console.log("grouproomalo3Saved");
    console.log(grouproomalo3Saved);
    e.reply("new-grouproomalo3-created", JSON.stringify(grouproomalo3Saved));
});

ipcMain.on("get-grouproomalo3s", async (e, arg) => {
    const grouproomalo3s = await Grouproomalo3.find();
    e.reply("get-grouproomalo3s", JSON.stringify(grouproomalo3s));
});

ipcMain.on("delete-grouproomalo3", async (e, args) => {
    const grouproomalo3Deleted = await Grouproomalo3.findByIdAndDelete(args);
    e.reply("delete-grouproomalo3-success", JSON.stringify(grouproomalo3Deleted));
});

ipcMain.on("update-grouproomalo3", async (e, args) => {
    console.log(args);
    const updatedGrouproomalo3 = await Grouproomalo3.findByIdAndUpdate(
        args.idGrouproomalo3ToUpdate,
        { group3: args.group3, room3: args.room3 },
        { new: true }
    );
    e.reply("update-grouproomalo3-success", JSON.stringify(updatedGrouproomalo3));
});







ipcMain.on("new-workingday", async (e, arg) => {
    const newWorkingday = new Workingday(arg);
    const workingdaySaved = await newWorkingday.save();
    console.log("workingdaySaved");
    console.log(workingdaySaved);
    e.reply("new-workingday-created", JSON.stringify(workingdaySaved));
});

ipcMain.on("get-workingdays", async (e, arg) => {
    const workingdays = await Workingday.find();
    e.reply("get-workingdays", JSON.stringify(workingdays));
});

ipcMain.on("delete-workingday", async (e, args) => {
    const workingdayDeleted = await Workingday.findByIdAndDelete(args);
    e.reply("delete-workingday-success", JSON.stringify(workingdayDeleted));
});

ipcMain.on("update-workingday", async (e, args) => {
    console.log(args);
    const updatedWorkingday = await Workingday.findByIdAndUpdate(
        args.idWorkingdayToUpdate,
        { day: args.day, monday: args.monday, tuesday: args.tuesday, wednesday: args.wednesday, thursday: args.thursday, friday: args.friday},
        { new: true }
    );
    e.reply("update-workingday-success", JSON.stringify(updatedWorkingday));
});






ipcMain.on("new-workingtime", async (e, arg) => {
    const newWorkingtime = new Workingtime(arg);
    const workingtimeSaved = await newWorkingtime.save();
    console.log("workingtimeSaved");
    console.log(workingtimeSaved);
    e.reply("new-workingtime-created", JSON.stringify(workingtimeSaved));
});

ipcMain.on("get-workingtimes", async (e, arg) => {
    const workingtimes = await Workingtime.find();
    e.reply("get-workingtimes", JSON.stringify(workingtimes));
});

ipcMain.on("delete-workingtime", async (e, args) => {
    const workingtimeDeleted = await Workingtime.findByIdAndDelete(args);
    e.reply("delete-workingtime-success", JSON.stringify(workingtimeDeleted));
});

ipcMain.on("update-workingtime", async (e, args) => {
    console.log(args);
    const updatedWorkingtime = await Workingtime.findByIdAndUpdate(
        args.idWorkingtimeToUpdate,
        { hour: args.hour, minute: args.minute },
        { new: true }
    );
    e.reply("update-workingtime-success", JSON.stringify(updatedWorkingtime));
});












module.exports = { createWindow };
