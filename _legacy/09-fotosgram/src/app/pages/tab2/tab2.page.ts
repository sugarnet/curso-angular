import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  loadPosition: boolean;

  post = {
    message: '',
    position: null,
    coords: null
  };

  constructor(
    private postService: PostService,
    private route: Router,
    private geolocation: Geolocation,
    private camera: Camera) {}

  async createPost() {
    await this.postService.createPost(this.post);
    this.post = {
      message: '',
      position: null,
      coords: null
    };
    this.tempImages = [];
    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {
    if(!this.post.position) {
      this.post.coords = null;
      return;
    }

    this.loadPosition = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadPosition = false;
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      console.log(coords);
    }).catch((error) => {
      this.loadPosition = false;
      console.log('Error getting location', error);
     });

  }

  takePicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    
    this.processPicture(options);
  }

  getFromGalery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    
    this.processPicture(options);
  }

  processPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
 
      const img = window.Ionic.WebView.convertFileSrc(imageData);
      this.tempImages.push(img);
      this.postService.uploadImage(imageData);
      console.log(img);
     }, (err) => {
      // Handle error
     });
  }
}
