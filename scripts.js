$(function() {

	makeBoard();

	$('input').change(function() {
		checkValids();
		if(checkWon() ) {
			$('input').addClass('won');
		} else {
			$('input').removeClass('won');
		}
	});

	$('#easy-btn').click(function() {
		setDifficulty('easy');
	});
	$('#medium-btn').click(function() {
		setDifficulty('medium');
	});
	$('#hard-btn').click(function() {
		setDifficulty('hard');
	});

	$('#easy-btn').click();

});

function setDifficulty(difficulty) {
	setBoard(sudoku.board_string_to_grid(sudoku.generate(difficulty) ) );
	$('	input').removeClass('invalid');
}


function makeBoard() {
	for(let x=0; x<9; x++) {
		$('#sudoku-div').append('<div class="input-row">');
		for(y=0; y<9; y++) {
			let cssClass = '';
			if(x==2 || x==5) cssClass += ' border-bottom';
			if(y==2 || y==5) cssClass += ' border-right';
			$('#sudoku-div').append('<input id="s' + x + '-' + y + '" class="' + cssClass + '" type="number" min="1" max="9" required>');
		}
		$('#sudoku-div').append('</div>');
	}	
}

function setBoard(vals, setDisabled=true) {
	for(let x=0; x<9; x++) {
		for(y=0; y<9; y++) {
			if(vals[x][y] != '.') {
				$('#s' + x + '-' + y).val(vals[x][y]);
				if(setDisabled) {
					$('#s' + x + '-' + y).prop('disabled', 'true');
				}
			} else {
				$('#s' + x + '-' + y).val('');
				if(setDisabled) {
					$('#s' + x + '-' + y).prop('disabled', '');
				}	
			}
		}
	}
}

function getVal(posY, posX) {
	return $('#s' + posY + '-' + posX).val();
}

// returns array of surrounding numbers vertically, horizontally, and in its 3x3 grid
function getSurroundingNums(posY, posX) {
	let surrounding = [];
	for(let i=0; i<9; i++) {
		if(i!=posX) { // avoid given
			surrounding.push(getVal(posY, i) ); // horizontal
		}
		if(i!=posY) { // avoid given
			surrounding.push(getVal(i, posX) ) // vertical
		}
	}

	let areaX = Math.floor(posX / 3);
	let areaY = Math.floor(posY / 3);
	for(let x=3*areaX; x<3*areaX+3; x++) {
		for(let y=3*areaY; y<3*areaY+3; y++) {
			if(x != posX || y != posY) { // avoid given
				surrounding.push(getVal(y, x) );
			}

		}
	}

	surrounding = surrounding.filter(a => a != ''); // remove empty
	surrounding = [...new Set(surrounding)]; // remove duplicates
	surrounding.sort(); // sort
	return surrounding;
}

function isValid(posY, posX) {
	return getSurroundingNums(posY, posX).indexOf(getVal(posY, posX) ) == -1;
}

function checkValids() {
	for(let x=0; x<9; x++) {
		for(y=0; y<9; y++) {
			if(isValid(x, y) ) {
				$('#s' + x + '-' + y).removeClass('invalid');
			} else {
				$('#s' + x + '-' + y).addClass('invalid');
			}
		}
	}
}

function checkWon() {
	// no invalid inputs, no empty inputs
	return $('.invalid').length==0 && $('input:invalid').length==0;
}