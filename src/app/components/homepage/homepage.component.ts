import { Component, OnInit } from "@angular/core";

interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  balance: number = 1000.0; 
  transactions: Transaction[] = [
    { date: "2024-06-01", 
      description: "Salary", 
      amount: 2000, 
      balance: 3000 
    },
    {
      date: "2024-06-05",
      description: "Groceries",
      amount: -150,
      balance: 2850,
    },
    {
      date: "2024-06-10",
      description: "Electricity Bill",
      amount: -100,
      balance: 2750,
    },
    {
      date: "2024-06-15",
      description: "Internet Bill",
      amount: -50,
      balance: 2700,
    },
    { date: "2024-06-20",
      description: "Dining", 
      amount: -70, 
      balance: 2630 
    }
  ];
  constructor() {}

  ngOnInit() {}
}
