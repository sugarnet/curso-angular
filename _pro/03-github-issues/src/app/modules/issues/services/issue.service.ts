import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions';
import { getIssueByNumberComments } from '../actions/get-issue-by-number-comments.action';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private issueNumber = signal<string | null>(null);

  issueQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue-comments', this.issueNumber(), 'comments'],
    queryFn: () => getIssueByNumberComments(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueNumber: string) {
    this.issueNumber.set(issueNumber);
  }
}
