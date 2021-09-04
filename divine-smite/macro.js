function doRoll(undead, crit, level) {
    let actor = game.actors.get("PKy1niGw3o9BIqPN");
    let item = actor.getOwnedItem("C2ZGC4CNMumm33pp");
    let index = 0;
    console.log(undead, crit, level);
    if(level == 1) {
        if(!undead){
            index = 0;
        } else {
            index = 1;
        }
    } else {
        if(!undead){
            index = 2;
        } else {
            index = 3;
        }
    }
    BetterRolls.rollItem(item, { event: new KeyboardEvent(""), preset: 0 }, [
        ["damage", { crit, index }],
    ]).toMessage();
}
function selectHitType(){
    let d = new Dialog({
        title: "Fiend/Undead or Other",
        buttons: {
            1: {
                label: "Other",
                callback: () => selectCrit(false),
            },
            2: {
                label: "Fiend/Undead",
                callback: () => selectCrit(true),
            },
        },
    });
    d.render(true);
}
function selectCrit(vsFiend){
    let d = new Dialog({
        title: "Is Crit?",
        buttons: {
            1: {
                label: "Normal",
                callback: () => selectLevel(vsFiend, false),
            },
            2: {
                label: "Critical",
                callback: () => selectLevel(vsFiend, true),
            },
        },
    });
    d.render(true);
}
function selectLevel(vsFiend, isCrit){
    let d = new Dialog({
        title: "Level",
        buttons: {
            1: {
                label: "1",
                callback: () => doRoll(vsFiend, isCrit, 1),
            },
            2: {
                label: "2",
                callback: () => doRoll(vsFiend, isCrit, 2),
            },
        },
    });
    d.render(true);
}
selectHitType();