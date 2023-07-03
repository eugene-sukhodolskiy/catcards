class UserBar {
	constructor(app) {
		this.app = app;
		this.container = document.querySelector(this.app.config.userBarContainer);
		this.nameContainer = this.container.querySelector(".name");
		this.totalCardsContainer = this.container.querySelector(".total-cards");

		this.renderingInterval = setInterval(() => {
			this.render();
		}, this.app.config.renderInterval);
	}

	render() {
		const totalCards = this.app.dataProvider.data.table.currentPlayer.cards.length;
		const name = this.app.name;

		this.nameContainer.innerHTML = name;
		this.totalCardsContainer.innerHTML = `Всего карт ${totalCards}`;
	}

	postRender() {

	}
}