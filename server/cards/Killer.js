const { Card } = require("../classes/Card");

class Killer extends Card {
	constructor(id, table) {
		super(id, "Killer", "killer", table);
	}

	action(playerName) {
		this.baseUseAction(playerName);
	}

	takeFromDeckEvent(playerName) {
		this.baseTakeFromDeckEvent(playerName);
		this.table.getPlayerByName(playerName).kill();
	}
}

exports.Killer = Killer;