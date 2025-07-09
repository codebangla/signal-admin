import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { User, DEFAULT_AVATAR } from "../../../core/models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { UserService } from "../../../core/services/user.service";
import { UserDialogComponent } from "./user-dialog.component";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Users</h1>
          <p class="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <div>
          <button mat-raised-button color="primary" (click)="onAddUser()">
            <mat-icon>add</mat-icon>
            Add User
          </button>
        </div>
      </div>

      <!-- Search and Filters -->
      <mat-card>
        <mat-card-content class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            <!-- Search Input Centered -->
            <div class="flex justify-center items-center w-full">
              <mat-form-field class="w-full max-w-xs">
                <mat-label>Search Users</mat-label>
                <input
                  matInput
                  [(ngModel)]="searchTerm"
                  (ngModelChange)="onSearchChange($event)"
                  placeholder="Search by name, email, or role" />
                <mat-icon matSuffix>search</mat-icon>
              </mat-form-field>
            </div>

            <!-- Role Select Centered -->
            <div class="flex justify-center items-center w-full">
              <mat-form-field class="w-full max-w-xs">
                <mat-label>Role</mat-label>
                <mat-select [(ngModel)]="selectedRole">
                  <mat-option value="">All Roles</mat-option>
                  <mat-option value="admin">Admin</mat-option>
                  <mat-option value="user">User</mat-option>
                  <mat-option value="moderator">Moderator</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Status Select Centered -->
            <div class="flex justify-center items-center w-full">
              <mat-form-field class="w-full max-w-xs">
                <mat-label>Status</mat-label>
                <mat-select [(ngModel)]="selectedStatus">
                  <mat-option value="">All Status</mat-option>
                  <mat-option value="active">Active</mat-option>
                  <mat-option value="inactive">Inactive</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Buttons Centered & Right Aligned -->
            <div class="w-full flex items-center justify-end space-x-2">
              <button mat-raised-button color="accent" (click)="applyFilters()">
                <mat-icon>filter_list</mat-icon>
                Filter
              </button>
              <button mat-button (click)="clearFilters()">
                <mat-icon>refresh</mat-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Users Table -->
      <mat-card>
        <mat-card-content class="p-0 relative">
          <div class="relative">
            <table
              mat-table
              [dataSource]="users"
              matSort
              (matSortChange)="onSortChange($event)"
              [matSortActive]="sortField"
              [matSortDirection]="sortDirection"
              class="w-full">
              <!-- Avatar Column -->
              <ng-container matColumnDef="avatar">
                <th mat-header-cell *matHeaderCellDef>Avatar</th>
                <td mat-cell *matCellDef="let user">
                  <div
                    class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                      [src]="user.avatar || DEFAULT_AVATAR"
                      [alt]="user.name"
                      class="w-full h-full rounded-full object-cover"
                      (error)="onImageError($event)" />
                    <span
                      *ngIf="!user.avatar"
                      class="text-sm font-medium text-gray-600">
                      {{ user.name.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </td>
              </ng-container>
              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let user">
                  <div>
                    <div class="font-medium">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </td>
              </ng-container>
              <!-- Role Column -->
              <ng-container matColumnDef="role">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
                <td mat-cell *matCellDef="let user">
                  <mat-chip
                    [color]="user.role === 'admin' ? 'primary' : 'accent'"
                    selected>
                    {{ user.role }}
                  </mat-chip>
                </td>
              </ng-container>
              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Status
                </th>
                <td mat-cell *matCellDef="let user">
                  <mat-chip
                    [color]="user.status === 'active' ? 'primary' : 'warn'"
                    selected>
                    {{ user.status }}
                  </mat-chip>
                </td>
              </ng-container>
              <!-- Last Login Column -->
              <ng-container matColumnDef="lastLogin">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>
                  Last Login
                </th>
                <td mat-cell *matCellDef="let user">
                  <div class="text-sm text-gray-600">
                    {{ user.updatedAt | date : "short" }}
                  </div>
                </td>
              </ng-container>
              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let user">
                  <button
                    mat-icon-button
                    [matMenuTriggerFor]="menu"
                    (click)="currentUser = user">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                </td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
            </table>
            <mat-menu #menu="matMenu">
              <button
                mat-menu-item
                (click)="onEditUser(currentUser!)"
                [disabled]="!currentUser">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              <button
                mat-menu-item
                (click)="onDeleteUser(currentUser!)"
                [disabled]="!currentUser">
                <mat-icon>delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>
            <mat-paginator
              [length]="totalUsers"
              [pageSize]="pageSize"
              [pageIndex]="pageIndex"
              [pageSizeOptions]="[5, 10, 20]"
              (page)="onPageChange($event)"></mat-paginator>
            <div
              *ngIf="loading"
              class="absolute inset-0 flex items-center justify-center z-20 bg-white/70 transition-opacity duration-200"
              style="backdrop-filter: blur(2px);">
              <mat-spinner></mat-spinner>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  loading = false;
  searchTerm = "";
  searchChanged: Subject<string> = new Subject<string>();
  selectedRole = "";
  selectedStatus = "";
  displayedColumns: string[] = [
    "avatar",
    "name",
    "role",
    "status",
    "lastLogin",
    "actions",
  ];
  pageSize = 10;
  pageIndex = 0;
  sortField = "name";
  sortDirection: "asc" | "desc" = "asc";
  currentUser: User | null = null;
  DEFAULT_AVATAR = DEFAULT_AVATAR;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.searchChanged.pipe(debounceTime(400)).subscribe((term) => {
      this.searchTerm = term;
      this.pageIndex = 0;
      this.loadUsers();
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService
      .getUsers({
        page: this.pageIndex + 1,
        limit: this.pageSize,
        sort: this.sortField,
        order: this.sortDirection,
        search: this.searchTerm,
        role: this.selectedRole,
        status: this.selectedStatus,
      })
      .subscribe({
        next: (res) => {
          this.users = res.data || [];
          this.totalUsers = res.total || this.users.length;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.snackBar.open("Failed to load users", "Close", {
            duration: 3000,
          });
        },
      });
  }

  onAddUser(): void {
    this.loading = true;
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "400px",
      data: null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.addUser(result).subscribe(
          () => {
            this.snackBar.open("User added", "Close", { duration: 2000 });
            this.loadUsers();
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    });
  }

  onEditUser(user: User): void {
    this.loading = true;
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: "400px",
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe(
          () => {
            this.snackBar.open("User updated", "Close", { duration: 2000 });
            this.loadUsers();
          },
          () => {
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    });
  }

  onDeleteUser(user: User): void {
    if (confirm(`Delete user ${user.name}?`)) {
      this.loading = true;
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.snackBar.open("User deleted", "Close", { duration: 2000 });
          this.loadUsers();
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  onPageChange(event: any): void {
    this.loading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  onSortChange(sort: Sort): void {
    this.loading = true;
    this.sortField = sort.active;
    this.sortDirection = (sort.direction as "asc" | "desc") || "asc";
    this.pageIndex = 0;
    this.loadUsers();
  }

  applyFilters(): void {
    this.pageIndex = 0;
    this.loadUsers();
  }

  clearFilters(): void {
    this.searchTerm = "";
    this.selectedRole = "";
    this.selectedStatus = "";
    this.pageIndex = 0;
    this.loadUsers();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = "assets/avatar-placeholder.png";
  }

  onSearchChange(term: string) {
    this.searchChanged.next(term);
  }
}
