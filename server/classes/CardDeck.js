const { cards } = require("../cards");
const { config } = require("../config");

class CardDeck {
	constructor(table) {
		this.table = table;
		this.init();
	}

	init() {
		console.log("Card Deck init");
		this.cards = [];
		for(let i=this.cards.length; i<config.startedDeckCards; i++) {
			this.cards.push(new cards.Regular(i, this.table));
		}
	}

	getLastCard() {
		if(!this.getTotalCards) {
			return null;
		}

		const card = this.cards.shift();
		card.takeFromDeckEvent();
		return card;
	}

	getTotalCards() {
		return this.cards.length;
	}
}

exports.CardDeck = CardDeck;