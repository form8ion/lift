import deepmerge from 'deepmerge';
import {applyEnhancers} from '@form8ion/core';
import {lift as liftReadme} from '@form8ion/readme';
import {reportResults} from '@form8ion/results-reporter';

import chooseScaffolder from './scaffolder-chooser';
import {determineExistingHostDetails} from './vcs';

export default async function ({scaffolders, decisions, enhancers}) {
  const projectRoot = process.cwd();
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const vcs = await determineExistingHostDetails({projectRoot});
  const results = scaffolder
    ? await scaffolder({projectRoot, vcs, decisions})
    : {};

  const enhancerResults = await applyEnhancers({results, enhancers, options: {projectRoot, vcs}});

  await liftReadme({projectRoot, results: deepmerge(results, enhancerResults)});

  reportResults({nextSteps: [...results.nextSteps || [], ...enhancerResults.nextSteps || []]});
}
