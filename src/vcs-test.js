import * as simpleGit from 'simple-git';
import hostedGitInfo from 'hosted-git-info';

import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

import {determineExistingHostDetails} from './vcs';

suite('vcs', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(simpleGit, 'simpleGit');
    sandbox.stub(hostedGitInfo, 'fromUrl');
  });

  teardown(() => sandbox.restore());

  suite('existing host details', () => {
    test('that the existing details are determined from the remote origin', async () => {
      const owner = any.word();
      const name = any.word();
      const host = any.word();
      const remoteUrl = any.url();
      const projectRoot = any.string();
      const remote = sinon.stub();
      simpleGit.simpleGit.withArgs(projectRoot).returns({remote});
      remote.withArgs(['get-url', 'origin']).resolves(remoteUrl);
      hostedGitInfo.fromUrl.withArgs(remoteUrl).returns({user: owner, project: name, type: host});

      assert.deepEqual(await determineExistingHostDetails({projectRoot}), {owner, name, host});
    });
  });
});
