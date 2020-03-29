import {After, Before, When} from 'cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';
import {lift, questionNames} from '../../../../lib/index.cjs';

Before(async function () {
  stubbedFs({});
});

After(function () {
  stubbedFs.restore();
});

When('the project is lifted', async function () {
  const chosenScaffolder = any.word();

  await lift({
    scaffolders: {[chosenScaffolder]: () => undefined},
    decisions: {[questionNames.SCAFFOLDER]: chosenScaffolder}
  });
});
