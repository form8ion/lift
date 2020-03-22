import chooseScaffolder from './scaffolder-chooser';

export default async function ({scaffolders, decisions}) {
  const scaffolder = await chooseScaffolder(scaffolders, decisions);

  scaffolder({projectRoot: process.cwd()});
}
