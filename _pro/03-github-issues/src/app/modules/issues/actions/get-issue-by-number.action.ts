import { environment } from '@envs/environment';
import { sleep } from '@helpers/sleep';
import { GitHubIssue } from '../interfaces/github-issue.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {
  console.log('GetIssue By Number Called');
  await sleep(1500);

  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw "Can't load issue";

    const issue: GitHubIssue = await resp.json();

    console.log({ issue: issue });

    return issue;
  } catch (error) {
    throw "Can't load issue";
  }
};
