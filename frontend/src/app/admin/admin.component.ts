import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) { // Confirm deletion
      this.adminService.deleteCustomer(id).subscribe({
        next: () => {
          alert('Customer deleted successfully');
          this.loadCustomers(); // Reload the customer list
        },
        error: (err) => {
          console.error('Error deleting customer:', err);
          alert('Failed to delete customer');
        }
      });
    }
  }
  
}
