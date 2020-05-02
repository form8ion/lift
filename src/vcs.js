import hostedGitInfo from 'hosted-git-info';

export function determineExistingHostDetails() {
  const {user: owner, project: name} = hostedGitInfo.fromUrl();

  return {owner, name};
}
