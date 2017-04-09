import React from 'react';
import TurnIndicator from '../components/turn_indicator';
import renderer from 'react-test-renderer';

test('Component displays player when it is players turn', () => {
  const component = renderer.create(
    <TurnIndicator turn='player1' player='player1'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Component displays opponent when it is opponents turn', () => {
  const component = renderer.create(
    <TurnIndicator turn='player2' player='player1'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
