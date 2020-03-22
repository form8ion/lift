import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import * as chooser from './scaffolder-chooser';
import lift from './lift';

suite('lift', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(process, 'cwd');
    sandbox.stub(chooser, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the chosen scaffolder is executed', async () => {
    const scaffolders = any.simpleObject();
    const decisions = any.simpleObject();
    const chosenScaffolder = sinon.spy();
    const projectPath = any.string();
    chooser.default.withArgs(scaffolders, decisions).resolves(chosenScaffolder);
    process.cwd.returns(projectPath);

    await lift({scaffolders, decisions});

    assert.calledWith(chosenScaffolder, {projectRoot: projectPath});
  });
});
