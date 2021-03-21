function description(attackMod, damageMod) {
    let actor = game.actors.find((a) => a.data.name == "Marcus Tyne");
    let weaponDamage = (25 / 6) * 2;
    let damage =
        weaponDamage + actor.data.data.abilities.str.mod + damageMod + 1;
    let attack =
        actor.data.data.abilities.str.mod +
        actor.data.data.attributes.prof +
        attackMod +
        1;

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
<div>Attack +${Math.round(attack * 10) / 10}</div>
<div>Damage +${Math.round(damage * 10) / 10}</div>
<div>Normal &lt ${normal(damage, attack)} AC</div>
<div>Advantage &lt ${advantage(damage, attack)} AC</div>
<div>Disadvantage &lt ${disadvantage(damage, attack)} AC</div>
`;
}

const RegulardSword = "icons/weapons/polearms/halberd-crescent-glowing.webp";
const SpecialSword = "icons/weapons/polearms/halberd-crescent-glowing.webp";

function title(gwm) {
    return `<div class="dnd5e chat-card item-card">
	<header class="card-header flexrow red-header">
		<img src="${
            gwm ? SpecialSword : RegulardSword
        }" title="Halberd" width="36" height="36"/>
		<h3 class="item-name">Halberd${gwm ? " - GWM" : ""}</h3>
	</header>
<div>`;
}

function doRoll(gwm) {
    let actor = game.actors.get("PKy1niGw3o9BIqPN");
    let item = actor.getOwnedItem("AbJ2pRv4XNOv4LAm");
    BetterRolls.rollItem(
        item,
        { event: new KeyboardEvent(""), title: title(gwm) },
        [
            ["attack", { bonus: gwm ? -4 : 1 }],
            ["damage", { index: gwm ? 1 : 0 }],
        ]
    ).toMessage();
}
new Dialog({
    title: "Select Great Weapon Mastery",
    content: `
    <form>
    <div class="form-group">
        <label>Bonus Attack</label>
        <div class="form-control">
            <input type="number" class="attack" value="0" />
        </div>
    </div>
    <div class="form-group">
        <label>Bonus Damage</label>
        <div class="form-control">
            <input type="number" class="damage" value="0" />
        </div>
    </div>
    <div class="description">${description(0, 0)}</div>
</form>
`,
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
    render: (html) => {
        function render() {
            html.find(".description").html(
                description(
                    parseFloat(html.find(".attack").val()),
                    parseFloat(html.find(".damage").val())
                )
            );
        }
        html.find(".attack").change(render);
        html.find(".damage").change(render);
    },
}).render(true);