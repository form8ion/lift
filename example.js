// #### Import
// remark-usage-ignore-next
import stubbedFs from 'mock-fs';
import {lift, questionNames} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  await lift({scaffolders: {}, decisions: {[questionNames.SCAFFOLDER]: 'foo'}, enhancers: {}});
})();

// remark-usage-ignore-next
stubbedFs.restore();
