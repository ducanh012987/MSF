import { Component } from '@angular/core';
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, NgScrollbarModule, RouterOutlet],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss'
})
export class HomeAdminComponent {

}
