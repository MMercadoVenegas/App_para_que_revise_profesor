import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  showMessage: boolean = false;

  constructor(private navCtrl: NavController) {}
  ionViewDidEnter() {

    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      this.username = storedUsername;
    }
  
    console.log('Nombre de usuario recuperado:', this.username); 
    console.log( this.username);
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 5000);
      
    }
  

  logout() {

    localStorage.removeItem('user');

    this.navCtrl.navigateRoot('/login');
  }
  
}
