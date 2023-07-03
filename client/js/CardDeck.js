class CardDeck {
	constructor(app) {
		this.app = app;
		this.renderContainer = document.querySelector(this.app.config.cardDeckContainer);
		this.deckRenderContainer = this.renderContainer.querySelector(".card-stack");
		this.counterRenderContainer = this.renderContainer.querySelector(".total-cards");
		
		this.renderingInterval = setInterval(() => {
			this.render();
		}, this.app.config.renderInterval);
	}

	render() {
		const cardsCounter = this.app.dataProvider.data.table.cardDeck.countCards;

		let html = ``;
		let translateZ = 0;
		let translateX = 0;
		let translateY = 0;
		let step = cardsCounter > 30 ? 1 : (cardsCounter > 10 ? 2 : 3);
		for(let i=0; i<cardsCounter; i++) {
			translateZ -= step;
			translateX += step;
			translateY += step;
			html += `<div class="card" style="transform: translateZ(${translateZ}px) translateX(${translateX}px) translateY(${translateY}px)">Карточка ${i}</div>`
		}

		this.deckRenderContainer.innerHTML = html;
		this.counterRenderContainer.innerHTML = `Осталось карт: ${cardsCounter}`;

		this.postRender();
	}

	postRender() {
		
	}
}