function doRoll(undead, crit) {
    let actor = game.actors.get("PKy1niGw3o9BIqPN");
    let item = actor.getOwnedItem("C2ZGC4CNMumm33pp");
    BetterRolls.rollItem(item, { event: new KeyboardEvent(""), preset: 0 }, [
        ["damage", { crit, index: undead ? 1 : 0 }],
    ]).toMessage();
}
let d = new Dialog({
    title: "Smite Type",
    buttons: {
        normal: {
            label: "Normal",
            callback: () => doRoll(false, false),
        },
        crit: {
            label: "Critical",
            callback: () => doRoll(false, true),
        },
        undead: {
            label: "vs Undead/Fiend",
            callback: () => doRoll(true, false),
        },
        undeadCrit: {
            label: "Critical vs Undead/Fiend",
            callback: () => doRoll(true, true),
        },
    },
});
d.render(true);