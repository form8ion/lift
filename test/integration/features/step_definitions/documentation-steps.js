import {promises as fs} from 'fs';
import {Given, Then} from 'cucumber';
import {assert} from 'chai';

Given('the existing README has no section heading', async function () {
  return undefined;
});

Given('the existing README has no badges', async function () {
  return undefined;
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

[![${this.contributingBadgeText}][${this.contributingBadgeName}-badge]][${this.contributingBadgeName}-link]

<!--contribution-badges end -->

[${this.contributingBadgeName}-link]: ${this.contributingBadgeLink}

[${this.contributingBadgeName}-badge]: ${this.contributingBadgeImg}
`
  );
});
