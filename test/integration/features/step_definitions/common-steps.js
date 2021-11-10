import {promises as fs} from 'fs';
import {prompt} from '@form8ion/overridable-prompts';

import {After, Before, When} from 'cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

import {lift, questionNames} from '../../../../src';

Before(async function () {
  stubbedFs({'README.md': ''});
});

After(function () {
  stubbedFs.restore();
});

When('the project is lifted', async function () {
  const SCAFFOLDER_PROMPT_QUESTION_NAME = any.word();
  const chosenScaffolder = this.chosenScaffolder || any.word();

  await fs.writeFile(`${process.cwd()}/README.md`, this.existingReadmeContent || '');

  await lift({
    scaffolders: {
      ...!this.chosenScaffolder && {
        [chosenScaffolder]: async ({decisions}) => {
          await prompt(
            [{
              name: SCAFFOLDER_PROMPT_QUESTION_NAME,
              message: 'This is a question that needs a provided decision to proceed'
            }],
            decisions
          );

          return {badges: this.badges};
        }
      }
    },
    decisions: {
      [questionNames.SCAFFOLDER]: chosenScaffolder,
      [SCAFFOLDER_PROMPT_QUESTION_NAME]: any.word()
    }
  });
});
