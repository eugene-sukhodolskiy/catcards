const { CardDeck } = require("./CardDeck");
const { createPlayer } = require("./Player");

class Table {
	constructor(app) {
		this.app = app;
		this.init();
	}

	init() {
		this.status = "waiting";
		this.players = [];
		this.cardDeck = new CardDeck(this);
		this.usedCards = [];
		this.events = [];
		this.activePlayerName = null;
	}

	regNewUser(name) {
		if(this.status != "waiting") {
			return false;
		}

		for(let player of this.players) {
			if(player.name == name) {
				console.log(`Player with name @${name} already exists`);
				return false;
			}
		}

		this.players.push(createPlayer(name, this));
		const player = this.getPlayerByName(name);
		for(let i=0; i<this.app.config.startedPlayerCardsPack; i++) {
			player.takeCardFromDeck();
		}

		if(!this.activePlayerName) {
			this.activePlayerName = name;
		}

		return name;
	}

	isPlaying() {
		return this.status == "runing";
	}

	getPlayers() {
		return this.players;
	}

	getPlayerByName(name) {
		let pl = this.players.filter(player => player.name == name);
		return pl.length ? pl[0] : null;
	}

	startGame() {
		this.status = "runing";
		this.cardsDeck.initSpecialCards();
		this.shuffleCards();
	}

	stopGame() {
		this.init();
	}

	getUsedCards() {
		return this.usedCards;
	}

	setUsedCard(card) {
		this.usedCards.push(card);
	}

	addEvent(playerName, eventName) {
		this.events.push({
			player: playerName,
			event: eventName
		});
	}

	getEventsList() {
		const events = this.events;
		this.events = [];
		return events;
	}

	nextMove() {
		let inx = this.players.map(pl => pl.name).indexOf(this.activePlayerName);
		inx++;
		if(inx > this.players.length - 1) {
			inx = 0;
		} else if(inx < 0) {
			inx = this.players.length - 1;
		}

		this.activePlayerName = this.players[inx].name;
	}
}

exports.Table = Table;