class Log {
	#messages = [];
	constructor() {	}

	publish(message) {
		this.#messages.push(message);
	}

	get messages() {
		return this.#messages;
	}

	clearMessages() {
		this.#messages = [];
	}
}

module.exports = Log;