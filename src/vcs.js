import {simpleGit} from 'simple-git';
import GitUrlParse from 'git-url-parse';

export async function determineExistingHostDetails({projectRoot}) {
  const git = simpleGit(projectRoot);
  const remoteOrigin = await git.remote(['get-url', 'origin']);
  const {user: owner, project: name, type: host} = GitUrlParse(remoteOrigin);

  return {owner, name, host};
}
