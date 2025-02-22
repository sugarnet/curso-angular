import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { UIService } from '../../services/ui.service';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: 'diegoscifo@yahoo.com.ar',
    password: '123456'
  };

  userRegister = {
    email: 'diegoscifo@yahoo.com.ar',
    password: '123456',
    name: 'test',
    avatar: 'av-1.png'
  };

  @ViewChild('loginSlides', {static: true}) loginSlides: IonSlides;

  constructor(private userService: UserService,
    private navController: NavController,
    private uiService: UIService) { }

  ngOnInit() {
    this.loginSlides.lockSwipes(true);
  }

  async login(form: NgForm) {

    if(form.invalid) {
      return;
    }

    const valid = await this.userService.login(this.user.email, this.user.password);

    if(valid) {
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.presentAlert('Email/Password invalid!')
    }
  }

  goTo(slide: number) {
    this.loginSlides.lockSwipes(false);
    this.loginSlides.slideTo(slide);
    this.loginSlides.lockSwipes(true);
  }

  async create(form: NgForm) {
    if(form.invalid) {
      return;
    }

    const valid = await this.userService.register(this.userRegister);

    if(valid) {
      this.navController.navigateRoot('/main/tabs/tab1', {animated: true});
    } else {
      this.uiService.presentAlert('Email registered!')
    }
  }
}
