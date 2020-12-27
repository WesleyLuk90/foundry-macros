function getImage(actor) {
    const actorImage =
        actor.data.img &&
        actor.data.img !== DEFAULT_TOKEN &&
        !actor.data.img.includes("*")
            ? actor.data.img
            : false;
    const tokenImage = actor.token?.data?.img
        ? actor.token.data.img
        : actor.data.token.img;

    switch (game.settings.get("betterrolls5e", "defaultRollArt")) {
        case "actor":
            return actorImage || tokenImage;
        case "token":
            return tokenImage || actorImage;
    }
}
function getWhisperData() {
    let rollMode = null;
    let whisper = undefined;
    let blind = null;

    rollMode = game.settings.get("core", "rollMode");
    if (["gmroll", "blindroll"].includes(rollMode))
        whisper = ChatMessage.getWhisperRecipients("GM");
    if (rollMode === "blindroll") blind = true;
    else if (rollMode === "selfroll") whisper = [game.user._id];

    return { rollMode, whisper, blind };
}
function getDiceSound(hasMaestroSound = false) {
    const has3DDiceSound = game.dice3d
        ? game.settings.get("dice-so-nice", "settings").enabled
        : false;
    const playRollSounds = game.settings.get("betterrolls5e", "playRollSounds");

    if (playRollSounds && !has3DDiceSound && !hasMaestroSound) {
        return CONFIG.sounds.dice;
    }

    return null;
}
const blankRoll = new Roll("0").roll(); // Used for CHAT_MESSAGE_TYPES.ROLL, which requires a roll that Better Rolls otherwise does not need

(async () => {
    let ability = "con";
    let params = {};
    let multiRoll = await BetterRolls.rollSavingThrow(actor, ability, params);
    let titleString = `Concentration Save`;

    const titleTemplate = await renderTemplate(
        "modules/betterrolls5e/templates/red-header.html",
        {
            item: {
                img: getImage(actor),
                name: titleString,
            },
        }
    );

    const content = await renderTemplate(
        "modules/betterrolls5e/templates/red-fullroll.html",
        {
            title: titleTemplate,
            templates: [multiRoll],
            info:
                "The DC equals 10 or half the damage you take, whichever number is higher.",
        }
    );

    const chatData = {
        user: game.user._id,
        content: content,
        speaker: {
            actor: actor._id,
            token: actor.token,
            alias: actor.token?.name || actor.name,
        },
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        roll: blankRoll,
        ...getWhisperData(),
        sound: getDiceSound(),
    };

    return await ChatMessage.create(chatData);
})();
