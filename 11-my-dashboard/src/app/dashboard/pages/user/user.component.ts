import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [TitleComponent],
  templateUrl: './user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  // public user = signal<User | undefined>(undefined);
  public user = toSignal(
    this.route.params.pipe(switchMap(({ id }) => this.userService.getUserById(id)))
  );

  public title = computed<string>(() => {
    const infoLabel = 'Informacion de usuario:';
    if (this.user()) {
      return `${infoLabel} ${this.user()?.first_name} ${this.user()?.last_name}`;
    }
    return infoLabel;
  });

  // constructor() {
  //   console.log(
  //     this.route.params.subscribe((params) => {
  //       console.log(params);
  //     })
  //   );
  // }
}
