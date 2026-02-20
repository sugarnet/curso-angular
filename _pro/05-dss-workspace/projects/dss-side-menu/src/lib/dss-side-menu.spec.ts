import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DssSideMenu } from './dss-side-menu';

describe('DssSideMenu', () => {
  let component: DssSideMenu;
  let fixture: ComponentFixture<DssSideMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DssSideMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DssSideMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
