import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthfbService } from '../_services/authfb.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthfbService]
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private submitted = false;
  private loading = false;
  emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';

  constructor(
    private formBuilder: FormBuilder,
    private authfb: AuthfbService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.controls.email;
    const password = this.loginForm.controls.password;
    this.loading = true;
    this.authfb.signInEmail(email.value, password.value)
      .then(res => {
        this.loading = false;
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.loading = false;
        if (err.message.includes('password')) {
          password.setErrors({
            serverErrs: err.message
          });
        } else {
          email.setErrors({
            serverErrs: err.message
          });
        }

      });

  }
}
