import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: 'search-box.component.html',
})
export class SearchBoxComponent {
  constructor() {}

  @ViewChild('txtTagInput')
  public txtTagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.txtTagInput.nativeElement.value;
    console.log({ newTag });
  }
}
