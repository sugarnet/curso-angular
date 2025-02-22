import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';

const URL = environment.server;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
    ) { }

  login(email: string, password: string) {
    
    const data = {email, password};
    return new Promise(resolve => {
      this.http.post(`${URL}/user/login`, data)
      .subscribe(async response => {
  
        if(response['ok']) {
          await this.saveToken(response['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
  
      });

    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', {animated: true});
  }

  register(user: User) {
    
    return new Promise(resolve => {
      this.http.post(`${URL}/user`, user)
      .subscribe(async response => {
  
        if(response['ok']) {
          await this.saveToken(response['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
  
      });

    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validateToken();
  }

  async loadToken() {
    this.token = await this.storage.get('token') || null;
  }
  
  async validateToken(): Promise<boolean> {
    
    await this.loadToken();
    
    if(!this.token) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }
    
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      
      this.http.get(`${URL}/user`, {headers}).subscribe(response => {
        if(response['ok']) {
          this.user = response['user'];
          resolve(true);
        } else {
          this.navController.navigateRoot('/login');
          resolve(false);
        }
      });
    });
  }

  getUser() {
    if(!this.user._id) {
      this.validateToken();
    }
    return {...this.user};
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({'x-token': this.token});

    return new Promise(resolve => {
      this.http.put(`${URL}/user`, user, {headers}).subscribe(response => {
  
        if(response['ok']) {
          this.saveToken(response['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
  
      });

    });
  }
}
