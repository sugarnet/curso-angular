import { Component, inject } from '@angular/core';
import { IssueItem } from '../../components/issue-item/issue-item';
import { IssueLabelsSelector } from '../../components/labels-selector/issue-labels-selector';
import { IssuesService } from '../../services/issues.service';
import { State } from '../../interfaces';

@Component({
  selector: 'app-issues-list-page',
  imports: [IssueLabelsSelector, IssueItem],
  templateUrl: './issues-list-page.html',
})
export default class IssuesListPage {
  issuesService = inject(IssuesService);

  get labelsQuery() {
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() {
    return this.issuesService.issuesQuery;
  }

  onChangeState(newState: string) {
    const state =
      {
        all: State.All,
        open: State.Open,
        closed: State.Closed,
      }[newState] ?? State.All;

    this.issuesService.showIssuesByState(state);
  }
}
