import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/entityModels/registerModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required],
    });
  }

  createAccount() {
    if (this.registerForm.valid) {
      let registerModel: RegisterModel = Object.assign(
        {},
        this.registerForm.value
      );
      this.authService.register(registerModel).subscribe(
        (data) => {
          this.toastrService.info('Kayıt başarılı', 'Başarılı');
          this.router.navigate(['/login']);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Formu tam doldurmanız gerek!', 'Hata');
    }
  }
}
