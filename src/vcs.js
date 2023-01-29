import {simpleGit} from 'simple-git';
import hostedGitInfo from 'hosted-git-info';

export async function determineExistingHostDetails({projectRoot}) {
  const git = simpleGit(projectRoot);
  const remoteOrigin = await git.remote(['get-url', 'origin']);
  const {user: owner, project: name, type: host} = hostedGitInfo.fromUrl(remoteOrigin);

  return {owner, name, host};
}
