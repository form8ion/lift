import {Separator} from 'inquirer';
import * as overridablePrompts from '@form8ion/overridable-prompts';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {questionNames} from './question-names';
import choose from './scaffolder-chooser';

suite('scaffolder chooser', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(overridablePrompts, 'prompt');
  });

  teardown(() => sandbox.restore());

  test('that the chosen scaffolder function is returned', async () => {
    const chosenScaffolderName = any.word();
    const chosenScaffolerFunction = () => undefined;
    const scaffolders = {...any.simpleObject(), [chosenScaffolderName]: chosenScaffolerFunction};
    const decisions = any.simpleObject();
    overridablePrompts.prompt
      .withArgs(
        [{
          name: questionNames.SCAFFOLDER,
          message: 'Which scaffolder should be executed?',
          type: 'list',
          choices: ['General Maintenance', new Separator(), Object.keys(scaffolders)]
        }],
        decisions
      )
      .resolves({[questionNames.SCAFFOLDER]: chosenScaffolderName});

    assert.equal(await choose(scaffolders, decisions), chosenScaffolerFunction);
  });
});
