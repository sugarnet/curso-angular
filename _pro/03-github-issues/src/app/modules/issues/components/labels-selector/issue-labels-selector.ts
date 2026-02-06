import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'issue-labels-selector',
  imports: [NgStyle],
  templateUrl: './issue-labels-selector.html',
})
export class IssueLabelsSelector {
  labels = input.required<GitHubLabel[]>();
}
