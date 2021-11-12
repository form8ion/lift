import {Remote, Repository} from 'nodegit';
import hostedGitInfo from 'hosted-git-info';

export async function determineExistingHostDetails({projectRoot}) {
  const remoteOrigin = await Remote.lookup(await Repository.open(projectRoot), 'origin');
  const {user: owner, project: name, type: host} = hostedGitInfo.fromUrl(remoteOrigin.url());

  return {owner, name, host};
}
