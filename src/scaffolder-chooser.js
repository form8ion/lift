import {Separator} from 'inquirer';
import {prompt} from '@form8ion/overridable-prompts';
import {questionNames} from './question-names';

export default async function (scaffolders, decisions) {
  const {[questionNames.SCAFFOLDER]: chosenScaffolderName} = await prompt(
    [{
      name: questionNames.SCAFFOLDER,
      message: 'Which scaffolder should be executed?',
      type: 'list',
      choices: ['General Maintenance', new Separator(), ...Object.keys(scaffolders)]
    }],
    decisions
  );

  return scaffolders[chosenScaffolderName];
}
