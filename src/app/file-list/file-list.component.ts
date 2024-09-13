import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file.item.model';
import { FILE_LIST } from '../../data/file.storage';
import { FileType } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { NewFileModalComponent } from '../new-file-modal/new-file-modal.component';


@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule,NewFileModalComponent],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {
  files: FileItem[] = [];
  selectedFiles: FileItem[] = [];
  dropdownOpen = false;

  constructor() {}

  ngOnInit(): void {
   
    this.files = FILE_LIST;
   
    this.sortFiles();
  }


  sortFiles() {
    this.files.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === FileType.FOLDER ? -1 : 1;
    });
  }


  toggleSelection(file: FileItem) {
    const index = this.selectedFiles.indexOf(file);
    if (index === -1) {
      this.selectedFiles.push(file);
    } else {
      this.selectedFiles.splice(index, 1);
    }
  }


  deleteSelectedFiles() {
    if (this.selectedFiles.length === 1) {
      this.deleteFile(this.selectedFiles[0]);
    } else if (this.selectedFiles.length > 1) {
      
      if (confirm(`¿Estás seguro de que quieres eliminar ${this.selectedFiles.length} elementos?`)) {
        this.selectedFiles.forEach(file => this.deleteFile(file));
        this.selectedFiles = [];
      }
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  deleteFile(file: FileItem) {
    this.files = this.files.filter(f => f.id !== file.id);
  }

  openNewFileModal() {
    
  }

  addFile(newFile: FileItem) {
    this.files.push(newFile);
    this.sortFiles();
  }
}
