function description() {
    let actor = game.actors.find((a) => a.data.name == "Marcus Tyne");
    let weaponDamage = (25 / 6) * 2;
    let damage = weaponDamage + actor.data.data.abilities.str.mod + 1;
    let attack =
        actor.data.data.abilities.str.mod + actor.data.data.attributes.prof + 1;

    function disadvantage(d, t) {
        return Math.ceil(16 + t - d / 2 - (1 / 2) * Math.sqrt(d * (d + 10)));
    }
    function advantage(d, t) {
        return Math.ceil(
            (1 / 2) * (Math.sqrt(d * d + 10 * d + 1600) - d + 2 * t - 8)
        );
    }
    function normal(d, t) {
        return Math.ceil(16 + t - d / 2);
    }

    return `
<div>Damage +${Math.round(damage * 10) / 10}</div>
<div>Attack +${Math.round(attack * 10) / 10}</div>
<div>Normal &lt ${normal(damage, attack)} AC</div>
<div>Advantage &lt ${advantage(damage, attack)} AC</div>
<div>Disadvantage &lt ${disadvantage(damage, attack)} AC</div>
`;
}

const RegulardSword = "systems/dnd5e/icons/items/weapons/sword-great.jpg";
const SpecialSword = "systems/dnd5e/icons/items/weapons/sword-arcane.jpg";

function title(gwm) {
    return `<div class="dnd5e chat-card item-card">
	<header class="card-header flexrow red-header">
		<img src="${
            gwm ? SpecialSword : RegulardSword
        }" title="Greatsword" width="36" height="36"/>
		<h3 class="item-name">Greatsword${gwm ? " - GWM" : ""}</h3>
	</header>
<div>`;
}

function doRoll(gwm) {
    let actor = game.actors.get("PKy1niGw3o9BIqPN");
    let item = actor.getOwnedItem("22FMnk1BulE4Ev4R");
    BetterRolls.rollItem(
        item,
        { event: new KeyboardEvent(""), title: title(gwm) },
        [
            ["attack", { bonus: gwm ? -5 : 0 }],
            ["damage", { index: gwm ? 1 : 0 }],
        ]
    ).toMessage();
}
new Dialog({
    title: "Select Great Weapon Mastery",
    content: description(),
    buttons: {
        normal: {
            label: "Normal",
            callback: () => doRoll(false),
        },
        gwm: {
            label: "+GWM",
            callback: () => doRoll(true),
        },
    },
}).render(true);
