class Utils {

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
	

}

export default new Utils();