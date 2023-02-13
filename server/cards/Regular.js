const { Card } = require("../classes/Card");

class Regular extends Card {
	constructor(id, table) {
		super(id, "Regular", "regular", table);
	}

	action(playerName) {
		this.baseUseAction(playerName);
	}
}

exports.Regular = Regular;