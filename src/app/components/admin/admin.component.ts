import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  public users: any[] = [];
  editIndex: number = -1;
  editBalanceValue: number[] = [];

  constructor() {}

  ngOnInit() {
    this.loadUsersFromLocalStorage();
  }


  loadUsersFromLocalStorage() {
    const Localdata = localStorage.getItem("signUpUsers");
    if (Localdata != null) {
      this.users = JSON.parse(Localdata);
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

}
