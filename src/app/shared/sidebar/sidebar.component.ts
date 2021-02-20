import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}

  logout() {

    Swal.showLoading()
    this.authService.logout()
      .then(() => {
      Swal.close()
      this.route.navigate(['/login']);
    });
  }
}
