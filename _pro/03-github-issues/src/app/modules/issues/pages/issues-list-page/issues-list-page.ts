import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { IssueLabelsSelector } from '../../components/labels-selector/issue-labels-selector';

@Component({
  selector: 'app-issues-list-page',
  imports: [RouterLink, IssueLabelsSelector],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  private issueService = inject(IssueService);

  get labelsQuery() {
    return this.issueService.labelsQuery;
  }
}
