import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  public users: any[] = [];
  editIndex: number = -1;
  editBalanceValue: number[] = [];
  errmsg: string = "";

  constructor(private router: Router) { }

  ngOnInit() {
    this.loadUsersFromLocalStorage();
  }


  loadUsersFromLocalStorage() {
    const Localdata = localStorage.getItem("signUpUsers");
    if (Localdata != null) {
      this.users = JSON.parse(Localdata);
    } else {
      this.errmsg = "No Users Found";
    }
  }

  saveUsersToLocalStorage() {
    localStorage.setItem('signUpUsers', JSON.stringify(this.users));
  }


  addBalance(index: number) {
    this.users[index].balance += this.editBalanceValue[index];
    console.log(this.editBalanceValue[index])
    this.saveUsersToLocalStorage();
    this.editBalanceValue[index] = 0;
  }


  logout() {
    alert("Logout Successful");
    this.router.navigate(["/AdminLogin"]);
  }

}
