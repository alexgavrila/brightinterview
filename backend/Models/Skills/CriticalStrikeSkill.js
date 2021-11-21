const Skill = require('./Skill');

class CriticalStrikeSkill extends Skill {
	static apply(damage, log) {
		let numberOfStrikes = 0;
		// 10% chance
		if(Math.random() <= 0.1) {
			damage += damage;
			numberOfStrikes++;
			// 1% chance
			if(Math.random()<=0.01) {
				numberOfStrikes++;
				damage += damage;
			}
		}

		if(numberOfStrikes > 0) {
			log.publish(`${this.name} was used ${numberOfStrikes} time(s)`);
		}

		return damage;
	}
}

module.exports = CriticalStrikeSkill;