import {Remote, Repository} from '@form8ion/nodegit-wrapper';
import hostedGitInfo from 'hosted-git-info';

export async function determineExistingHostDetails({projectRoot}) {
  const remoteOrigin = await Remote.lookup(await Repository.open(await Repository.discover(projectRoot, 0)), 'origin');
  const {user: owner, project: name, type: host} = hostedGitInfo.fromUrl(remoteOrigin.url());

  return {owner, name, host};
}
