import { environment } from '@envs/environment';
import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces/github-issue.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumberComments = async (issueNumber: string): Promise<GitHubIssue[]> => {
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue comments";

    const issueComments: GitHubIssue[] = await resp.json();

    console.log({ issueComments: issueComments });

    return issueComments;
  } catch (error) {
    throw "Can't load issue comments";
  }
};
