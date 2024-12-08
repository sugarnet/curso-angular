import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  
  @Input()
  public placeholder: string = '';
  
  @Output()
  public onValue = new EventEmitter<string>();
  
  @Output()
  public onDebounce = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => {
      this.onDebounce.emit(value);
    });
  }
  
  ngOnDestroy(): void {
    console.log('destruido');
    this.debouncerSubscription?.unsubscribe();
  }

  emitValue(term: string): void {
    this.onValue.emit(term);
  }

  onKeyPress(term: string) {
    this.debouncer.next(term);
  }
}
