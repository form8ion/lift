import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import applyEnhancers from './enhancers';

suite('enhancers', () => {
  const results = any.simpleObject();

  test('that an enhancer that matches the project is executed', async () => {
    const lift = sinon.spy();

    await applyEnhancers({results, enhancers: {[any.word()]: {test: () => true, lift}}});

    assert.calledWith(lift, {results});
  });

  test('that no liftEnhancers are applied if none are provided', async () => {
    await applyEnhancers({results});
  });
});
