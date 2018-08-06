## Ground Floor Intro

Atlantis has sunken into the ocean. The survivors have gathered in the city's highest points, where they are attempting to rebuild. The player is a diver, diving into the ruins of Atlantis to find materials and treasures. These dives are made up of random events.

## Detailed Information

- [Event Writing Guide](./docs/events.html)
- [Lore Overview](./docs/lore.html)
- [Mechanics Overview](./docs/mechanics.html)
- [Macros](./docs/macros.html)

## Using the Scaffold

Download the [scaffold](./scaffold.zip) and extract it. There are two project files: `archive.tw2.html` and `scaffold.html`. The former can be imported into Twine 2 or Tweego, the latter can be imported into or decompiled with most other compilers that can use SugarCube v2.x. You can use this simple project to create and test events.

You'll want to read the [event writing guide](./docs/events.html) for a primer on how to do that. If anything confuses you, the [mechanics](./docs/mechanics.html) and [macro](./docs/macros.html) overviews will likely help clarify any finer points, but feel free to ask me too.

I would ask that you please read the [lore](./docs/lore.html) overview.

## Sending Me Events

Please send me the events as compiled html using the scaffold; just compile / publish your scaffold project to html and send it. Please send only one event per file (though you can send a bunch per email / message), by uploading it to a shared Google drive folder I will share with you. If you don't want to or can't use Google Drive, you can instead email me the files at `Mason_(359*2)@hotmail.com` (note, do the math there to get the number, and lose the parens).

I will not necessarily accept all events. Please send me an email that gives me, Chapel, the right to publish, modify, and distribute your work.  For example:

```
I give Chapel the right to publish, modify, and distribute the content in the attached files without limitation, as long as proper attribution is given.
```

You keep all rights to your work, including reusing it or publishing it elsewhere, you just give me the right to also use it. You don't need to use legalese or anything crazy, just a clear note I can point to in case you use some of this work or these ideas elsewhere and some other publisher or organization comes after me.

Please also let me know how you'd like to be credited (your name or handle, a website or other link you want me to promote, etc).

# Events

[Back to the main readme.](../readme.html)

## Creating Events

To create an event, simply create a new passage, and link to it from the `Start` passage.  Pease give your event a descriptive name.  For example: `broken-terminal`. If your event is longer than one passage, each passage name should start with the same name, followed by a description, e.g. `broken-terminal-fix` could be a result of trying to fix the terminal.

Try to use the `<<biglink>>` macro to link between your passages whenever possible, as this reduces the work on my end.

Every event is given a random value between 1 and 100 when the event is started, and it's stored in the `$chance` variable. No random elements should exist on an event's first passage; the reason for this is to prevent the player from getting different outcomes by reloading the page, loading a save, or leaving a menu. This means you should not use your own random numbers or elements, i.e. don't use `random()` or `either()`, pipe everything through `$chance`.

After the event ends, use the `<<nextscene>>` macro to end it. If the player makes some bad choice or fails at some thing, they won't die. Always instead spin it so they're forced to return to the surface, using the `<<surface>>` macro; a tank is leaking, they're hurt, their suit is damaged etc. Again, never kill the player.

Use the `<<loot>>` macro to reward the player. `<<loot>>` gives completely random loot. `<<loot n>>`, where `n` is a number between 0 and 3 gives loot at differing odds; 0 has the lowest chance of good loot, while 1, 2, and 3 have increasing odds of better loot. `<<loot $location>>` gives loot based on how deep the player is right now, so generates a nice curve through the game. Most loot should be location based or totally random, unless you're rewarding the player for having an item or making a smart choice; in these cases, a nice `<<loot 2>>` or `<<loot 3>>` is fine.

## Passage Tags

If your event should be unique, meaning that it would only make sense if it happened once, add the passage tag `unique` to it's first passage. If the player cannot easily leave the event, for example if they're trapped or being attacked, add the `no-return` tag to every passage where leaving wouldn't make sense.

## General Guidelines

