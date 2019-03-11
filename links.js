function getPuzzle() {
	return puzzle.replace(/\./g, '0'); // replace periods with 0s for urls
}
function setPuzzle(puz) {
	puzzle = puz.replace(/0/g, '\.'); // replace 0s with periods for setBoard
	setBoard(sudoku.board_string_to_grid(puzzle) );
}
