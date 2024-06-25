import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-login",
  templateUrl: "./admin-login.component.html",
  styleUrls: ["./admin-login.component.css"],
})

export class AdminLoginComponent implements OnInit {
  
  constructor(private router: Router) {}

  adminobj: any = {
    username: "",
    password: "",
  };

  adminData: any[] = [];
  data: any[] = []; 

  ngOnInit() {
    const adminExist = localStorage.getItem("admin");

    if (adminExist == null) {
      this.adminobj = {
        username: "admin",
        password: "admin",
      };
      this.adminData.push(this.adminobj);
      localStorage.setItem("admin", JSON.stringify(this.adminData));
    } else {
      try {
        const parsedData = JSON.parse(adminExist);
        if (Array.isArray(parsedData)) {
          this.data = parsedData;
        } else {
          this.data = [parsedData]; 
        }
      } catch (error) {
        console.error("Error parsing admin data from localStorage:", error);
        this.data = [];
      }
    }
  }

  adminLogin() {
    console.log(this.data);
    if (this.data.length > 0) {
      const success = this.data.find(
        (x: any) =>
          x.username === this.adminobj.username &&
          x.password === this.adminobj.password
      );

      if (success) {
        alert("Admin Login Successful!");
        this.router.navigate(["/admin"]);
      } else {
        alert("Wrong Admin credentials");
      }
    } else {
      alert("No admin credentials found. Please contact support.");
    }
  }
}
