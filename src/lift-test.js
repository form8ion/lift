import * as readme from '@form8ion/readme';
import * as resultsReporter from '@form8ion/results-reporter';
import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import * as chooser from './scaffolder-chooser';
import * as liftEnhancers from './enhancers';
import * as vcs from './vcs';
import lift from './lift';

suite('lift', () => {
  let sandbox;
  const projectPath = any.string();
  const scaffolders = any.simpleObject();
  const decisions = any.simpleObject();
  const enhancers = any.simpleObject();
  const liftEnhancerResults = any.listOf(any.simpleObject);
  const vcsDetails = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(process, 'cwd');
    sandbox.stub(chooser, 'default');
    sandbox.stub(liftEnhancers, 'default');
    sandbox.stub(vcs, 'determineExistingHostDetails');
    sandbox.stub(resultsReporter, 'reportResults');
    sandbox.stub(readme, 'lift');

    process.cwd.returns(projectPath);
  });

  teardown(() => sandbox.restore());

  test('that the chosen scaffolder is executed', async () => {
    const chosenScaffolder = sinon.stub();
    const scaffolderResults = {...any.simpleObject(), nextSteps: any.listOf(any.sentence)};
    vcs.determineExistingHostDetails.withArgs({projectRoot: projectPath}).resolves(vcsDetails);
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    chosenScaffolder.withArgs({projectRoot: projectPath, vcs: vcsDetails}).resolves(scaffolderResults);
    liftEnhancers.default
      .withArgs({results: scaffolderResults, enhancers, projectRoot: projectPath})
      .returns({nextSteps: liftEnhancerResults});

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(readme.lift, {results: scaffolderResults, projectRoot: projectPath});
    assert.calledWith(
      resultsReporter.reportResults,
      {nextSteps: [...scaffolderResults.nextSteps, ...liftEnhancerResults]}
    );
  });

  test('that a scaffolder that provides no `nextSteps` is handled as an empty list', async () => {
    const chosenScaffolder = sinon.stub();
    const scaffolderResults = any.simpleObject();
    vcs.determineExistingHostDetails.withArgs({projectRoot: projectPath}).resolves(vcsDetails);
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    liftEnhancers.default.returns({nextSteps: liftEnhancerResults});
    chosenScaffolder.withArgs({projectRoot: projectPath, vcs: vcsDetails}).resolves(scaffolderResults);

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(resultsReporter.reportResults, {nextSteps: liftEnhancerResults});
  });

  test('that no `nextSteps` from enhancers is handled as an empty list', async () => {
    const chosenScaffolder = sinon.stub();
    const scaffolderNextSteps = any.listOf(any.sentence);
    const scaffolderResults = {...any.simpleObject(), nextSteps: scaffolderNextSteps};
    vcs.determineExistingHostDetails.withArgs({projectRoot: projectPath}).resolves(vcsDetails);
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    liftEnhancers.default.returns({});
    chosenScaffolder.withArgs({projectRoot: projectPath, vcs: vcsDetails}).resolves(scaffolderResults);

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(resultsReporter.reportResults, {nextSteps: scaffolderNextSteps});
  });

  test('that choosing `General Maintenance` runs the enhancers without erroring', async () => {
    chooser.default.resolves(undefined);
    liftEnhancers.default
      .withArgs({results: {}, enhancers, projectRoot: projectPath})
      .returns({nextSteps: liftEnhancerResults});

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(readme.lift, {results: {}, projectRoot: projectPath});
    assert.calledWith(resultsReporter.reportResults, {nextSteps: liftEnhancerResults});
  });
});
