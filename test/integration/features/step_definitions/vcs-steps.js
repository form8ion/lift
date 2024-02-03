import {Given, Then} from '@cucumber/cucumber';
import * as td from 'testdouble';
import {assert} from 'chai';
import any from '@travi/any';

Given('the repository hosted on {string}', async function (vcsHost) {
  this.gitHostAccount = any.word();
  this.repositoryName = any.word();
  this.vcsHost = vcsHost;

  td
    .when(this.simpleGitInstance.remote(['get-url', 'origin']))
    .thenResolve(`git@${vcsHost}:${this.gitHostAccount}/${this.repositoryName}.git\n`);
});

Then('vcs details are provided to the enhancers', async function () {
  const expectedVcsDetails = {owner: this.gitHostAccount, name: this.repositoryName, host: this.vcsHost};

  assert.deepEqual(this.vcsDetailsProvidedToEnhancer, expectedVcsDetails);
});
