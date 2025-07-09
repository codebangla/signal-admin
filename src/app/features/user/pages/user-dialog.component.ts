import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { User } from "../../../core/models/user.model";

@Component({
  selector: "app-user-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? "Edit User" : "Add User" }}</h2>
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()" class="p-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <mat-form-field class="w-full">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" required />
          <mat-error *ngIf="userForm.controls.name?.hasError('required')">
            Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" required type="email" />
          <mat-error *ngIf="userForm.controls.email?.hasError('required')">
            Email is required
          </mat-error>
          <mat-error *ngIf="userForm.controls.email?.hasError('email')">
            Invalid email
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role" required>
            <mat-option value="admin">Admin</mat-option>
            <mat-option value="user">User</mat-option>
            <mat-option value="editor">Editor</mat-option>
            <mat-option value="moderator">Moderator</mat-option>
          </mat-select>
          <mat-error *ngIf="userForm.controls.role?.hasError('required')">
            Role is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status" required>
            <mat-option value="active">Active</mat-option>
            <mat-option value="inactive">Inactive</mat-option>
          </mat-select>
          <mat-error *ngIf="userForm.controls.status?.hasError('required')">
            Status is required
          </mat-error>
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Department</mat-label>
          <input matInput formControlName="department" />
        </mat-form-field>

        <mat-form-field class="w-full">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>
      </div>

      <div class="flex justify-end space-x-2 mt-6">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button
          mat-raised-button
          color="primary"
          type="submit"
          [disabled]="userForm.invalid">
          {{ data ? "Update" : "Add" }}
        </button>
      </div>
    </form>
  `,
})
export class UserDialogComponent {
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.userForm = this.fb.group({
      name: [data?.name || "", Validators.required],
      email: [data?.email || "", [Validators.required, Validators.email]],
      role: [data?.role || "", Validators.required],
      status: [data?.status || "", Validators.required],
      department: [data?.department || ""],
      phone: [data?.phone || ""],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
}
