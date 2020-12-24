const checks = [
    { type: "save", id: "str", label: "Strength Save" },
    { type: "save", id: "dex", label: "Dexterity Save" },
    { type: "save", id: "con", label: "Constitution Save" },
    { type: "save", id: "int", label: "Intelligence Save" },
    { type: "save", id: "wis", label: "Wisdom Save" },
    { type: "save", id: "cha", label: "Charisma Save" },

    { type: "check", id: "acr", label: "Acrobatics Check" },
    { type: "check", id: "ani", label: "Animal Handling Check" },
    { type: "check", id: "arc", label: "Arcana Check" },
    { type: "check", id: "ath", label: "Athletics Check" },
    { type: "check", id: "dec", label: "Deception Check" },
    { type: "check", id: "his", label: "History Check" },
    { type: "check", id: "ins", label: "Insight Check" },
    { type: "check", id: "itm", label: "Intimidation Check" },
    { type: "check", id: "inv", label: "Investigation Check" },
    { type: "check", id: "med", label: "Medicine Check" },
    { type: "check", id: "nat", label: "Nature Check" },
    { type: "check", id: "prc", label: "Perception Check" },
    { type: "check", id: "prf", label: "Performance Check" },
    { type: "check", id: "per", label: "Persuasion Check" },
    { type: "check", id: "rel", label: "Religion Check" },
    { type: "check", id: "slt", label: "Sleight of Hand Check" },
    { type: "check", id: "ste", label: "Stealth Check" },
    { type: "check", id: "sur", label: "Survival Check" },
];

let selected = checks[0];

new Dialog({
    title: "Prompt for Check",
    content: `
<form>
    <div class="form-group">
        <label>Check or Save</label>
        <select></select>
    </div>
</form>`,
    buttons: {
        ok: {
            label: "Ok",
            callback: () => {
                if (selected != null) {
                    createMacro(selected);
                }
            },
        },
    },
    render: (html) => {
        let select = html.find("select");
        checks.forEach((check) =>
            select.append(`<option value="${check.id}">${check.label}</option>`)
        );
        select.change(() => {
            selected = checks.find((c) => c.id === select.val());
        });
    },
}).render(true);

const MacroName = "RollCheck";

async function createMacro(check) {
    let existingMacro = game.macros.find((m) => m.name === MacroName);
    if (existingMacro == null) {
        existingMacro = await Macro.create({
            name: MacroName,
            type: "script",
        });
    }
    if (check.type == "save") {
        await existingMacro.update({
            command: `BetterRolls.rollSave(actor, '${check.id}')`,
            "permission.default": 2,
        });
    } else {
        await existingMacro.update({
            command: `BetterRolls.rollSkill(actor, '${check.id}')`,
            "permission.default": 2,
        });
    }
    await ChatMessage.create({
        user: game.userId,
        content: `Roll a ${check.label} @Macro[RollCheck]`,
    });
}
