import {reportResults} from '@form8ion/results-reporter';
import chooseScaffolder from './scaffolder-chooser';
import liftDocumentation from './documentation';

export default async function ({scaffolders, decisions}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const projectRoot = process.cwd();
  const results = await scaffolder({projectRoot});

  await liftDocumentation({projectRoot, results});

  reportResults({nextSteps: results.nextSteps});
}
