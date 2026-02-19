import { environment } from '@envs/environment';
import { GitHubIssue } from '../interfaces/github-issue.interface';

const BASE_URL = environment.baseUrl;
const GITHUB_TOKEN = environment.gitHubToken;

export const getIssueByNumberComments = async (issueNumber: string): Promise<GitHubIssue[]> => {
  try {
    const resp = await fetch(`${BASE_URL}/issues/${issueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!resp.ok) throw `Can't load issue ${issueNumber} comments`;

    const issueComments: GitHubIssue[] = await resp.json();

    return issueComments;
  } catch (error) {
    throw `Can't load issue ${issueNumber} comments`;
  }
};
