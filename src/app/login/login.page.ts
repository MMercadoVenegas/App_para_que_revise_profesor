import { Component, ElementRef, ViewChildren, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { QueryList } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})



export class LoginPage {
  @ViewChildren('animatedInput', { read: ElementRef }) animatedInputElements!: QueryList<ElementRef>;

  username: string = '';
  password: string = '';

  constructor(
    private router: Router, 
    private toastController: ToastController, 
    private userService: UserService) {}

  login() {
    this.userService.getUsuarios().subscribe((usuarios: any[]) => {
      const foundUser = usuarios.find(
        (user) =>
          user.usuario === this.username &&
          user.contrasena === this.password
      );
  
      if (foundUser) {

        this.router.navigate(['/home']);
      } else {

        this.mostrarErrorNombreNoExiste();
      }
    });
  }

  async mostrarErrorNombreNoExiste() {
    const toast = await this.toastController.create({
      message: 'El nombre de usuario no existe en la base local',
      duration: 3000,
      position: 'top',
      color: 'danger', 
    });
    toast.present();
  }
  irAReestablecerContrasena() {

    this.router.navigate(['/pass']);

  }
}