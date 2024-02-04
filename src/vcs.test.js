import * as simpleGit from 'simple-git';
import GitUrlParse from 'git-url-parse';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import {determineExistingHostDetails} from './vcs.js';

vi.mock('simple-git');
vi.mock('git-url-parse');

describe('vcs', () => {
  const projectRoot = any.string();
  const owner = any.word();
  const name = any.word();
  const remoteUrl = any.url();

  beforeEach(() => {
    const remote = vi.fn();

    when(simpleGit.simpleGit).calledWith({baseDir: projectRoot}).mockReturnValue({remote});
    when(remote).calledWith(['get-url', 'origin']).mockResolvedValue(`${remoteUrl}\n`);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should determine the existing details from the remote origin', async () => {
    const host = any.word();
    when(GitUrlParse).calledWith(remoteUrl).mockReturnValue({owner, name, host});

    expect(await determineExistingHostDetails({projectRoot})).toEqual({owner, name, host});
  });

  it(
    'should return `github` when the host is determined to be `github.com` until that can be a breaking change',
    async () => {
      const host = 'github.com';
      when(GitUrlParse).calledWith(remoteUrl).mockReturnValue({owner, name, host});

      expect(await determineExistingHostDetails({projectRoot})).toEqual({owner, name, host: 'github'});
    }
  );
});
