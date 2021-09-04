function doRoll(undead, crit, level) {
    let actor = game.actors.get("PKy1niGw3o9BIqPN");
    let item = actor.getOwnedItem("C2ZGC4CNMumm33pp");
    let index = 0;
    if(level == 1) {
        if(undead){
            index = 0;
        } else {
            index = 1;
        }
    } else {
        if(undead){
            index = 2;
        } else {
            index = 3;
        }
    }
    BetterRolls.rollItem(item, { event: new KeyboardEvent(""), preset: 0 }, [
        ["damage", { crit, index }],
    ]).toMessage();
}
let d = new Dialog({
    title: "Smite Type",
    buttons: {
        normal: {
            label: "Normal",
            callback: () => doRoll(false, false, 1),
        },
        crit: {
            label: "Critical",
            callback: () => doRoll(false, true, 1),
        },
        undead: {
            label: "vs Undead/Fiend",
            callback: () => doRoll(true, false, 1),
        },
        undeadCrit: {
            label: "Critical vs Undead/Fiend",
            callback: () => doRoll(true, true, 1),
        },
        normal2: {
            label: "Normal 2",
            callback: () => doRoll(false, false, 2),
        },
        crit2: {
            label: "Critical 2",
            callback: () => doRoll(false, true, 2),
        },
        undead2: {
            label: "2 vs Undead/Fiend",
            callback: () => doRoll(true, false, 2),
        },
        undeadCrit2: {
            label: "Critical 2 vs Undead/Fiend",
            callback: () => doRoll(true, true, 2),
        },
    },
});
d.render(true);