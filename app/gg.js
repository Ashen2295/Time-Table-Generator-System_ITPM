
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
        { name: args.name, description: args.description, note: args.note },
        { new: true }
    );
    e.reply("update-workingtime-success", JSON.stringify(updatedWorkingtime));
});
