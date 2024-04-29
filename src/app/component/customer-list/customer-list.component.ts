import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../service/customer.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{

  customers:Customer[];

  constructor(public customerService:CustomerService){
    this.customers=[];
  }

  ngOnInit(): void {
    this.customerService.findAll().subscribe(data=>{
      this.customers=data;
    });    
  }

}
