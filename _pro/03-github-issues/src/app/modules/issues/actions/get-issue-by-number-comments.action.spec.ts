import { environment } from '@envs/environment';
import { getIssueByNumberComments } from './get-issue-by-number-comments.action';

const mockComments = [
  {
    id: 1,
    number: 123,
    title: 'Test Comment 1',
    body: 'Test Body 1',
  },
  {
    id: 2,
    number: 223,
    title: 'Test Comment 2',
    body: 'Test Body 2',
  },
];

const BASE_URL = environment.baseUrl;

describe('getIssueByNumberComments', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('should fetch and return comments succefully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockComments),
    });
    const result = await getIssueByNumberComments(mockIssueNumber);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}/comments`, {
      headers: {
        Authorization: `Bearer ${environment.gitHubToken}`,
      },
    });
    expect(result).toEqual(mockComments);
  });

  it('should throw and error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    await expect(getIssueByNumberComments(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber} comments`,
    );
  });

  it('should throw and error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(getIssueByNumberComments(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber} comments`,
    );
  });
});
