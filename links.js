let linkParams = false;

function getPuzzle() {
	return puzzle.replace(/\./g, '0'); // replace periods with 0s for URLs
}
function setPuzzle(puz) {
	puzzle = puz.replace(/0/g, '\.'); // replace 0s with periods for setBoard
	setBoard(sudoku.board_string_to_grid(puzzle) );
}

function handleLink() {
	if(linkParams)
		history.replaceState({}, '', '?p=' + getPuzzle() );
}
function setupLinkButton() {
	$('#link-btn').click( ()=> {
		linkParams = !linkParams;
		if(linkParams) {
			$('#link-btn').html('Remove link');
			history.replaceState({}, '', '?p=' + getPuzzle() );
		}
		else {
			$('#link-btn').html('Get link');
			window.history.replaceState(null, null, window.location.pathname);
		}
	});
}
function checkLoadLink() {
	let url = new URL(window.location.href);
	let p = url.searchParams.get('p');
	if(p) {
		setPuzzle(p);
		linkParams = true;
		$('#link-btn').html('Remove link');
	}
	else {
		setDifficulty('easy');
	}
}