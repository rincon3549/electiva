import { Component } from '@angular/core';
import { UserService} from './usuarios.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'listas-de-chequeo';
  validacion = 0;
  contenido = 0;
  usuario: Usuario = new Usuario();
  constructor(private userService: UserService ) {}

  validar() {
    if (this.usuario.pass === '3549Jf' && this.usuario.user_login === 'Jfrincon') {
      this.validacion = 1;
      this.usuario.rol = 'Administrador';
    }
    if (this.usuario.pass === '3549Js' && this.usuario.user_login === 'Jsrincon') {
      this.validacion = 1;
      this.usuario.rol = 'staff';
    }
    if (this.usuario.pass === '3549Ja' && this.usuario.user_login === 'Jarincon') {
      this.validacion = 1;
      this.usuario.rol = 'Consulta';
    }
  }
  cerrar(){
    this.validacion = 0;
    this.contenido = 0;
  }
onConten() {
 this.contenido = 1;
}

}

class Usuario{
user_login: String;
pass: String;
rol: String
}
