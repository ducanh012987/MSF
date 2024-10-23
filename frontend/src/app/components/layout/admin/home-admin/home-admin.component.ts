import { Component, OnInit } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { RouterOutlet } from '@angular/router';
import { PermissionService } from '../../../../services/permission/permission.service';
import { AuthorizeService } from '../../../../services/authorize/authorize.service';
import { RoleService } from '../../../../services/role/role.service';
import { forkJoin, map } from 'rxjs';
import { StorageMenu } from '../../../../services/storage/storage.menu';
import { StoragePermission } from '../../../../services/storage/storage.permission';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [TopbarComponent, SidebarComponent, NgScrollbarModule, RouterOutlet],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent implements OnInit {
  private permissions: string[] = [];
  private menu: string[] = [];

  constructor(
    public permissionService: PermissionService,
    private authorize: AuthorizeService,
    private roleService: RoleService,
    private storageMenu: StorageMenu,
    private storagePermission: StoragePermission
  ) {}

  ngOnInit(): void {
    this.loadRolesData();
  }

  // Gọi API để lấy danh sách cho tất cả các role
  private loadRolesData() {
    const roleIds = this.authorize.getRoles(); // Lấy danh sách role từ token

    // Đảm bảo roleIds là một mảng
    const roleArray = Array.isArray(roleIds) ? roleIds : [roleIds];
    const roleRequests = roleArray.map((id) =>
      this.roleService.getRoleById(Number(id))
    ); // Gọi API cho từng role

    // Chờ tất cả các request hoàn thành và gộp permissions
    forkJoin(roleRequests)
      .pipe(
        map((roles: any[]) => {
          const permissionMap = new Map<string, any>();
          const menuMap = new Map<string, any>();

          roles.forEach((role) => {
            role?.data?.listPermissions.forEach((permission: any) =>
              permissionMap.set(permission.id, permission.permissionName)
            );
            role?.data?.listMenu.forEach((menu: any) =>
              menuMap.set(menu.id, menu)
            );
          });
          this.permissions = Array.from(permissionMap.values());
          this.menu = Array.from(menuMap.values());

          this.storageMenu.setMenu(this.menu);
          this.storagePermission.setPermissions(this.permissions);
        })
      )
      .subscribe();
  }
}
