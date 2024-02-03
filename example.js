// #### Import
// remark-usage-ignore-next 2
import stubbedFs from 'mock-fs';
import * as td from 'testdouble';

// remark-usage-ignore-next 4
const {simpleGit} = await td.replaceEsm('simple-git');
const simpleGitInstance = td.object(['remote']);
td.when(simpleGit(process.cwd())).thenReturn(simpleGitInstance);
td.when(simpleGitInstance.remote(['get-url', 'origin'])).thenResolve('git@github.com:form8ion/lift.git');

const {lift, questionNames} = await import('./lib/index.js');

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  await lift({scaffolders: {}, decisions: {[questionNames.SCAFFOLDER]: 'foo'}, enhancers: {}});
})();

// remark-usage-ignore-next
stubbedFs.restore();
