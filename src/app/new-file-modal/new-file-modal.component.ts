import { Component } from '@angular/core';
import { FileItem, FileOwner } from '../../models/file.item.model';
import { FILE_LIST } from '../../data/file.storage';
import { FileType } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-file-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-file-modal.component.html',
  styleUrl: './new-file-modal.component.css'
})
export class NewFileModalComponent {
  fileName: string = '';
  fileDate: Date = new Date();
  fileType: FileType = FileType.FOLDER;
  fileParentId: string | undefined;
  fileOwners: FileOwner[] = [];
  availableOwners: FileOwner[] = [];

  FileType = FileType; 

  @Output() addFile = new EventEmitter<FileItem>();

  saveFile() {
    if (this.fileName.trim() === '') {
      alert('El nombre es requerido.');
      return;
    }

    const newFile: FileItem = {
      id: new Date().getTime().toString(), 
      name: this.fileName,
      creation: this.fileDate,
      type: this.fileType,
      owners: this.fileOwners,
      parentId: this.fileParentId
    };

    this.addFile.emit(newFile);
  }
}
