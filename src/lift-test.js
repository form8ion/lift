import * as resultsReporter from '@form8ion/results-reporter';
import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import * as chooser from './scaffolder-chooser';
import * as documentation from './documentation';
import * as liftEnhancers from './enhancers';
import lift from './lift';

suite('lift', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(process, 'cwd');
    sandbox.stub(chooser, 'default');
    sandbox.stub(documentation, 'default');
    sandbox.stub(liftEnhancers, 'default');
    sandbox.stub(resultsReporter, 'reportResults');
  });

  teardown(() => sandbox.restore());

  test('that the chosen scaffolder is executed', async () => {
    const scaffolders = any.simpleObject();
    const enhancers = any.simpleObject();
    const decisions = any.simpleObject();
    const chosenScaffolder = sinon.stub();
    const projectPath = any.string();
    const scaffolderResults = {...any.simpleObject(), nextSteps: any.listOf(any.sentence)};
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    chosenScaffolder.withArgs({projectRoot: projectPath}).resolves(scaffolderResults);
    process.cwd.returns(projectPath);

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(documentation.default, {results: scaffolderResults, projectRoot: projectPath});
    assert.calledWith(liftEnhancers.default, {results: scaffolderResults, enhancers});
    assert.calledWith(resultsReporter.reportResults, {nextSteps: scaffolderResults.nextSteps});
  });
});
