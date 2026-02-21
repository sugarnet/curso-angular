import { Component, signal } from '@angular/core';
import { DssSideMenu, TitleColor } from 'dss-side-menu';

@Component({
  selector: 'app-root',
  imports: [DssSideMenu],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  isAuthenticated = signal(false);
  TitleColor = TitleColor;
}
