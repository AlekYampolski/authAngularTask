import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../_helpers/must-match.validator';
import { AuthfbService } from '../_services/authfb.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthfbService]
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;
  private emailPattern = '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$';
  private loading = false;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authfb: AuthfbService,
    private router: Router
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])  ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const controls = this.registerForm.controls;
    const email = controls.email.value;
    const password = controls.password.value;
    const userName = controls.userName.value;
    const emailError = controls.email;
    this.loading = true;

    this.authfb.doRegister(email, password, userName).then(res => {
      this.loading = false;
      this.router.navigate(['/home']);
    }).catch(err => {
      this.loading = false;
      emailError.setErrors({
        serverErrs : err.message
      });
    });

  }

}
