import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [RouterLink, CommonModule],
  templateUrl: './issue-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueItem {
  issue = input.required<GitHubIssue>();
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetchData() {
    // this.issueService.prefetchIssue(this.issue().number.toString());
    this.issueService.setIssueData(this.issue());
  }
}
