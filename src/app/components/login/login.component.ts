import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginObj: any = {
    number: "",
    password: "",
  };

  signInUsers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const Localdata = localStorage.getItem("signUpUsers");
    if (Localdata != null) {
      this.signInUsers = JSON.parse(Localdata);
    }
  }

  Onlogin() {
    console.log(this.signInUsers);
    const isUserExist = this.signInUsers.find(
      (x) =>
        x.phone === this.loginObj.number &&
        x.password === this.loginObj.password
    );
    if (isUserExist) {
      alert("User Login Successfully");
      this.loginObj = {
        number: "",
        password: "",
      };
      this.router.navigate(["/admin"]);
    } else if (this.loginObj.number == "" && this.loginObj.password == "") {
      alert("Fields must not be empty");
    } else {
      alert("Wrong Credentials");
    }
  }
}
