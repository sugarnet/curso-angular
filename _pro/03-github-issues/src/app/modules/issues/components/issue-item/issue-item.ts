import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './issue-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  issue = input.required<GitHubIssue>();

  get isOpen() {
    return this.issue().state === State.Open;
  }
}
