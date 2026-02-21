import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DssSideMenu } from './dss-side-menu';
import { provideRouter } from '@angular/router';

describe('DssSideMenu', () => {
  let component: DssSideMenu;
  let fixture: ComponentFixture<DssSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DssSideMenu],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DssSideMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSignIn when button is clicked', () => {
    vi.spyOn(component.onSignIn, 'emit');
    fixture.componentRef.setInput('isAuthenticated', false);
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector(
      '[button-login]',
    ) as HTMLButtonElement;

    buttonElement.click();

    expect(component.onSignIn.emit).toHaveBeenCalled();
  });
  it('should call onSignOut when button is clicked', () => {
    vi.spyOn(component.onSignOut, 'emit');
    fixture.componentRef.setInput('isAuthenticated', true);
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector(
      '[button-logout]',
    ) as HTMLButtonElement;

    buttonElement.click();

    expect(component.onSignOut.emit).toHaveBeenCalled();
  });
});
