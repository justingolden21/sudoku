$(function() {
	// make the board
	makeBoard();

	// set the board
	// reset();

	// $('#s0-2').select();

	$('input').change(function() {
		checkValids();
		if(checkWon() ) {
			$('input').addClass('won');
		} else {
			$('input').removeClass('won');
		}
	});

	// $('#solution-btn').click(function() {
	// 	setSolution();
	// 	$('input').addClass('won');
	// });

	// $('#reset-btn').click(function() {
	// 	reset();
	// });

	$('#easy-btn').click(function() {
		setDifficulty('easy');
	});
	$('#medium-btn').click(function() {
		setDifficulty('medium');
	});
	$('#hard-btn').click(function() {
		setDifficulty('hard');
	});

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


// function setSolution() {
// 	setBoard([
// 		'534678912'.split(''),
// 		'672195348'.split(''),
// 		'198342567'.split(''),
// 		'859761423'.split(''),
// 		'426853791'.split(''),
// 		'713924856'.split(''),
// 		'961537284'.split(''),
// 		'287419635'.split(''),
// 		'345286179'.split('')
// 	], false);	
// }

// function reset() {
// 	setBoard([
// 		['5','3',' ',' ','7',' ',' ',' ',' '],
// 		['6',' ',' ','1','9','5',' ',' ',' '],
// 		[' ','9','8',' ',' ',' ',' ','6',' '],
// 		['8',' ',' ',' ','6',' ',' ',' ','3'],
// 		['4',' ',' ','8',' ','3',' ',' ','1'],
// 		['7',' ',' ',' ','2',' ',' ',' ','6'],
// 		[' ','6',' ',' ',' ',' ','2','8',' '],
// 		[' ',' ',' ','4','1','9',' ',' ','5'],
// 		[' ',' ',' ',' ','8',' ',' ','7','9']
// 	], true);
// 	// todo: make it work, checking for blanks in set board makes it ignore blanks, but we don't want to disable blanks either
// }

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