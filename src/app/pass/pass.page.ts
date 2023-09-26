import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pass',
  templateUrl: 'pass.page.html',
  styleUrls: ['pass.page.scss'],
})
export class PassPage {
  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private userService: UserService
  ) {}

  resetPassword() {
    // Verificar si el nombre de usuario existe en la base de datos local (usuarios.json)
    this.userService.getUsuarios().subscribe((usuarios: any[]) => {
      const usuarioEncontrado = usuarios.find((usuario) => usuario.usuario === this.username);

      if (usuarioEncontrado) {
        // Verificar si las contraseñas coinciden
        if (this.newPassword === this.confirmPassword) {
          // Actualizar la contraseña en la base de datos local (usuarios.json)
          usuarioEncontrado.contrasena = this.newPassword;

          // Guardar la actualización (puedes implementar esta parte según tu lógica)
          // ...

          // Mostrar mensaje de éxito
          this.mostrarMensaje('Contraseña reestablecida con éxito. Inicia sesión con tu nueva contraseña.');

          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/login']);
        } else {
          // Mostrar mensaje de error si las contraseñas no coinciden
          this.mostrarMensaje('Las contraseñas no coinciden. Inténtalo de nuevo.');
        }
      } else {
        // Mostrar mensaje de error si el nombre de usuario no existe
        this.mostrarMensaje('El nombre de usuario no existe. Verifica tu usuario.');
      }
    });
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración en milisegundos (3 segundos en este caso)
      position: 'top', // Posición de la notificación (puedes cambiarla según tus preferencias)
      color: 'primary', // Color de la notificación (puedes personalizarlo)
    });
    toast.present();
  }
  restablecerContraseña() {
  const usuarioActual = 'nombre_de_usuario'; // Reemplaza con el valor del usuario actual
  const nuevaContraseña = 'nueva_contraseña'; // Reemplaza con la nueva contraseña

  this.userService.actualizarContraseña(usuarioActual, nuevaContraseña);


  setTimeout(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData && userData.username === usuarioActual && userData.password === nuevaContraseña) {

        console.log('Contraseña actualizada correctamente.');
      } else {

        console.error('Error al actualizar la contraseña.');
      }
    } else {

      console.error('Error al actualizar la contraseña.');
    }
  }, 1000);
}
}
