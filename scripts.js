//https://github.com/robatron/sudoku.js/blob/master/sudoku.js

let puzzle, d;
const difficulties = 'easy medium hard very-hard insane inhuman'.split(' ');

$(function() {
	makeBoard();

	$('.square').change(function() {
		if($(this).val()<1 || $(this).val()>9)
			$(this).val('');
		checkValids();
		if(checkWon() )
			$('.square').addClass('won');
		else
			$('.square').removeClass('won');
	});

	// make difficulty btns
	for(let i = 0; i < difficulties.length; i++) {
		let name = capitalize(difficulties[i].replace('-',' ') );
		$('#difficulty-div').append('<button title="' + 'Generate a new puzzle with ' + name + ' difficulty"' 
			+ 'onclick="setDifficulty(\'' + difficulties[i] + '\')"">' + name + '</button>');
	}

	$('#solve-btn').click(solve);
	$('#clear-btn').click(reset);
	$('#print-btn').click( ()=> window.print() );

	setupLinkButton();
	checkLoadLink();

	$('#show-invalid-checkbox').change( ()=> {
		let displayInvalid = $('#show-invalid-checkbox').is(':checked');
		$('#invalid-css').prop('href', displayInvalid ? 'invalid.css' : ' ');
	});
});

function setDifficulty(difficulty) {
	puzzle = sudoku.generate(difficulty);
	setBoard(sudoku.board_string_to_grid(puzzle) );
	$('.square').removeClass('invalid won');
	$('#difficulty-span').html(capitalize(difficulty.replace('-',' ') ) );
	d = difficulties.indexOf(difficulty);
}

function solve() {
	let solution = sudoku.solve(puzzle);
	setBoard(sudoku.board_string_to_grid(solution), false );
	$('.square').addClass('won').removeClass('invalid');
}
function reset() {
	setBoard(sudoku.board_string_to_grid(puzzle) );
	$('.square').removeClass('invalid won');
}

function makeBoard() {
	for(let x=0; x<9; x++) {
		$('#sudoku-div').append('<div class="input-row">');
		for(y=0; y<9; y++) {
			let cssClass = '';
			if(x==2 || x==5) cssClass += ' border-bottom';
			if(y==2 || y==5) cssClass += ' border-right';
			if(x==3 || x==6) cssClass += ' border-top';
			if(y==3 || y==6) cssClass += ' border-left';
			$('#sudoku-div').append('<input id="s' + x + '-' + y + '" class="square' + cssClass + '" type="number" min="1" max="9" required>');
		}
		$('#sudoku-div').append('</div>');
	}	
}

function setBoard(vals, setDisabled=true) {
	for(let x=0; x<9; x++) {
		for(y=0; y<9; y++) {
			if(vals[x][y] != '.') {
				$('#s' + x + '-' + y).val(vals[x][y]);
				if(setDisabled)
					$('#s' + x + '-' + y).prop('disabled', 'true');
			} else {
				$('#s' + x + '-' + y).val('');
				if(setDisabled)
					$('#s' + x + '-' + y).prop('disabled', '');
			}
		}
	}
	if(linkParams)
		createLink();
}

function getVal(posY, posX) {
	return $('#s' + posY + '-' + posX).val();
}

// returns array of surrounding numbers vertically, horizontally, and in its 3x3 grid
function getSurroundingNums(posY, posX) {
	let surrounding = [];
	for(let i=0; i<9; i++) {
		if(i!=posX) // avoid given square
			surrounding.push(getVal(posY, i) ); // horizontal
		if(i!=posY) // avoid given square
			surrounding.push(getVal(i, posX) ) // vertical
	}

	let areaX = Math.floor(posX / 3);
	let areaY = Math.floor(posY / 3);
	for(let x=3*areaX; x<3*areaX+3; x++) {
		for(let y=3*areaY; y<3*areaY+3; y++) {
			if(x != posX || y != posY) // avoid given square
				surrounding.push(getVal(y, x) );
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
			if(isValid(x, y) )
				$('#s' + x + '-' + y).removeClass('invalid');
			else
				$('#s' + x + '-' + y).addClass('invalid');
		}
	}
}

function checkWon() {
	// no invalid inputs, no empty inputs
	return $('.invalid').length==0 && $('.square:invalid').length==0;
}

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}