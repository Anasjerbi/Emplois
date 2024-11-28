import { Component } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  customers: any[] = [];
  classFilter: string = '';  // Property to hold the class filter input

  constructor(private adminService: AdminService) {}

  customerCount: number = 0;
  classCount: number = 0;

  ngOnInit() {
    this.loadCustomers();
    this.loadCounts();
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

  loadCounts(): void {
    this.adminService.countCustomers().subscribe({
      next: (count) => {
        console.log('Customer Count API Response:', count); // Debug log
        this.customerCount = count;
      },
      error: (err) => {
        console.error('Error counting customers:', err);
      },
    });

    this.adminService.countClasses().subscribe({
      next: (count) => {
        console.log('Class Count API Response:', count); // Debug log
        this.classCount = count;
      },
      error: (err) => {
        console.error('Error counting classes:', err);
      },
    });
  }

  // Filter customers by class name based on the classFilter property
  filteredCustomers(): any[] {
    if (!this.classFilter) {
      return this.customers;  // If no filter is set, return all customers
    }
    return this.customers.filter(customer =>
      customer?.classe?.nomClasse?.toLowerCase().includes(this.classFilter.toLowerCase())
    );
  }

  approve(id: number) {
    this.adminService.approveCustomer(id).subscribe(() => this.loadCustomers());
  }

  disapprove(id: number) {
    this.adminService.disapproveCustomer(id).subscribe(() => this.loadCustomers());
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.adminService.deleteCustomer(id).subscribe({
        next: (response) => {
          console.log('Delete Response:', response); // Log the response for debugging
          alert('Customer deleted successfully.');
          this.loadCustomers(); // Reload the table to reflect the changes
        },
        error: (err) => {
          if (err.status === 200) {
            console.warn('Angular misinterpreted a 200 response as an error.');
            alert('Customer deleted successfully.');
            this.loadCustomers(); // Reload the table to reflect the changes
          } else {
            console.error('Error deleting customer:', err);
            const errorMessage = err.error && typeof err.error === 'string'
              ? err.error
              : 'Failed to delete customer. Please try again.';
            alert(errorMessage);
          }
        }
      });
    }
  }
}

