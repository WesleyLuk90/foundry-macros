let actor = game.actors.find((f) => f.data.name == "Marcus Tyne");

actor
    .update({ "flags.dnd5e.reliableTalent": true })
    .then(() => BetterRolls.rollSkill(actor, "prc"))
    .then(() => actor.update({ "flags.dnd5e.reliableTalent": false }));
