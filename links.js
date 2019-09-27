function getPuzzle() {
	return puzzle.replace(/\./g, '0'); // replace periods with 0s for urls
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
			$(this).html('Remove link');
			history.replaceState({}, '', '?p=' + getPuzzle() );
		}
		else {
			$(this).html('Get link');
			window.history.replaceState(null, null, window.location.pathname);
		}
	});
}
function checkLoadLink() {
	let url = new URL(window.location.href);
	let p = url.searchParams.get('p');
	if(p)
		setPuzzle(p);
	else
		$('#easy-btn').click();
}