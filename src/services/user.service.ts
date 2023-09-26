import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usuariosUrl = 'assets/usuarios.json';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.usuariosUrl);
  }
  actualizarContraseña(usuario: string, nuevaContraseña: string) {
    this.getUsuarios().subscribe((usuarios: any[]) => {
      const usuarioActualizado = usuarios.find(u => u.usuario === usuario);
      if (usuarioActualizado) {

        usuarioActualizado.contrasena = nuevaContraseña;


        this.http.put(this.usuariosUrl, usuarios).subscribe(response => {
          console.log('Contraseña actualizada correctamente.');
        });
      } else {
        console.error('Usuario no encontrado.');
      }
    });
  }
}