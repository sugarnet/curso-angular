import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '@services/user.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-users',
  imports: [TitleComponent, RouterModule],
  templateUrl: './user-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserListComponent {
  public userService = inject(UserService);
}
