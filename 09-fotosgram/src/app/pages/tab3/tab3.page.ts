import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UIService } from '../../services/ui.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user: User = {};
  
  constructor(private userService: UserService, private uiService: UIService, private postService: PostService) {}
  
  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  async update(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const updated = await this.userService.updateUser(this.user);

    if(updated) {
      this.uiService.presentToast('Updated!');
    } else {
      this.uiService.presentToast('Error to update!');

    }

  }

  logout() {

    this.postService.page = 0;
    this.userService.logout();
  }
}
