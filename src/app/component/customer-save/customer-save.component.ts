import { DocumentType } from './../../domain/document-type';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customer.service';
import { DocumentTypeService } from '../../service/document-type.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-save',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './customer-save.component.html',
  styleUrl: './customer-save.component.css'
})
export class CustomerSaveComponent implements OnInit {
  customer!: Customer;
  documentTypes!: DocumentType[];

  showMsg: boolean = true;
  messages: string[] = [''];

  constructor(
    public customerService: CustomerService,
    public documentTypeService: DocumentTypeService
  ) {}

  ngOnInit(): void {
    this.customer = {
      address: '',
      custId: 0,
      dotyId: 0,
      email: '',
      enable: '',
      name: '',
      phone: '',
      token: '',
    };
    this.findAllDocumentType();
  }

  findAllDocumentType(): void {
    this.documentTypeService.findAll().subscribe((data: DocumentType[]) => {
      this.documentTypes = data;
    });
  }

  save(): void {
    this.customerService.save(this.customer).subscribe({
      next: (ok) => {
        this.showMsg = true;
        this.messages[0] = 'El customer se grabo con exito';
      },
      error: (error) => {
        this.showMsg = true;
        this.messages = error.error;
      },
    });
  }
}
