import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  signedInUser: any = null;
  amount: number = 0;
  phoneNumber: number = 0;
  public usersIn: any[] = [];
  isUserExist: any;
  transactions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const phone = sessionStorage.getItem("signedInUserPhone");
    const Issignin = sessionStorage.getItem("Issignin");
    const localAlldata = localStorage.getItem("signUpUsers");
    
    if (localAlldata) {
      this.usersIn = JSON.parse(localAlldata);
    }

    if (phone && Issignin === "true") {
      if (this.usersIn != null) {
        this.signedInUser = this.usersIn.find(
          (user: any) => user.phone === phone
        );
      }
      if (this.signedInUser && this.signedInUser.transactions) {
        this.transactions = this.signedInUser.transactions;
        this.sortTransactionsByDate();
      }
    }
  }

  logout() {
    sessionStorage.removeItem("Issignin");
    sessionStorage.removeItem("signedInUserPhone");
    alert("User Logged out");
    this.router.navigate(["/login"]);
  }

  sendMoney() {
    if (this.phoneNumber && this.amount) {
      this.isUserExist = this.usersIn.find((x) => x.phone === this.phoneNumber);

      if (this.isUserExist) {
        if (this.amount > 0 && this.amount <= this.signedInUser.balance) {
          // Update balances
          this.signedInUser.balance -= this.amount;
          this.isUserExist.balance += this.amount;

          // Create transactions
          const date = new Date().toLocaleString();
          const debitTransaction = {
            date: date,
            description: `Sent to ${this.phoneNumber}`,
            amount: -this.amount,
            balance: this.signedInUser.balance
          };
          const creditTransaction = {
            date: date,
            description: `Received from ${this.signedInUser.phone}`,
            amount: this.amount,
            balance: this.isUserExist.balance
          };

          // Add transactions to respective users
          this.signedInUser.transactions = this.signedInUser.transactions || [];
          this.isUserExist.transactions = this.isUserExist.transactions || [];
          this.signedInUser.transactions.push(debitTransaction);
          this.isUserExist.transactions.push(creditTransaction);

          this.transactions = this.signedInUser.transactions;
          this.sortTransactionsByDate();

          this.saveUsersToLocalStorage();

          this.phoneNumber = 0;
          this.amount = 0;
          alert("Money sent successfully!");
        } else {
          alert("Insufficient Balance");
        }
      } else {
        alert("User does not exist");
      }
    } else {
      alert("Please add Phone Number and Amount to send Money");
    }
  }

  saveUsersToLocalStorage() {
    const signedInUserIndex = this.usersIn.findIndex(user => user.phone === this.signedInUser.phone);
    if (signedInUserIndex > -1) {
      this.usersIn[signedInUserIndex] = this.signedInUser;
    }

    const recipientUserIndex = this.usersIn.findIndex(user => user.phone === this.phoneNumber);
    if (recipientUserIndex > -1) {
      this.usersIn[recipientUserIndex] = this.isUserExist;
    }

    localStorage.setItem("signUpUsers", JSON.stringify(this.usersIn));
  }

  sortTransactionsByDate() {
    this.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
