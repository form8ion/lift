import * as project from '@form8ion/project';
import * as resultsReporter from '@form8ion/results-reporter';

import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';

import * as chooser from './scaffolder-chooser';
import * as vcs from './vcs';
import lift from './lift';

suite('lift', () => {
  let sandbox;
  const projectPath = any.string();
  const scaffolders = any.simpleObject();
  const decisions = any.simpleObject();
  const enhancers = any.simpleObject();
  const liftProjectNextSteps = any.listOf(any.simpleObject);
  const liftProjectResults = {...any.simpleObject(), nextSteps: liftProjectNextSteps};
  const vcsDetails = any.simpleObject();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(process, 'cwd');
    sandbox.stub(chooser, 'default');
    sandbox.stub(vcs, 'determineExistingHostDetails');
    sandbox.stub(resultsReporter, 'reportResults');
    sandbox.stub(project, 'lift');

    process.cwd.returns(projectPath);
    vcs.determineExistingHostDetails.withArgs({projectRoot: projectPath}).resolves(vcsDetails);
  });

  teardown(() => sandbox.restore());

  test('that the chosen scaffolder is executed', async () => {
    const chosenScaffolder = sinon.stub();
    const scaffolderResults = {...any.simpleObject(), nextSteps: any.listOf(any.sentence)};
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    chosenScaffolder.withArgs({projectRoot: projectPath, vcs: vcsDetails, decisions}).resolves(scaffolderResults);
    project.lift
      .withArgs({projectRoot: projectPath, results: scaffolderResults, vcs: vcsDetails, enhancers})
      .resolves(liftProjectResults);

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(resultsReporter.reportResults, {nextSteps: liftProjectNextSteps});
  });

  test('that choosing `General Maintenance` runs the enhancers without erroring', async () => {
    chooser.default.resolves(undefined);
    project.lift
      .withArgs({projectRoot: projectPath, results: {}, vcs: vcsDetails, enhancers})
      .resolves(liftProjectResults);

    await lift({scaffolders, decisions, enhancers});

    assert.calledWith(resultsReporter.reportResults, {nextSteps: liftProjectNextSteps});
  });
});
