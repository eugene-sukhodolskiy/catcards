class Player {
	constructor(name, table) {
		this.name = name;
		this.table = table;
		this.status = "live";
		this.lastActivity = (new Date()).getTime();
		this.cards = [];

		console.log(`Registered new player @${name}`);
	}

	getCards() {
		return this.cards;
	}

	addCard(card) {
		if(!card) {
			return false;
		}

		card.owner = this.name;
		this.cards.push(card);
		return card;
	}

	hasCard(cardTypeId) {
		for(let card of this.cards) {
			if(card.cardTypeId == cardTypeId) {
				return true;
			}
		}

		return false;
	}

	removeCardById(cardId) {
		for(let i in this.cards) {
			if(this.card[i].id == cardId) {
				delete this.card[i];
				return true;
			}
		}

		return false;
	}

	takeCardFromDeck() {
		this.addCard(this.table.cardDeck.getLastCard());
		
		if(this.table.isPlaying()) {
			this.table.nextMove();
		}
	}

	kill() {
		this.status = "kill";
		this.table.addEvent(this.name, "death");
	}
}

exports.createPlayer = (name, table) => new Player(name, table);