class Entity {
	#ranges = {};

	#name;

	#stats = {
		health: 0,
		strength: 0,
		defence: 0,
		speed: 0,
		luck: 0,
	};

	#skills = {
		'beforeAttack': [],
		'beforeDamage': [],
	};

	#log;

	constructor(ranges, skills, log, name) {
		this.#ranges = ranges;
		this.#log = log;
		this.#name = name;
		this.#skills = skills;

		this.#initEntity();
	}

	#initEntity() {
		Object.entries(this.#ranges).forEach((stat) => {
			let [ key, { min, max } ] = stat;

			this.#stats[key] = Math.floor(Math.random() * (max - min) + min)
		});
	}

	attack(target) {
		if(!target) {
			return;
		}
		const {beforeAttack} = this.#skills;

		let damage = this.#stats.strength - target.#stats.defence;

		beforeAttack.forEach((skill)=> {
			damage = skill.apply(damage,this.#log);
		})

		this.#log.publish(`${this.#name} dealt ${damage} damage`);
		target.takeDamage(damage);
	}

	takeDamage(damage) {
		const {beforeDamage} = this.#skills;

		beforeDamage.reduce((damage, skill)=> {
			return damage -= skill.apply(damage);
		},damage)

		this.#log.publish(`${this.#name} took ${damage} damage`);
		this.#stats.health -= damage;
	}

	get stats() {
		return this.#stats;
	}

	get name() {
		return this.#name;
	}

	toJSON() {
		return {
			stats: this.#stats,
			name: this.#name
		}
	}
}

module.exports = Entity;