Should be written in second person and present tense. Try to keep the overall tone serious, but funny insights or other moments are welcome. Try to avoid scenes that send the player back to the surface--using these too much weakens the effect. Give the player the option to move on liberally. Let them just nope out of it when it's bad, or just not mess with it at all if they don't want to.

## Checking gear

They player has some gear that you can check for to make a scene more interesting. Try to avoid 'requiring' it; instead, make the outcome better or the process easier.

Gear checks are boolean variables. Here's a list of gear specifically for dives:
```
Harpoon: $hasHarpoon
Lock Pick: $hasLockPick (opens only simple locks)
Skeleton Key: $hasSkeletonKey (opens any 'legal' lock in Atlantis, used by the protectors to get anywhere)
Head Lamp: $hasHeadLamp (the player has one regardless, this one is better and brighter)
Scanner: $hasScanner (used to closely inspect objects; sort of a super microscope)
```

## Eaxmple Event

```
:: found-chest [common]
You find yourself on a <<if $chance lt 33>>street<<elseif $chance lt 66>>boulevard<<else>>thoroughfare<</if>> in some small neighborhood you've never seen before, sandwiched between a few different places you've heard of. A few parts of a skeleton nearby are trapped under a lockbox. There's probably a lesson in there somewhere.

You check the box and find it locked, of course. 

<<if $hasLockPick>>\
    <<biglink 'Try to pick the lock.' 'found-chest-pick'>>
<</if>>\
<<biglink 'Look for a way to force it open.' 'found-chest-look'>>
<<biglink 'Leave it be.' 'found-chest-leave'>>

:: found-chest-leave [common]
You figure the chest might have a taste for blood at this point, and don't want to tempt fate. Besides, disturbing a grave is beneath you.

You take another cursory glance around before hoofing it, <<if $chance lt 25>>and your thoroughness is rewarded when you find some useful odds and ends near a house. <<loot $location>><<else>>but nothing catches your eye.<</if>>

<<nextscene>>

:: found-chest-pick [common]
The lock isn't in great shape, but you manage to get it open.

There's some pretty decent loot inside, and you pack it all up. <<loot>><<loot 3>><<loot $location>>

<<nextscene>>

:: found-chest-look [common]
You take a look around for something that might help, <<if $chance lt 35>><<set _foundShovel to true>>and see a shovel not far off. You may be able to use it to pop this box open.<<elseif $chance lt 60>><<set _foundRock to true>>and see a heavy rock nearby.  It will probably destroy some of whatever is in the box, but it's better than nothing.<<else>>but you can't see anything useful.<</if>>

<<if def _foundShovel>>\
    <<biglink 'Try the shovel.' 'found-chest-shovel'>>
<</if>>\
<<if def _foundRock>>\
    <<biglink 'Try the rock.' 'found-chest-rock'>>
<</if>>\
<<biglink 'Leave the box be.' 'found-chest-leave'>>

:: found-chest-shovel [common]
<<if $chance lt 10>>Unfortunately, the box is stronger than you imagined, and the shovel snaps in half as you try to pry the lid of the box off.

You toss the shovel aside. You've already wasted too much time here.

<<nextscene>>\
<<else>>The lid pops open, and you collect the contents of the box.<<loot>><<loot $location>>

<<nextscene>>\
<</if>>

:: found-chest-rock [common]
You heave the rock onto the box, <<if $chance lt 50>>and it bounces unceremoniously off of it, sending bubbles swarming around, and coming to rest nearby.

You decide you've wasted enough time on this box and move on.

<<nextscene>><<else>>and it rolls off the dented lid and comes to rest on the bones beneath it. You manage to pry the lid the rest of the way off. Most of what was inside was damaged, but a few odds and ends survived.<<loot $location>>

<<nextscene>><</if>>
```

[Back to the main readme.](../readme.html)

# Lore Overview

[Back to the main readme.](../readme.html)

## General Info

