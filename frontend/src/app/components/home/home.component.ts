import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matCleaningServicesOutline,
  matCreateOutline,
  matDatasetOutline,
  matDeleteOutline,
  matDriveFileMoveOutline,
  matFilterListOutline,
  matFolderOutline,
  matFolderSharedOutline,
  matHorizontalSplitOutline,
  matInboxOutline,
  matInventory2Outline,
  matKeyboardArrowDownOutline,
  matKeyboardArrowRightOutline,
  matMailLockOutline,
  matMailOutline,
  matMoreHorizOutline,
  matNoteOutline,
  matOutlinedFlagOutline,
  matPrintOutline,
  matReplyAllOutline,
  matReportGmailerrorredOutline,
  matSendOutline,
} from '@ng-icons/material-icons/outline';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavbarComponent } from '../layout/client/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIconComponent, NgScrollbarModule, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [
    provideIcons({
      matDatasetOutline,
      matHorizontalSplitOutline,
      matMailOutline,
      matDeleteOutline,
      matKeyboardArrowDownOutline,
      matReportGmailerrorredOutline,
      matReplyAllOutline,
      matCleaningServicesOutline,
      matDriveFileMoveOutline,
      matFolderSharedOutline,
      matOutlinedFlagOutline,
      matPrintOutline,
      matKeyboardArrowRightOutline,
      matFilterListOutline,
      matMoreHorizOutline,
      matInboxOutline,
      matSendOutline,
      matCreateOutline,
      matMailLockOutline,
      matInventory2Outline,
      matNoteOutline,
      matFolderOutline,
    }),
  ],
})
export class HomeComponent {
  isMenuRibbon: boolean = false;
  isClassic: boolean = true;

  menuRibbon() {
    this.isMenuRibbon = !this.isMenuRibbon;
  }

  switchToClassic() {
    this.isClassic = true;
  }

  switchToSimple() {
    this.isClassic = false;
  }
}
