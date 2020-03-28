import chooseScaffolder from './scaffolder-chooser';
import liftDocumentation from './documentation';

export default async function ({scaffolders, decisions}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);
  const results = await scaffolder({projectRoot: process.cwd()});

  await liftDocumentation(results);
}
