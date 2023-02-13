class Card {
	constructor(id, cardTypeId, skin, table) {
		this.id = id;
		this.cardTypeId = cardTypeId;
		this.skin = skin;

		this.table = table;
		this.owner = null;
	}

	baseUseAction(playerName) {
		this.table.setUsedCard(this);
		this.changeOwner(null);
	}

	changeOwner(playerName) {
		if(this.owner) {
			this.table.getPlayerByName(this.owner).removeCardById(this.id);
		}

		this.owner = playerName;
		this.table.getPlayerByName(this.owner).addCard(this);
	}

	baseTakeFromDeckEvent(playerName) {
		
	}
}

exports.Card = Card;