import { RideableUtils, cModuleName, Translate} from "./RideableUtils.js";
import { MountSelected, MountSelectedFamiliar, UnMountSelected } from "./MountingScript.js";

Hooks.once("init", () => {  // game.settings.get(cModuleName, "")
  //Settings
  game.settings.register(cModuleName, "RidingHeight", {
	name: Translate("RidingHeight.name"),
	hint: Translate("RidingHeight.descrp"),
	scope: "world",
	config: true,
	type: Number,
	default: "5"
  });

  game.settings.register(cModuleName, "MountingDistance", {
	name: Translate("MountingDistance.name"),
	hint: Translate("MountingDistance.descrp"),
	scope: "world",
	config: true,
	type: Number,
	default: "15"
  });
  
  game.settings.register(cModuleName, "BorderDistance", {
	name: Translate("BorderDistance.name"),
	hint: Translate("BorderDistance.descrp"),
	scope: "world",
	config: true,
	type: Boolean,
	default: true
  });
  
  game.settings.register(cModuleName, "RiderMovement", {
	name: Translate("RiderMovement.name"),
	hint: Translate("RiderMovement.descrp"),
	scope: "world",
	config: true,
	type: String,
	choices: {
		"RiderMovement-disallow": Translate("RiderMovement.RiderMovement-disallow"),
		"RiderMovement-dismount": Translate("RiderMovement.RiderMovement-dismount"),
		"RiderMovement-moveridden": Translate("RiderMovement.RiderMovement-moveridden")
	},
	default: "RiderMovement-disallow"
  });
  
  game.settings.register(cModuleName, "RidingSystemEffects", {
	name: Translate("RidingSystemEffects.name"),
	hint: Translate("RidingSystemEffects.descrp"),
	scope: "world",
	config: true,
	type: Boolean,
	default: true
  });  
  
  game.settings.register(cModuleName, "RideableTag", {
	name: Translate("RideableTag.name"),
	hint: Translate("RideableTag.descrp"),
	scope: "world",
	config: RideableUtils.isPf2e(),
	type: Boolean,
	default: false
  });  
  
  game.settings.register(cModuleName, "FamiliarRiding", {
	name: Translate("FamiliarRiding.name"),
	hint: Translate("FamiliarRiding.descrp"),
	scope: "world",
	config: true,
	type: Boolean,
	default: false
  });  
  
  game.settings.register(cModuleName, "PreventEnemyRiding", {
	name: Translate("PreventEnemyRiding.name"),
	hint: Translate("PreventEnemyRiding.descrp"),
	scope: "world",
	config: true,
	type: Boolean,
	default: false
  });  
  
  game.settings.register(cModuleName, "MessagePopUps", {
	name: Translate("MessagePopUps.name"),
	hint: Translate("MessagePopUps.descrp"),
	scope: "world",
	config: true,
	type: Boolean,
	default: false
  });  
  
  //Keys
  game.keybindings.register(cModuleName, "Mount", {
    name: Translate("Mount.name"),
    hint: Translate("Mount.descrp"),
    editable: [
      {
        key: "KeyM"
      }
    ],
    onDown: () => { MountSelected(true); },
    restricted: false,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });
  
  game.keybindings.register(cModuleName, "UnMount", {
    name: Translate("UnMount.name"),
    hint: Translate("UnMount.descrp"),
    editable: [
      {
        key: "KeyN"
      }
    ],
    onDown: () => { UnMountSelected(); },
    restricted: false,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });
  
  game.keybindings.register(cModuleName, "MountFamiliar", {
    name: Translate("MountFamiliar.name"),
    hint: Translate("MountFamiliar.descrp"),
    editable: [
      {
        key: "KeyJ"
      }
    ],
    onDown: () => { MountSelectedFamiliar(true); },
    restricted: false,
    precedence: CONST.KEYBINDING_PRECEDENCE.NORMAL
  });
});

Hooks.once("ready", () => {console.log("Rideable Check")});