import {promises as fs} from 'fs';
import {Before, Given, Then} from 'cucumber';
import {assert} from 'chai';
import any from '@travi/any';

Before(function () {
  this.badgeDefinitions = [];
});

Given('the existing README has no section heading', async function () {
  return undefined;
});

Given('the existing README has no badges', async function () {
  this.existingContributingBadges = '';
});

Given('the existing README has existing badges', async function () {
  const imageReference = `${any.word()}-badge`;
  const linkReference = `${any.word()}-link`;
  const otherImageReference = `${any.word()}-badge`;
  const otherLinkReference = `${any.word()}-link`;

  this.existingContributingBadges = `[![${any.word()}][${imageReference}]][${linkReference}]
[![${any.word()}][${otherImageReference}]][${otherLinkReference}]
`;
  this.badgeDefinitions.push(`[${imageReference}]: ${any.url()}

[${linkReference}]: ${any.url()}`);
  this.badgeDefinitions.push(`[${otherImageReference}]: ${any.url()}

[${otherLinkReference}]: ${any.url()}`);
});

Given('the chosen sub-scaffolder produces badges', async function () {
  this.scaffolderBadges = {
    contribution: {
      [any.word()]: {
        text: any.word(),
        link: any.url(),
        img: any.url()
      },
      [any.word()]: {
        text: any.word(),
        img: any.url()
      }
    }
  };
});

Given('the enhancers produce badges', async function () {
  this.enhancerBadges = {
    contribution: {
      [any.word()]: {
        text: any.word(),
        link: any.url(),
        img: any.url()
      },
      [any.word()]: {
        text: any.word(),
        img: any.url()
      }
    }
  };
});

Given('the chosen sub-scaffolder does not produce badges', async function () {
  this.scaffolderBadges = null;
});

Given('the existing README uses modern badge zones', async function () {
  this.existingReadmeContent = `# project-name

<!--status-badges start -->
<!--status-badges end -->

1. item 1
1. item 2

<!--consumer-badges start -->
<!--consumer-badges end -->

<!--contribution-badges start -->
${this.existingContributingBadges}
<!--contribution-badges end -->

${this.badgeDefinitions.join('\n\n')}`;
});

Given('the existing README uses legacy badge section markers', async function () {
  this.existingReadmeContent = `# project-name

<!-- status badges -->

1. item 1
1. item 2

<!-- consumer badges -->

<!-- contribution badges -->
${this.existingContributingBadges}

${this.badgeDefinitions.join('\n\n')}`;
});

Then('the badges from the scaffolder/enhancers are added to the README', async function () {
  const actual = await fs.readFile(`${process.cwd()}/README.md`, 'utf-8');

  assert.equal(
    actual,
    `# project-name

<!--status-badges start -->

<!--status-badges end -->

1. item 1
1. item 2

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}${
  this.scaffolderBadges
    ? Object.entries(this.scaffolderBadges.contribution)
      .map(([name, details]) => (
        details.link
          ? `[![${details.text}][${name}-badge]][${name}-link]`
          : `![${details.text}][${name}-badge]`
      ))
      .join('\n')
    : ''
}${
  this.enhancerBadges
    ? Object.entries(this.enhancerBadges.contribution)
      .map(([name, details]) => (
        details.link
          ? `[![${details.text}][${name}-badge]][${name}-link]`
          : `![${details.text}][${name}-badge]`
      ))
      .join('\n')
    : ''
}

<!--contribution-badges end -->${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}
` : `
`}
${
  this.scaffolderBadges
    ? Object.entries(this.scaffolderBadges.contribution)
      .map(([name, details]) => (`${details.link
        ? `[${name}-link]: ${details.link}

`
        : ''
      }[${name}-badge]: ${details.img}`))
      .join('\n\n')
    : ''
}${
  this.enhancerBadges
    ? Object.entries(this.enhancerBadges.contribution)
      .map(([name, details]) => (`${details.link
        ? `[${name}-link]: ${details.link}

`
        : ''
      }[${name}-badge]: ${details.img}`))
      .join('\n\n')
    : ''
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

1. item 1
1. item 2

<!--consumer-badges start -->

<!--consumer-badges end -->

<!--contribution-badges start -->

${this.existingContributingBadges}
<!--contribution-badges end -->${this.badgeDefinitions.length ? `

${this.badgeDefinitions.join('\n\n')}
` : `
`}`
  );
});
