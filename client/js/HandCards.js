class HandCards {
	constructor(app) {
		this.app = app;
		this.container = document.querySelector(this.app.config.handCardsContainer);

		this.renderingInterval = setInterval(() => {
			this.render();
		}, this.app.config.renderInterval);
	}

	render() {
		const cards = this.app.dataProvider.data.table.currentPlayer.cards;

		let html = ``;
		for(let card of cards) {
			html += `
				<div class="card">
			    <div class="card-skin card-skin-${card.skin}"></div>
			  </div>
			`;
		}

		this.container.innerHTML = html;
		this.postRender();
	}

	postRender() {

	}
}