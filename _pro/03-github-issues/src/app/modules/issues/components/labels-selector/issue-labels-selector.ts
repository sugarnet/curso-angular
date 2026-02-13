import { NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { GitHubLabel } from './../../interfaces/github-label.interface';

@Component({
  selector: 'issue-labels-selector',
  imports: [NgStyle],
  templateUrl: './issue-labels-selector.html',
})
export class IssueLabelsSelector {
  labels = input.required<GitHubLabel[]>();
  issuesService = inject(IssuesService);

  onToggleLabel(label: string) {
    this.issuesService.toggleLabel(label);
  }

  isLabelSelected(label: string) {
    return this.issuesService.selectedLabels().has(label);
  }
}
