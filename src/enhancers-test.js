import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import applyEnhancers from './enhancers';

suite('enhancers', () => {
  const results = any.simpleObject();
  const projectRoot = any.string();

  test('that an enhancer that matches the project is executed', async () => {
    const lift = sinon.spy();
    const test = sinon.stub();
    const otherLift = sinon.spy();
    test.withArgs({projectRoot}).resolves(true);

    await applyEnhancers({
      results,
      projectRoot,
      enhancers: {
        [any.word()]: {test, lift},
        [any.word()]: {test: () => Promise.resolve(false), lift: otherLift}
      }
    });

    assert.calledWith(lift, {results, projectRoot});
    assert.notCalled(otherLift);
  });

  test('that an enhancer error rejects the enhancer application', async () => {
    const error = new Error('from test');

    try {
      await applyEnhancers({
        results,
        projectRoot,
        enhancers: {
          [any.word()]: {
            test: () => Promise.resolve(true),
            lift: () => Promise.reject(error)
          }
        }
      });

      throw new Error('applying enhancers should have thrown an error');
    } catch (e) {
      assert.equal(e, error);
    }
  });

  test('that no liftEnhancers are applied if none are provided', async () => {
    await applyEnhancers({results});
  });
});
