const force = 2981

const speed = 12

const defense = 879

const Ippo = {
    name: "Ippo",
    defense: defense,
    stamina: 39898,
    force: force,
    speed: speed,
}

const Challenger = {
    name: "Challenger",
    defense: defense,
    stamina: 39898,
    force: force,
    speed: speed
}


const round = (nbRound, fighter1, fighter2) => {
    const destruct = specialAttack(fighter1.defense, fighter2.force)
    console.log(`Round ${nbRound} ! ${fighter1.name} attaque ${fighter2.name}:`)
    console.log(`${destruct} points en moins pour ${fighter1.name}.`)
    console.log(`Points de vie restants : ${fighter1.stamina}`)
}

function attack(defense, force) {
    return defense - force
}

function specialAttack(defense, force) {
    const surForce = force * 2
    return defense - (surForce)
}

round(1, Ippo, Challenger)