import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isLoggedIn: boolean = false;

  constructor(private auth: AuthService) {
    // this.auth.isLoggedIn.subscribe(data => {
    //   this.isLoggedIn = data;
    // })
  }

  logout() {
    this.auth.logout();
  }

}
