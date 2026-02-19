import { environment } from '@envs/environment';
import { getIssueByNumber } from './get-issue-by-number.action';

const mockIssue = {
  id: 1,
  number: 123,
  title: 'Test Issue',
  body: 'Test Body',
};

const BASE_URL = environment.baseUrl;

describe('getIssueByNumber', () => {
  const mockIssueNumber = '123';
  let originalFetch: typeof window.fetch;

  beforeEach(() => {
    originalFetch = window.fetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it('should fetch and return an issue succefully', async () => {
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockIssue),
    });
    const result = await getIssueByNumber(mockIssueNumber);

    expect(window.fetch).toHaveBeenCalledWith(`${BASE_URL}/issues/${mockIssueNumber}`, {
      headers: {
        Authorization: `Bearer ${environment.gitHubToken}`,
      },
    });
    expect(result).toEqual(mockIssue);
  });

  it('should throw and error when response is not ok', async () => {
    window.fetch = vi.fn().mockRejectedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    });

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber}`,
    );
  });

  it('should throw and error when fetch fails', async () => {
    window.fetch = vi.fn().mockRejectedValue(new Error('Network Error'));

    await expect(getIssueByNumber(mockIssueNumber)).rejects.toBe(
      `Can't load issue ${mockIssueNumber}`,
    );
  });
});
