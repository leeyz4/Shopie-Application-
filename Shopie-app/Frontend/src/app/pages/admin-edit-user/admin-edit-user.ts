import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
})
export class AdminEditUserComponent implements OnInit {
  user = {
    name: '',
    email: '',
    role: 'CUSTOMER'
  };
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getById(this.id).subscribe((res) => {
      this.user = res.data;
    });
  }

  onSubmit() {
    this.userService.update(this.id, this.user).subscribe(() => {
      this.router.navigate(['/admin/users']);
    });
  }
}