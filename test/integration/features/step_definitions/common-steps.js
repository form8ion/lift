import {After, Before, When} from 'cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
// import {lift, questionNames} from '../../../../lib/index.cjs';
import {lift, questionNames} from '../../../../src';

Before(async function () {
  stubbedFs({
    'README.md': `# project-name

<!--status-badges start -->
<!--status-badges end -->

<!--consumer-badges start -->
<!--consumer-badges end -->

<!--contribution-badges start -->
<!--contribution-badges end -->`
  });

  this.contributingBadgeName = any.word();
  this.contributingBadgeText = any.word();
  this.contributingBadgeLink = any.url();
  this.contributingBadgeImg = any.url();
});

After(function () {
  stubbedFs.restore();
});

When('the project is lifted', async function () {
  const chosenScaffolder = any.word();

  await lift({
    scaffolders: {
      [chosenScaffolder]: () => ({
        badges: {
          contribution: {
            [this.contributingBadgeName]: {
              text: this.contributingBadgeText,
              link: this.contributingBadgeLink,
              img: this.contributingBadgeImg
            }
          }
        }
      })
    },
    decisions: {[questionNames.SCAFFOLDER]: chosenScaffolder}
  });
});
