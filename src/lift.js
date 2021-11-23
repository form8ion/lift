import deepmerge from 'deepmerge';
import {lift as liftReadme} from '@form8ion/readme';
import {reportResults} from '@form8ion/results-reporter';

import chooseScaffolder from './scaffolder-chooser';
import {determineExistingHostDetails} from './vcs';
import applyEnhancers from './enhancers';

export default async function ({scaffolders, decisions, enhancers}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const projectRoot = process.cwd();
  const results = scaffolder
    ? await scaffolder({projectRoot, vcs: await determineExistingHostDetails({projectRoot}), decisions})
    : {};

  const enhancerResults = await applyEnhancers({results, enhancers, projectRoot});

  await liftReadme({projectRoot, results: deepmerge(results, enhancerResults)});

  reportResults({nextSteps: [...results.nextSteps || [], ...enhancerResults.nextSteps || []]});
}
