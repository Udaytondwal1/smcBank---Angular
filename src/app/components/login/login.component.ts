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

  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const localData = localStorage.getItem("signUpUsers");
    if (localData != null) {
      this.users = JSON.parse(localData);
    }
  }

  Onlogin() {
    console.log(this.users);
    const isUserExist = this.users.find(
      (x) =>
        x.phone === this.loginObj.number &&
        x.password === this.loginObj.password
    );

    if (isUserExist) {
      alert("User Login Successfully");

      sessionStorage.setItem("signedInUserPhone", isUserExist.phone);
      sessionStorage.setItem("Issignin", "true");

      this.router.navigate(["/homepage"]);
    } else if (this.loginObj.number == "" && this.loginObj.password == "") {
      alert("Fields must not be empty");
    } else {
      alert("Wrong Credentials");
    }
  }
}
