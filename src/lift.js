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

  const [enhancerResults] = await Promise.all([
    applyEnhancers({results, enhancers, projectRoot}),
    liftReadme({projectRoot, results})
  ]);

  reportResults({nextSteps: [...results.nextSteps || [], ...enhancerResults.nextSteps || []]});
}
