import * as overridablePrompts from '@form8ion/overridable-prompts';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import choose from './scaffolder-chooser';
import {questionNames} from './question-names';

vi.mock('@form8ion/overridable-prompts');

describe('scaffolder chooser', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the chosen scaffolder function', async () => {
    const chosenScaffolderName = any.word();
    const chosenScaffolerFunction = () => undefined;
    const scaffolders = {...any.simpleObject(), [chosenScaffolderName]: chosenScaffolerFunction};
    const decisions = any.simpleObject();
    when(overridablePrompts.prompt).calledWith(
      [{
        name: questionNames.SCAFFOLDER,
        message: 'Which scaffolder should be executed?',
        type: 'list',
        choices: ['General Maintenance', new overridablePrompts.Separator(), ...Object.keys(scaffolders)]
      }],
      decisions
    ).mockResolvedValue({[questionNames.SCAFFOLDER]: chosenScaffolderName});

    expect(await choose(scaffolders, decisions)).toBe(chosenScaffolerFunction);
  });
});
