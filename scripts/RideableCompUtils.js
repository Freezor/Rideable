import { cModuleName } from "./RideableUtils.js";
import { RideableFlags } from "./RideableFlags.js";

//Module Names
const cStairways = "stairways";
const cTagger = "tagger";
const cWallHeight = "wall-height";
const cLevelsautocover = "levelsautocover";
const cArmReach = "foundryvtt-arms-reach";

//SpecialFlags
const cPreviousIDF = "PreviousIDFlag"; //Flag for saving previous ID, used in compatibility with [stairways]

export { cStairways, cTagger, cWallHeight, cArmReach }

//should only be imported by RideableUtils, Rideablesettings and RideableCompatibility
//RideableCompUtil will take care of compatibility with other modules in regards to information handling, currently supported:
//-WallHeight
class RideableCompUtils {
	//DECLARATIONS
	//basic
	static isactiveModule(pModule) {} //determines if module with id pModule is active
	
	//specific: Foundry ArmsReach
	static ARReachDistance() {} //[ArmsReach] gives the current arms reach distance
	
	//specific: stairways
	static UpdatePreviousID(pToken) {} //sets the previous id to the current ID
	
	static PreviousID(pToken) {} //gives the previous ID
	
	static TokenwithpreviousID(pID, pScene) {} //gives the token in pScene which has the previous id pID (if any)
	
	static UpdateRiderIDs(pRidden) {} //tries to fiend the current riders in the currrent scene based on their previous ids
	
	//specific: wall-heights
	static WHTokenHeight(pToken, pWithElevation = false) {} //[Wall-Height] gives the Height the Wall-Height module assigns pToken
	
	//IMPLEMENTATIONS
	//basic
	static isactiveModule(pModule) {
		if (game.modules.find(vModule => vModule.id == pModule)) {
			return game.modules.find(vModule => vModule.id == pModule).active;
		}
		
		return false;
	};
	
	//specific: Foundry ArmsReach
	static ARReachDistance() {
		if (RideableCompUtils.isactiveModule(cArmReach)) {
			return game.settings.get(cArmReach, "globalInteractionMeasurement")
		}
	}
	
	//specific: stairways
	static UpdatePreviousID(pToken) {
		if (pToken) {
			pToken.document.setFlag(cModuleName, cPreviousIDF, pToken.id);
		}
	}
	
	static PreviousID(pToken) {
		if (pToken) {
			if (pToken.document) {
				if (pToken.document.flags.Rideable) {
					if (pToken.document.flags.Rideable.PreviousIDFlag) {
						return pToken.document.flags.Rideable.PreviousIDFlag;
					}
				}
			}
		}
		return "";
	}
	
	static TokenwithpreviousID(pID, pScene) {
		//let a = pScene.tokens.map(vDocument => vDocument.object).map(vtoken => vtoken.document.flags);	
		//console.log(a.filter(va => va.Rideable).map(va => va.Rideable));
		let vTokens = pScene.tokens.map(vDocument => vDocument.object);
		
		console.log(vTokens);
		
		console.log(pID);
		console.log(vTokens.map(vToken => RideableCompUtils.PreviousID(vToken)));
		
		return vTokens.filter(vToken => RideableCompUtils.PreviousID(vToken) == pID)[0];
	}
	
	static async UpdateRiderIDs(pRidden) {
		let vPreviousRiderIDs = RideableFlags.RiderTokenIDs(pRidden);
		
		let vNewRiders = await canvas.tokens.placeables.filter(vToken => vPreviousRiderIDs.includes(RideableCompUtils.PreviousID(vToken)));
		
		await RideableFlags.cleanRiderIDs(pRidden);
		
		for (let i = 0; i < vNewRiders.length; i++) {
			await RideableFlags.addRiderTokens(pRidden, [vNewRiders[i]], RideableFlags.wasFamiliarRider(vNewRiders[i]) );
			
			RideableCompUtils.UpdatePreviousID(vNewRiders[i]);
		}
	} 
	
	//specific: wall-heights
	static WHTokenHeight(pToken, pWithElevation = false) {
		if (RideableCompUtils.isactiveModule(cWallHeight)) {
			let vToken = pToken;
				
			//allow either a token document or a token
			if (pToken.object) {
				vToken = pToken.object;
			}
			
			if (pWithElevation) {
				return vToken.losHeight
			}
			else {
				return vToken.losHeight - vToken.document.elevation;
			}
		}
		else {
			return 0;
		}
	}
}

export { RideableCompUtils };