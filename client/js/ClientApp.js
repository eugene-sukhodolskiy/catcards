class ClientApp {
	constructor() {
		console.log("Start App");

		// props
		this.config = {
			userListContainer: ".player-list",
			handCardsContainer: ".card-list",
			userBarContainer: ".user-bar",
			cardDeckContainer: ".card-deck",
			renderInterval: 500
		};

		this.name = localStorage.getItem("name");


		document.querySelector("#login-form").addEventListener("submit", e => {
			e.preventDefault();
			const name = e.currentTarget.querySelector(`[name="name"]`).value;
			const action = e.currentTarget.getAttribute("action");
			const url = `${action}?name=${encodeURIComponent(name)}`;

			fetch(url)
			  .then(response => {
			    if (!response.ok) {
			      throw new Error('Network response was not ok');
			    }
			    return response.json();
			  })
			  .then(data => {
			    console.log(data.result);

			    document.querySelector("#login-form-popup").classList.remove("show");
			    localStorage.setItem("name", data.result);
			    this.name = data.result;
			    this.gameInputPoint();
			  })
			  .catch(error => {
			    console.error('There was a problem with the fetch operation:', error);
			  });

		});

			// document.querySelector("#login-form-popup").classList.add("show");
		if(!this.name) {
			document.querySelector("#login-form-popup").classList.add("show");
		} else {
	    this.gameInputPoint();	
		}
	}

	gameInputPoint() {
		this.dataProvider = new DataProvider(this);
		this.playerList = new PlayerList(this);
		this.handCards = new HandCards(this);
		this.userBar = new UserBar(this);
		this.cardDeck = new CardDeck(this);
	}

	stopRendering() {
		clearInterval(this.playerList.renderingInterval);
		clearInterval(this.handCards.renderingInterval);
		clearInterval(this.userBar.renderingInterval);
		clearInterval(this.cardDeck.renderingInterval);
	}
}

document.addEventListener("DOMContentLoaded", e => {
	window.app = new ClientApp();
});