import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { TopbarComponent } from "../topbar/topbar.component";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [NavbarComponent, TopbarComponent],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

}
