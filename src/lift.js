import {lift} from '@form8ion/project';

import chooseScaffolder from './scaffolder-chooser.js';
import {determineExistingHostDetails} from './vcs.js';

export default async function liftProject({scaffolders, decisions, enhancers}, dependencies) {
  const projectRoot = process.cwd();
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const vcs = await determineExistingHostDetails({projectRoot});
  const results = scaffolder
    ? await scaffolder({projectRoot, vcs, decisions})
    : {};

  return lift({projectRoot, vcs, enhancers, results}, dependencies);
}
