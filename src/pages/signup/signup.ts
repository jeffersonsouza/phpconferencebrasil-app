import { Component } from '@angular/core';
import {NavController, ToastController, ViewController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {AuthProvider} from "../../providers/auth/auth";
import {TalksPage} from "../talks/talks";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthProvider]
})
export class SignupPage {

  registerForm: FormGroup;
  name: AbstractControl;
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
    this.registerForm = this.FormBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.name = this.registerForm.controls['name'];
    this.email = this.registerForm.controls['email'];
    this.password = this.registerForm.controls['password'];
  }

  register() {
    if(this.registerForm.valid) {
      let credentials = ({email: this.email.value, password: this.password.value});
      this.AuthProvider.registerUser(credentials).subscribe(registerData => {

        let toast = this.ToastController.create({
          message: 'Você foi cadastrado com sucesso e já está logado. redirecionando...',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 3000
        });
        toast.present();

        this.NavController.setRoot(TalksPage);
      }, registerError => {

        if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use')
        {
          let toast = this.ToastController.create({
            message: registerError.message,
            showCloseButton: true,
            closeButtonText: 'Ok',
            duration: 5000
          });
          toast.present();

        }
        this.error = registerError;
      });
    } else {
      let toast = this.ToastController.create({
        message: 'Preencha corretamente os campos acima.',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000
      });
      toast.present();
    }
  }

  goBack() {
    this.NavController.pop();
  }

  closeModal() {
    this.ViewController.dismiss();
  }
}
