import { Component, input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { GitHubIssue } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'issue-comment',
  imports: [MarkdownModule],
  templateUrl: './issue-comment.html',
})
export class IssueComment {
  issue = input.required<GitHubIssue>();
}
