import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

// import { BoolToYesNoPipe } from '../../../root/pipes/bool-to-yes-no.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  model: Array<User> = null;
  isLoading = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
    .subscribe(t => {
      this.model = t.slice(0, 10); // paging
    },
    error => {
      console.log(error);
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
    });
  }

  trackByUserId(index: number, item: User): number {
    return item ? item.userId : undefined;
  }
}
