import { PlayerMap, LS_KEY } from './Consts';

class Utils {

	/*Util function to retrieve className on mark
		eg. X:x-value O:y-value
	*/
	GetValueClassName(mark) {
		if (!mark) return '';
		
		switch (mark.toUpperCase()) {
			case 'X':
				return 'x-value';
			case 'O':
				return 'y-value';
			default:
				return '';
		}
	}

	/*Util function to retrieve name of player based on mark value
		eg. X=player O=computer
	*/
	GetPlayerKey(mark) {
		for (let playerKey in PlayerMap) {
			if (PlayerMap[playerKey] === mark.toUpperCase()) {
				return playerKey;
			}
		}
	}

	/*Check if there is winner*/
	CheckForWinner(boxes) {
	  //all potential winning lines
	  const winningLines = [
	    [0, 1, 2],
	    [3, 4, 5],
	    [6, 7, 8],
	    [0, 4, 8],
	    [2, 4, 6],
	    [0, 3, 6],
	    [1, 4, 7],
	    [2, 5, 8],      
	  ];

	  for (let i=0; i<winningLines.length; i++) {
	  	const [a, b, c] = winningLines[i];
	    //compare on current boxes
	    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
	      return true;
	    }
	  }

	  return false;		
	}


	/*Calculate Best Move for computer*/
	CalculateBestMove(boxes) {
		let emptyBoxes = boxes.reduce((emptyCollection, boxVal, ind) => {
			if (boxVal === null) {
				emptyCollection.push(ind);
			}
			return emptyCollection
		}, [])
		console.log(emptyBoxes);
	}

	InitLocalStorage() {
		localStorage.setItem(LS_KEY['player'], 0);
		localStorage.setItem(LS_KEY['computer'], 0);
	}

	GetLocalStoreScore(playerKey) {
		return Number(localStorage.getItem(LS_KEY[playerKey]));
	}

	SetLocalStorageScore(playerKey, newScore) {
		localStorage.setItem(LS_KEY[playerKey], newScore);
	}


}

export default new Utils();