*Deep Dive* is meant to feel fairly mysterious, and the player is meant to gain a clearer and clearer picture of the culture of Atlantis and the lore of the world as they explore. For this reason, the lore here is meant to be basic and non-restrictive. The game's general feel is meant to start out as a little unsettling, in a *20,000 Leagues Under the Sea* sort of pulpy way, and slowly start giving way to the fact that Atlantis was a nightmare dystopia. Further, as the player dives deeper, more cosmic horror elements are introduced--unfathomable beings exist in the deepest parts of the ocean. The temple and the nobility were engaged in strange rituals. The world is almost magical, but it's all played in a Lovecraftian style of horror the deeper you get.

## Setting

The city (not island in this universe) of Atlantis has fallen into the sea, and the survivors have gathered on the very highest parts of the city that remain above the water. In Atlantis, the richest citizens lived closest to the water, and the poorest lived at the city's highest parts. The survivors banded together to begin the process of rebuilding, and brave (or foolish) people donned pressure suits and began diving into the city's ruins for supplies to help the rebuilding effort. The player is one such diver.

## Technology

Atlantis had impossible and nonsensical technology by design. Electricity existed, people could communicate across vast distances, and man-portable electronics (usually in the form of *terminals*) were not uncommon among nobles. Complex early-modern metalworking and chemistry were utilized. It's not exactly steam-punk, but similar in some ways to that idea. Swords and plated armor were still in use, however.

### Angel-fire

One important technology in Atlantis is angel-fire, a type of chemically-induced flame that burns whiter and hotter than normal fire, and keeps burning until it runs out of fuel. It can burn underwater, creating dangerously hot areas that can melt even pressure suits. It is extremely dangerous and its use is tightly regulated.

### Pressure Suits

The player and other divers wear pressure suits, which are essentially one-man, man shaped submersibles. They have headlamps and propulsions systems (small propellers), but are hard to move around in. They prevent divers from needing decompression, and supply oxygen through air tanks.

### Terminals

Terminals are small pieces of glass and steel that can be used to interface with some electronics, or can be linked to a network system (think telephone wires) for communication. They're somewhat like smart phones, but fairly rare, even among the rich.

## Factions and Groups

### The Hub

The hub is what the divers call the community of survivors on the surface, to differentiate it from Atlantis or the city, which is what they now call the ruins beneath.

### The Nobility

Nobles are about what you'd expect from most fantasy settings. Many are quite out-of-touch, but there are definitely those who try to use their status to help others or uphold their values. Far fewer nobles survived than commoners, because of how close to the water they were.

### The Merchant's Association

To buy and sell in a business-like capacity in old Atlantis, you had to be a member. The Association still exists and represents merchants in the hub. They set prices to avoid various forms of gouging, artificial scarcity, and other nasty tricks that could ruin the rebuilding effort. Merchants still have room to haggle, but most resources divers sell go directly to the rebuilding effort.

Not all people are a fan of the price-setting, but most recognize it as a necessary evil at least.

### The Protectors

An order of warriors that functioned in old Atlantis as a police and military force. Their official name is 'His Majesty's Protectors of the Peace'. Much like police in real life, some are good and noble and others are corrupt and devious. The protectors wield swords and wear plated armor.

### The Royals

The king and his immediate family, and some members of his extended family. The line of succession is broken, as all the royals are assumed dead. There are some surviving nobles with at least a distant claim, but few have had much desire to step in for now.

### Divers

The Divers are considered by most to be little more than mercenaries or profiteers, though many have won respect through charity. Divers aren't a specific class or caste, but are mostly from the worker population (see below).

### The Workers

The workers is the generic term given to anyone who is not a protector, diver, merchant, or noble. Some skilled craftsman and laborers and some merchants have found their skills useless and wound up here, but most are simply commoners. They are the primary workers on the rebuilding project, and many work for free, though the Merchant's Association ensures everyone is fed, clothed, and housed at a basic level.

### The Temple

Atlantis's religion is polytheistic, but they revere the 'Blessed One' above all other gods. The Blessed One is usually depicted as a mass of chains, and priests wear chains around themselves to represent their obedience to him. It is said that the Blessed One taught the first king of Atlantis how to build the city.

Worshiping other gods used to be common, but grew out of favor, even to the point of charges of heresy.

