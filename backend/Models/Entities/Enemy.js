const Entity = require("./Entity");

const ranges = {
	health: {
		min:60,
		max:90,
	},
	strength: {
		min:60,
		max:90,
	},
	defence: {
		min:40,
		max:60,
	},
	speed: {
		min:40,
		max:60,
	},
	luck: {
		min:25,
		max:40,
	},
}

class Enemy extends Entity {

	constructor(name, log) {
		super(
			{
				health: {
					min:60,
					max:90,
				},
				strength: {
					min:60,
					max:90,
				},
				defence: {
					min:40,
					max:60,
				},
				speed: {
					min:40,
					max:60,
				},
				luck: {
					min:25,
					max:40,
				},
			},
			{
				'beforeAttack':[],
				'beforeDamage':[],
			},
			log, name);
	}
}

module.exports = Enemy;