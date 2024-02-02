import * as simpleGit from 'simple-git';
import GitUrlParse from 'git-url-parse';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import {determineExistingHostDetails} from './vcs.js';

vi.mock('simple-git');
vi.mock('git-url-parse');

describe('vcs', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should determine the existing details from the remote origin', async () => {
    const owner = any.word();
    const name = any.word();
    const host = any.word();
    const remoteUrl = any.url();
    const projectRoot = any.string();
    const remote = vi.fn();
    when(simpleGit.simpleGit).calledWith(projectRoot).mockReturnValue({remote});
    when(remote).calledWith(['get-url', 'origin']).mockResolvedValue(remoteUrl);
    when(GitUrlParse).calledWith(remoteUrl).mockReturnValue({user: owner, project: name, type: host});

    expect(await determineExistingHostDetails({projectRoot})).toEqual({owner, name, host});
  });
});
