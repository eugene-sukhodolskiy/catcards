class PlayerList {
	constructor(app) {
		this.app = app;
		this.renderContainer = document.querySelector(this.app.config.userListContainer);
		
		this.renderingInterval = setInterval(() => {
			this.render();
		}, this.app.config.renderInterval);
	}

	render() {
		const players = this.app.dataProvider.data.table.players;

		let html = ``;
		for(let player of players) {
			html += `
				<div class="player-item">
					<div class="player-avatar">
						${player.name.charAt(0)}
						<div class="player-counter">${player.countCards}</div>
					</div>
					<div class="player-name">${player.name}</div>
				</div>
			`;
		}

		this.renderContainer.innerHTML = html;
		this.postRender();
	}

	postRender() {

	}
}