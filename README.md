Rules of the game:

Three actors:
1) Ship
2) Pilot
3) Engineer

The ship has 3 systems:
1) Shields
2) Weapons
3) Engines

The strength of the shield, weapons, and engines is determined by the amount of
power assigned to them.
The ship has a finite amount of power available.

The game presently consists of only combat.
Once all of the users connect, a battle will occur.
The winner is announced, and everything disconnects.

# combat
Combat is turn based.
The pilot and engineer build a queue of moves, then submit them to the game engine.

The moves for the human players are executed, then the moves for the opposing
player is executed.

The engineers moves are all of the form "allocate power to X".

The pilot can make 2 moves:
1) fire weapons
2) Evade

Both of these actions occur on the next turn.
When the pilot fires weapons, they will be fired with the amount of power they
have relative to their position in the queue.
If a pilot chooses to evade, their evade multiplier will be increased during the enemy's next turn.

There are 5 slots in the queue for each turn.

For example, a valid queue may contain:
0% power to shields, 100% power to weapons, fire weapons, 50% to shields, evade

## the ship
The ship has 100 units of power and 100 units of health.

## weapons
Weapons always hit their target, unless they are evaded.
If they are evaded, they completely miss and no damage is taken.
The amount of damage they inflict depends on random chance and a weapons power multiplier.

The max damage a weapon can do it 10 damage.

Weapons damage formula: `Damage = min(10, (PowerAllocated/100) * rand(10, 100))`

## shields
Shields are also kept very simple.
They can block up to 10 units of damage.

Shields prevent damage to the ship using the formula:
`DamagePrevented = min(10, (PowerAllocated/100) * rand(10, 100))`

## Evade
Evade is sort of funky.
The chance weapons fire will be evaded is constant through an entire turn, meaning that all weapons fired at a player during a given turn will invoke a dice roll.
If the roll succeeds, the weapons fire misses.

There is always some chance that weapons fire will be evaded.
For a evade count of n, the player is (n+1) times more likely to evade weapons fire.

First, we count the number of evades in the queue on the player's last turn.
The evade percent chance is `Evade = min(100, ((rand(1,100) * min(1, EvadeCount + 1))/100) * 100` percent change of evasion (or something)
