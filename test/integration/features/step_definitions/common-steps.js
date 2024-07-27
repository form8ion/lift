import {promises as fs} from 'node:fs';
import {prompt} from '@form8ion/overridable-prompts';

import {After, Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
import * as td from 'testdouble';

let lift, questionNames;

Before(async function () {
  const {simpleGit} = await td.replaceEsm('simple-git');
  this.simpleGitInstance = td.object(['remote', 'checkIsRepo']);
  td.when(simpleGit({baseDir: process.cwd()})).thenReturn(this.simpleGitInstance);

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  ({lift, questionNames} = await import('@form8ion/lift'));

  stubbedFs({'README.md': ''});
});

After(function () {
  stubbedFs.restore();
  td.reset();
});

When('the project is lifted', async function () {
  const SCAFFOLDER_PROMPT_QUESTION_NAME = any.word();
  const chosenScaffolder = this.chosenScaffolder || any.word();

  await fs.writeFile(`${process.cwd()}/README.md`, this.existingReadmeContent || '');

  await lift({
    scaffolders: {
      ...!this.chosenScaffolder && {
        [chosenScaffolder]: async ({decisions, vcs}) => {
          await prompt(
            [{
              name: SCAFFOLDER_PROMPT_QUESTION_NAME,
              message: 'This is a question that needs a provided decision to proceed'
            }],
            decisions
          );

          this.vcsDetailsProvidedToScaffolder = vcs;

          return {badges: this.scaffolderBadges};
        }
      }
    },
    enhancers: {
      [any.word()]: {
        test: () => true,
        lift: ({vcs}) => {
          this.vcsDetailsProvidedToEnhancer = vcs;

          return {...this.enhancerBadges && {badges: this.enhancerBadges}};
        }
      }
    },
    decisions: {
      [questionNames.SCAFFOLDER]: chosenScaffolder,
      [SCAFFOLDER_PROMPT_QUESTION_NAME]: any.word()
    }
  });
});
