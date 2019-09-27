let linkParams = false;

function getPuzzle() {
	return puzzle.replace(/\./g, '0'); // replace periods with 0s for URLs
}
function setPuzzle(puz) {
	puzzle = puz.replace(/0/g, '\.'); // replace 0s with periods for setBoard
	setBoard(sudoku.board_string_to_grid(puzzle) );
}

function createLink() {
	history.replaceState({}, '', '?p=' + getPuzzle() + '&d=' + d);
}
function setupLinkButton() {
	$('#link-btn').click( ()=> {
		linkParams = !linkParams;
		if(linkParams) {
			$('#link-span').html('Remove link');
			createLink();
		}
		else {
			$('#link-span').html('Get link');
			window.history.replaceState(null, null, window.location.pathname);
		}
	});
}
function checkLoadLink() {
	let url = new URL(window.location.href);
	let p = url.searchParams.get('p');
	d = url.searchParams.get('d');
	if(p) {
		setPuzzle(p);
		linkParams = true;
		$('#link-span').html('Remove link');
		$('#difficulty-span').html(capitalize(difficulties[d].replace('-',' ') ) );
	}
	else {
		setDifficulty('easy');
	}
}