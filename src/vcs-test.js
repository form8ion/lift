import {Remote, Repository} from 'nodegit';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import hostedGitInfo from 'hosted-git-info';
import {determineExistingHostDetails} from './vcs';

suite('vcs', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(Repository, 'open');
    sandbox.stub(Remote, 'lookup');
    sandbox.stub(hostedGitInfo, 'fromUrl');
  });

  teardown(() => sandbox.restore());

  suite('existing host details', () => {
    test('that the existing details are determined from the remote origin', async () => {
      const owner = any.word();
      const name = any.word();
      const remoteUrl = any.url();
      const repository = any.simpleObject();
      const projectRoot = any.string();
      Repository.open.withArgs(projectRoot).resolves(repository);
      Remote.lookup.withArgs(repository, 'origin').resolves({url: () => remoteUrl});
      hostedGitInfo.fromUrl.withArgs(remoteUrl).returns({user: owner, project: name});

      assert.deepEqual(await determineExistingHostDetails({projectRoot}), {owner, name});
    });
  });
});
