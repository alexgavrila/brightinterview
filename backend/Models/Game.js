const Hero = require('./Entities/Hero');
const Enemy = require('./Entities/Enemy');
const Log = require('../Logger');

class Game {
	#player;
	#enemy;
	#turn = 0;
	#logger

	// true if player, false if enemy
	#toAttack;
	constructor() {
		this.#logger = new Log();

		this.#player = new Hero('Gigel', this.#logger);
		this.#enemy = new Enemy('Villan', this.#logger);

		this.#toAttack = this.#computeWhoToStart();
	}

	nextRound() {
		this.#logger.clearMessages();

		this.#logger.publish(`Turn #${this.#turn+1}`);
		if(this.#toAttack) {
			this.#logger.publish(`${this.#player.name} to attack.`);
			this.#player.attack(this.#enemy);
		} else {
			this.#logger.publish(`${this.#enemy.name} to attack.`);
			this.#enemy.attack(this.#player);
		}

		this.#turn++;
		this.#toAttack = !this.#toAttack

		return {
			log:this.#logger.messages,
			player:this.#player,
			enemy:this.#enemy,
			turn:this.#turn,
			won:this.#checkEndGame(),
		};
	}

	#computeWhoToStart() {
		const playerStats = this.#player.stats;
		const enemyStats = this.#enemy.stats;

		if(playerStats.speed>enemyStats.speed) {
			return true;
		} else if(playerStats.speed<enemyStats.speed) {
			return false;
		} else if(playerStats.luck>enemyStats.luck) {
			return true;
		} else {
			return false;
		}
	}

	/*
		0-not ended
		1-turn limit reached
		2-enemy won
		3-player own
	*/
	#checkEndGame() {
		const playerStats = this.#player.stats;
		const enemyStats = this.#enemy.stats;

		if(this.#turn < 20) {
			if(playerStats.health<=0) {
				return 2;
			} else if(enemyStats.health<=0) {
				return 3;
			}
		} else {
			return 1;
		}

		return 0;
	}

}

module.exports = Game;