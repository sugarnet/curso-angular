import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'alone-count',
  standalone: true,
  // imports: [CommonModule],
  templateUrl: './alone-count.component.html',
  styleUrl: './alone-count.component.css'
})
export class AloneCountComponent {

  @Input()
  public counter: number = 10;
}
