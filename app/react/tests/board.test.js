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

test('returns array with four ship present', ()=> {
  expect(board.shuffleTiles().filter((x)=> { return x === 'S' })).toHaveLength(4);
});

test('returns array of 16 tiles', ()=> {
  expect(board.shuffleTiles()).toHaveLength(16);
});
