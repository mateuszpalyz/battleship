import React from 'react';
import GameStatus from '../components/game_status';
import renderer from 'react-test-renderer';

test('Component displays waiting info for waiting status', () => {
  const component = renderer.create(
    <GameStatus status='waiting'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Component displays started info for started status', () => {
  const component = renderer.create(
    <GameStatus status='started'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
