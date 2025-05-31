import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonButton,
  IonNote,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonContent,
  IonText,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonText,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    IonInput,
    IonHeader,
    IonButton,
    IonNote,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class LoginPage {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const payload = {
      email: this.email.value,
      password: this.password.value,
    };

    this.auth.login(payload).subscribe({
      next: () => this.router.navigate(['/tabs']),
      error: (err) => {
        this.error = err.error?.error || 'Erreur de connexion';
      },
    });
  }
}
