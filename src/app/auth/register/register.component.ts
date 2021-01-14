import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    const { nombre, correo, password } = this.registroForm.value;

   Swal.showLoading()
    this.authService
    .crearUsuario(nombre, correo, password)
    .then((credenciales) => {
      console.log(credenciales);
      Swal.hideLoading()
        this.router.navigate(['/']);
      })
      .catch((error) => {
        Swal.hideLoading()
        Swal.fire({
          title: 'Error!',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      });
  }
}
