import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/single-user.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  
  private userService = inject(UserService);
  
  public userId = signal(1);
  
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);
  
  ngOnInit(): void {
    this.loadUser(this.userId())
  }

  loadUser( id: number ) {
    if (id <= 0) return;

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.userService.getUserById(id).subscribe(
      this.currentUser.set
    );
  }
}
