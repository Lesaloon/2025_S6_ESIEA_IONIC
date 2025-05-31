import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service'; // Added import

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
	ReactiveFormsModule
  ],
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  editMode: boolean = false; // new property for edit mode
  editUser = { pseudo: '', email: '', password: '' }; // new object to hold form data

  constructor(
    private authService: AuthService,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit() {
    this.loadUser(); // Updated to use UserService
  }

  loadUser() {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res.user;
        // initialize editUser once user is loaded
		console.log('User loaded:', this.user);
        this.editUser.pseudo = res.user?.pseudo;
        this.editUser.email = res.user?.email;
		console.log('Edit user initialized:', this.editUser);
      },
      error: (err) => {
        console.error('Error loading user', err);
      },
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
	console.log('Edit mode toggled:', this.editUser);
  }

  updateProfile() {
    // Simulate an update call; here you would call a service update method
    console.log('Updating profile with', this.editUser);
    // For now, update the user object locally and exit edit mode
    if (this.user) {
      this.user.pseudo = this.editUser.pseudo;
      this.user.email = this.editUser.email;
      this.userService.updateCurrentUser(this.user).subscribe({
        next: () => {
          console.log('User updated successfully');
        },
        error: (err) => {
          console.error('Error updating user', err);
        },
      });
    }
    this.editMode = false;
  }

  logout() {
    this.authService.logout();
  }
}