## Culture

Just some quick notes on miscellaneous things.

### Passing

Old Atlantis provided 'passing clinics' to citizens. They were not required, but not using them was considered selfish. Non-highborn citizens who could no longer work or contribute were expected to go to them to be euthanized.

### Crime and Punishment

Atlantis had few jails, and typically commoners were not allowed in them. Protectors would instead throw most criminals off of the city--if they survived and managed to return, it is said the Blessed One forgave them. It is not clear this has ever happened. People sometimes gather to watch these events when well-known people or family members are involved, but there is no guarantee typically that it won't happen in rather short order after an arrest.

### The Monarchy

The current king or queen is considered to be the voice of the Blessed One in the world, and their law and rule is largely absolute. The nobles, however, control most of the king's finances, meaning realistically, the king must consult the nobles in most things.

## Horrors

There are terrible things under the sea, here's some that already exist.

### Hellmaw

A giant monstrous shark.

### Red Wraith

A giant octopus.

### Siren

A mind-controlling siren.

### Vemon Tail

A giant aquatic scorpion.

### The Serpent

A monstrous but not aggressive sea serpent.

### The Chemical Agent

A secret chemical agent that drives divers mad, even through their pressure suits.

### The Broken Rose

An intelligent, telepathic tree that looks somewhat like a flower and hates humans.

### The Blessed One

A writhing mass of chains whose purpose and desires are unfathomable.

[Back to the main readme.](../readme.html)

# Macros

[Back to the main readme.](../readme.html)

This covers the macros in the scaffold. Most are cheap knock-offs of what they do in the real game.

## `<<nextscene>>`

Sends the player to the next scene in the playlist or back to the surface when they're out of scenes.  All events end this way. It is an exit point for events. You will probably have a few of these, since you should let players leave most events of their own volition. You should definitely have at least one.

##  `<<biglink>>`

This is a custom-styled link used in the game. In the scaffold it's a normal link, but please use it wherever possible. Syntax is `<<biglink 'text' 'passage'>>`.

## `<<surface>>`

Sends the player back to the surface and ends the dive. Please use this incredibly sparingly; only in moments where not causing the player to lose something would cheapen the experience.

## `<<loot>>`

Used to reward the player with loot. `<<loot>>` gives completely random loot. `<<loot n>>`, where `n` is a number between 0 and 3 gives loot at differing odds; 0 has the lowest chance of good loot, while 1, 2, and 3 have increasing odds of better loot. `<<loot $location>>` gives loot based on how deep the player is right now, so generates a nice curve through the game. Most loot should be location based or totally random, unless you're rewarding the player for having an item or making a smart choice; in these cases, a nice `<<loot 2>>` or `<<loot 3>>` is fine.

## `$chance`

Not a macro but still important. Use this value to have something random happen. For example:
```
<<if $chance lt 35>>
    This has a 35% chance of occurring.
<</if>>
```
It is always a random number between 1 and 100.

## The passage tag `unique`

Causes an event to be deleted after it is played, so that it only ever happens once. Only needs to be included in the first passage of an event.

## The passage tag `no-return`

By default, the player can cut short their dive and return to the surface whenever they want. Use this to prevent that, such as in the middle of a scuffle, or when it'd otherwise make no sense.

[Back to the main readme.](../readme.html)

# Mechanics

[Back to the main readme.](../readme.html)

Just a few notes on *Deep Dive*'s mechanics to help you understand how your events fit in. I'll release a limited demo shortly for a better look.

## Core Loop

You're a diver, and you dive, haggle and sell your loot, buy upgrades (and make donations), and dive again. As the player dives, they'll find ways to get even deeper, getting better loot and moving the overarching plot along. These events will be occurring on the player's dives.

The game looks through all the events it has access to, makes sure the player can play them (i.e. at the right depth) and then randomly assigns a number of these to a playlist of a certain length (based on upgrades that help the player stay down longer). The player plays through these events to get their loot, and as such, they are the bulk of the game; a large number of interesting events is needed to keep things interesting.

[Back to the main readme.](../readme.html)