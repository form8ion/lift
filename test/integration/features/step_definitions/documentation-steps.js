import {promises as fs} from 'fs';
import {Given, Then} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Given('the existing README has no section heading', async function () {
  return undefined;
});

Given('the existing README has no badges', async function () {
  this.existingContributingBadges = '';
});

Given('the existing README has existing badges', async function () {
  this.existingContributingBadges = `[![${any.word()}][${any.word()}-badge]][${any.word()}-link]
[![${any.word()}][${any.word()}-badge]][${any.word()}-link]
`;
});

Given('the chosen sub-scaffolder produces badges', async function () {
  this.badges = {
    contribution: {
      [any.word()]: {
        text: any.word(),
        link: any.url(),
        img: any.url()
      },
      [any.word()]: {
        text: any.word(),
        link: any.url(),
        img: any.url()
      }
    }
  };
});

Given('the chosen sub-scaffolder does not produce badges', async function () {
  this.badges = null;
});

Then('the badges from the scaffolder are added to the README', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'),
    `# project-name

<!--status-badges start -->

<!--status-badges end -->

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}${
  Object.entries(this.badges.contribution)
    .map(([name, details]) => `[![${details.text}][${name}-badge]][${name}-link]`)
    .join('\n')
}

<!--contribution-badges end -->

${
  Object.entries(this.badges.contribution)
    .map(([name, details]) => (`[${name}-link]: ${details.link}

[${name}-badge]: ${details.img}`))
    .join('\n\n')
}
`
  );
});

Then('the badges remain as they were in the README', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/README.md`, 'utf-8'),
    `# project-name

<!--status-badges start -->

<!--status-badges end -->

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}
<!--contribution-badges end -->
`
  );
});
