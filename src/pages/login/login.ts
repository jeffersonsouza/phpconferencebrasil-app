import { Component } from '@angular/core';
import {NavController, ToastController, ViewController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthProvider } from "../../providers/auth/auth";
import {SignupPage} from "../signup/signup";
import {TalksPage} from "../talks/talks";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthProvider]
})
export class LoginPage {

  loginForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  error: any;

  constructor(
    private NavController: NavController,
    private FormBuilder: FormBuilder,
    private AuthProvider: AuthProvider,
    private ToastController: ToastController,
    private ViewController: ViewController
  ) {
    this.loginForm = this.FormBuilder.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  login() {
    if(this.loginForm.valid) {
      let credentials = ({email: this.email.value, password: this.password.value});
      this.AuthProvider.loginWithEmail(credentials).subscribe(loginData => {

        let toast = this.ToastController.create({
          message: 'Login feito com sucesso. redirecionando...',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 3000
        });
        toast.present();

        this.closeModal();
      }, loginError => {

        let toast = this.ToastController.create({
          message: 'Login ou senha inválidos',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 5000
        });
        toast.present();

      });
    } else {
      let toast = this.ToastController.create({
        message: 'Preencha corretamente o email e sua senha.',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 5000
      });
      toast.present();
    }
  }

  goToRegisterPage() {
    this.NavController.push(SignupPage);
  }

  closeModal() {
    this.ViewController.dismiss();
  }
}
