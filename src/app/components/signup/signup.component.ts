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
    Issignin: false
  };

  constructor() {}

  ngOnInit() {
    const localData = localStorage.getItem("signUpUsers");
    if (localData) {
      try {
        this.signupUsers = JSON.parse(localData);
        if (!Array.isArray(this.signupUsers)) {
          this.signupUsers = [];
        }
      } catch (error) {
        console.error("Error parsing localStorage data: ", error);
        this.signupUsers = [];
      }
    }
  }

  onSignup() {
    const userExists = this.signupUsers.some(user => user.phone === this.signupObj.phone);
    if (this.signupObj.name === "" || this.signupObj.phone === "" || this.signupObj.password === "" || this.signupObj.confirm === "") {
      alert("All fields must be filled");
      return;
    }
    if (this.signupObj.password !== this.signupObj.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (userExists) {
      alert("User already exists!");
      return;
    } else {
      console.log("Data submitted");
      this.signupUsers.push({ ...this.signupObj });
      localStorage.setItem("signUpUsers", JSON.stringify(this.signupUsers));
      alert("User Signup Successful!");
      this.resetForm();
    }
  }

  private resetForm() {
    this.signupObj = {
      name: "",
      phone: "",
      password: "",
      confirm: "",
      balance: 0,
      Issignin: false
    };
  }
}
