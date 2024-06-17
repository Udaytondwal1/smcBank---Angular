import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  signupUsers: any[] = [];

  signupObj = {
    name: "",
    phone: "",
    password: "",
    confirm: "",
    balance: 0,
  };

  constructor() {}

  ngOnInit() {
    const Localdata = localStorage.getItem("signUpUsers");
    if (Localdata != null) {
      this.signupUsers = JSON.parse(Localdata);
    }
  }

  Onsignup() {
    const userExists = this.signupUsers.some((user) => user.phone === this.signupObj.phone);
    if (this.signupObj.name == "") {
      alert("Fields must not be empty");
    } else if (userExists) {
      alert("User already exists!");
      return;
    } else {
      console.log("data submitted");
      this.signupUsers.push(this.signupObj);
      localStorage.setItem("signUpUsers", JSON.stringify(this.signupUsers));
      alert("User SignUp Successful!");
      this.signupObj = {
        name: "",
        phone: "",
        password: "",
        confirm: "",
        balance: this.signupObj.balance,
      };
    }
  }
}
