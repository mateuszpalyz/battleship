import board from '../utils/board.js';

test('returns array with four ships at the end of it', ()=> {
  expect(board.layout()).toEqual([
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    'S', 'S', 'S', 'S'
  ]);
});

test('returns empty array of tiles', ()=> {
  expect(board.emptyLayout()).toEqual([
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    '', '', '', ''
  ]);
});
