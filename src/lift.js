import {reportResults} from '@form8ion/results-reporter';
import chooseScaffolder from './scaffolder-chooser';
import {determineExistingHostDetails} from './vcs';
import liftDocumentation from './documentation';
import applyEnhancers from './enhancers';

export default async function ({scaffolders, decisions, enhancers}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const projectRoot = process.cwd();
  const results = await scaffolder({projectRoot, vcs: await determineExistingHostDetails({projectRoot})});

  await Promise.all([
    applyEnhancers({results, enhancers, projectRoot}),
    liftDocumentation({projectRoot, results})
  ]);

  reportResults({nextSteps: results.nextSteps});
}
