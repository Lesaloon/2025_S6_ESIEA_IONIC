import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class LogoutPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('token'); // remove token from local storage
    this.router.navigate(['/login'], { queryParams: { expired: true } }); // redirect to login page with expired flag
  }
}
