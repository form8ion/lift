import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import hostedGitInfo from 'hosted-git-info';
import {determineExistingHostDetails} from './vcs';

suite('vcs', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(hostedGitInfo, 'fromUrl');
  });

  teardown(() => sandbox.restore());

  suite('existing host details', () => {
    test('that the existing details are determined from the remote origin', async () => {
      const owner = any.word();
      const name = any.word();
      hostedGitInfo.fromUrl.returns({user: owner, project: name});

      assert.deepEqual(await determineExistingHostDetails(), {owner, name});
    });
  });
});
