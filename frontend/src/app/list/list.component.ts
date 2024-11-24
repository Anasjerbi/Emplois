import { Component } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  customers: any[] = [];
  constructor(private adminService: AdminService) {}

  

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.adminService.listCustomers().subscribe({
      next: (data) => {
        console.log('Customers:', data); // Debug log
        this.customers = data;
      },
      error: (err) => {
        console.error('Error:', err); // Debug log
        alert('Failed to load customers');
      }
    });
  }
  

  approve(id: number) {
    this.adminService.approveCustomer(id).subscribe(() => this.loadCustomers());
  }

  disapprove(id: number) {
    this.adminService.disapproveCustomer(id).subscribe(() => this.loadCustomers());
  }
}


