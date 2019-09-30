import { Position } from 'src/models/Position';

export function fillBoard(fen: string, selectedPiece: Position) {

  // TODO: TAKE THIS OUT LATER
  selectedPiece.number = null;

  // remove selected piece
  if (selectedPiece.number != null) {
    document.getElementById(selectedPiece.number.toString()).style.color="black";
    selectedPiece.number = null;
}

// remove all of the old pieces and make reset the colors
for (let i = 0; i < 64 ; i++) {
    document.getElementById(i.toString()).innerHTML="";
    if (Math.floor(i/8)%2 == (i%8)%2) {
        document.getElementById(i.toString()).className="black";
    } else {
        document.getElementById(i.toString()).className="white";
    }
}

let fenArray = fen.split(" ")[0].split("/");
let rankNumber = 7;

fenArray.forEach(function(element) {
    let fileNumber=0;

    element.split("").forEach(function(otherElement) {
      let otherElementNumber = Number(otherElement);
        if (isNaN(otherElementNumber)) {
            let div = document.getElementById((8*rankNumber+fileNumber).toString());
            switch(otherElement) {
                case "r": div.innerHTML = "&#9820;";
                break;
                case "n": div.innerHTML = "&#9822;";
                break;
                case "b": div.innerHTML = "&#9821;";
                break;
                case "q": div.innerHTML = "&#9819;";
                break;
                case "k": div.innerHTML = "&#9818;";
                break;
                case "p": div.innerHTML = "&#9823;";
                break;
                case "R": div.innerHTML = "&#9814;";
                break;
                case "N": div.innerHTML = "&#9816;";
                break;
                case "B": div.innerHTML = "&#9815;";
                break;
                case "Q": div.innerHTML = "&#9813;";
                break;
                case "K": div.innerHTML = "&#9812;";
                break;
                case "P": div.innerHTML = "&#9817;";
                break;
                default: div.innerHTML = "";
                break;
            }
            fileNumber++;
        } else {
            fileNumber += Number(otherElement);
        }
    })
    rankNumber--;
})



}
