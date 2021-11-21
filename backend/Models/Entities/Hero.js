const Entity = require("./Entity");

const CriticalStrikeSkill = require('../Skills/CriticalStrikeSkill')

class Hero extends Entity {

	constructor(name, log) {
		super(
			{
				health: {
					min:70,
					max:100,
				},
				strength: {
					min:70,
					max:80,
				},
				defence: {
					min:45,
					max:55,
				},
				speed: {
					min:40,
					max:50,
				},
				luck: {
					min:10,
					max:30,
				},
			},
			{
				'beforeAttack': [CriticalStrikeSkill],
				'beforeDamage':[],
			},
			log, name);
	}
}

module.exports = Hero;