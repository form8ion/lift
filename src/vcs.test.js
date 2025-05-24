import * as simpleGit from 'simple-git';
import GitUrlParse from 'git-url-parse';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'vitest-when';

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

    when(simpleGit.simpleGit).calledWith({baseDir: projectRoot}).thenReturn({remote});
    when(remote).calledWith(['get-url', 'origin']).thenResolve(`${remoteUrl}\n`);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should determine the existing details from the remote origin', async () => {
    const host = any.word();
    when(GitUrlParse).calledWith(remoteUrl).thenReturn({owner, name, host});

    expect(await determineExistingHostDetails({projectRoot})).toEqual({owner, name, host});
  });

  it(
    'should return `github` when the host is determined to be `github.com` until that can be a breaking change',
    async () => {
      const host = 'github.com';
      when(GitUrlParse).calledWith(remoteUrl).thenReturn({owner, name, host});

      expect(await determineExistingHostDetails({projectRoot})).toEqual({owner, name, host: 'github'});
    }
  );
});
