import * as project from '@form8ion/project';
import * as resultsReporter from '@form8ion/results-reporter';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import * as chooser from './scaffolder-chooser.js';
import * as vcs from './vcs.js';
import lift from './lift.js';

vi.mock('@form8ion/project');
vi.mock('@form8ion/results-reporter');
vi.mock('./scaffolder-chooser.js');
vi.mock('./vcs.js');

describe('lift', () => {
  const originalProcessCwd = process.cwd;
  const projectPath = any.string();
  const scaffolders = any.simpleObject();
  const decisions = any.simpleObject();
  const enhancers = any.simpleObject();
  const liftProjectNextSteps = any.listOf(any.simpleObject);
  const liftProjectResults = {...any.simpleObject(), nextSteps: liftProjectNextSteps};
  const vcsDetails = any.simpleObject();

  beforeEach(() => {
    process.cwd = vi.fn();

    when(vcs.determineExistingHostDetails).calledWith({projectRoot: projectPath}).mockResolvedValue(vcsDetails);
    process.cwd.mockReturnValue(projectPath);
  });

  afterEach(() => {
    vi.clearAllMocks();

    process.cwd = originalProcessCwd;
  });

  it('should execute the chosen scaffolder', async () => {
    const chosenScaffolder = vi.fn();
    const scaffolderResults = {...any.simpleObject(), nextSteps: any.listOf(any.sentence)};
    when(chooser.default).calledWith(scaffolders, decisions).mockResolvedValue(chosenScaffolder);
    when(chosenScaffolder)
      .calledWith({projectRoot: projectPath, vcs: vcsDetails, decisions})
      .mockResolvedValue(scaffolderResults);
    when(project.lift)
      .calledWith({projectRoot: projectPath, results: scaffolderResults, vcs: vcsDetails, enhancers})
      .mockResolvedValue(liftProjectResults);

    await lift({scaffolders, decisions, enhancers});

    expect(resultsReporter.reportResults).toHaveBeenCalledWith({nextSteps: liftProjectNextSteps});
  });

  it('should run the enhancers without erroring when choosing `General Maintenance`', async () => {
    chooser.default.mockResolvedValue(undefined);
    when(project.lift)
      .calledWith({projectRoot: projectPath, results: {}, vcs: vcsDetails, enhancers})
      .mockResolvedValue(liftProjectResults);

    await lift({scaffolders, decisions, enhancers});

    expect(resultsReporter.reportResults).toHaveBeenCalledWith({nextSteps: liftProjectNextSteps});
  });
});
