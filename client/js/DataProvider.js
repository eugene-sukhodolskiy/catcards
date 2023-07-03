class DataProvider {
	constructor(app) {
		this.app = app;
		this.url = `/all?name=${this.app.name}`;
		this.data = {};

		this.request();

		setInterval(() => {
			this.request();
		}, 1000);
	}

	request() {
		fetch(this.url)
			.then(resp => resp.json())
			.then(data => {
				this.data = data.result;
			})
			.catch(err => {
				console.error("DataProvider request error.", err);
			});
	}
}