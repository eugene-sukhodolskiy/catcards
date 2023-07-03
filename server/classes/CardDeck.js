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
		for(let i=this.cards.length; i<config.deck.amountRegulars; i++) {
			this.cards.push(new cards.Regular(i, this.table));
		}

		this.shuffleCards();
	}

	initSpecialCards() {
		for(let i=this.cards.length; i<config.deck.amountKillers; i++) {
			this.cards.push(new cards.Killer(i, this.table));
		}
	}

	shuffleCards() {
		this.cards.sort(() => Math.random() - 0.5);
	}

	getLastCard() {
		if(!this.getTotalCards) {
			return null;
		}

		const card = this.cards.shift();
		if(card.takeFromDeckEvent) {
			card.takeFromDeckEvent();
		}
		return card;
	}

	getTotalCards() {
		return this.cards.length;
	}
}

exports.CardDeck = CardDeck;