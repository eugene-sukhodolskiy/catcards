const path = require('path');
const express = require("express");
const { config } = require("./config");
const { Table } = require("./classes/Table");

class ServerApp {
	constructor(port) {
		this.port = port;
		this.config = config;

		this.init();
	}

	init() {
		this.app = express();
		this.app.use("/client", express.static(path.join(__dirname, "../client/")));
		this.app.set("views", path.join(__dirname, "../client/view/"));
		this.app.set("view engine", "pug");
		this.table = new Table(this);

		this.routes();

		this.app.listen(this.port, () => {
			console.log("Init server on port " + this.port);
		});		
	}

	routes() {
		this.app.get("/", (req, res) => {
			res.render("pages/index", { 
				title: "Hello there!", 
			});
		});

		this.app.get("/table/take-card", (req, res) => {
			let result = false;

			if(req.query.name && req.query.name.length) {
				const player = this.table.getPlayerByName(req.query.name);
				player.takeCardFromDeck();
				result = true;
			} else {
				console.log("Error of username");
			}

			res.send(JSON.stringify({
				result: result
			}));
		});

		this.app.get("/player/new", (req, res) => {
			let result = false;

			if(req.query.name && req.query.name.length) {
				result = this.table.regNewUser(req.query.name);
			} else {
				console.log("Error of username");
			}

			res.send(JSON.stringify({
				result: result
			}));
		});

		this.app.get("/all", (req, res) => {
			const currentPlayer = this.table.getPlayerByName(req.query.name);
			const players = this.table.getPlayers().map(player => {
				return {
					name: player.name,
					status: player.status,
					countCards: player.getCards().length,
				}
			});

			const cards = currentPlayer.getCards().map(card => {
				return {
					id: card.id,
					skin: card.skin,
					cardTypeId: card.cardTypeId
				};
			});

			res.send(JSON.stringify({
				result: {
					table: {
						status: this.table.status,
						players: players,
						currentPlayer: {
							name: currentPlayer.name,
							cards: cards
						},
						cardDeck: {
							countCards: this.table.cardDeck.getTotalCards()
						},
						events: this.table.getEventsList()
					},
				}
			}))
		});
	}
}

exports.createServer = port => new ServerApp(port);