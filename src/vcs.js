import {simpleGit} from 'simple-git';
import parseGitUrl from 'git-url-parse';

export async function determineExistingHostDetails({projectRoot}) {
  const git = simpleGit({baseDir: projectRoot});
  const remoteOrigin = await git.remote(['get-url', 'origin']);
  const {owner, name, host} = parseGitUrl(remoteOrigin.trimEnd());

  return {owner, name, host};
}
