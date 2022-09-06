import {promises as fs} from 'node:fs';
import {prompt} from '@form8ion/overridable-prompts';

import {After, Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {lift, questionNames} from '@form8ion/lift';

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

          return {badges: this.scaffolderBadges};
        }
      }
    },
    enhancers: {
      [any.word()]: {
        test: () => true,
        lift: () => ({...this.enhancerBadges && {badges: this.enhancerBadges}})
      }
    },
    decisions: {
      [questionNames.SCAFFOLDER]: chosenScaffolder,
      [SCAFFOLDER_PROMPT_QUESTION_NAME]: any.word()
    }
  });
});