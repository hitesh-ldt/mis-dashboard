import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { DashboardService } from '../dashboard.service';

export interface Transaction {
  count:string;
  category:string;  
  jan: number;
  feb: number;
  mar: number;
  apr: number;
  may: number;
  jun: number;
  jul: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  total: number;
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  displayedColumns = ['count','category','jan',
  'feb', 
  // 'mar', 
  // 'apr', 
  // 'may', 
  // 'jun', 
  // 'jul', 
  // 'aug', 
  // 'sep', 
  // 'oct', 
  // 'nov', 
  // 'dec', 
  //  'total'
];
  
  transactions: Transaction[] = [
    {count:'merchant',category:'airtime',jan: 2,
    feb: 3,
    mar: 5,
    apr: 5,
    may: 6,
    jun: 5,
    jul: 7,
    aug: 9,
    sep: 3,
    oct: 7,
    nov: 45,
    dec: 4,
     total: 7},{count:'merchant',category:'insurance',jan: 25,
     feb: 3,
     mar: 5,
     apr: 5,
     may: 6,
     jun: 5,
     jul: 7,
     aug: 9,
     sep: 3,
     oct: 7,
     nov: 45,
     dec: 4,
      total: 4},{count:'merchant',category:'pos transactions',jan: 4,
      feb: 3,
      mar: 5,
      apr: 5,
      may: 6,
      jun: 5,
      jul: 7,
      aug: 9,
      sep: 3,
      oct: 7,
      nov: 45,
      dec: 4,
       total: 5},
     
   
  ];
  startYear: any = [{ year: "2012", value: "2012-01-01" },
  { year: "2013", value: "2013-01-01" },
  { year: "2014", value: "2014-01-01" },
  { year: "2015", value: "2015-01-01" },
  { year: "2016", value: "2016-01-01" },
  { year: "2017", value: "2017-01-01" },
  { year: "2018", value: "2018-01-01" },
  { year: "2019", value: "2019-01-01" },
  { year: "2020", value: "2020-01-01" },
  { year: "2021", value: "2021-01-01" },
  { year: "2022", value: "2022-01-01" },
  ];
  dataSource = new MatTableDataSource(this.transactions)
  dropdown = new FormGroup({
    entityType: new FormControl(""),
    startYear: new FormControl(""),
  })
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  datalist: any;
  dataToShow: any = [];
  categoryNamelist: any;

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  getdatamonth() {
    let req: any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
    }
    console.log(req);
    this.dashboardService.getdatamonth(req).subscribe((data: any) => {
      console.log(data)
      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res;
        let categoryMonthly = Object.keys(this.datalist[0].categoryCountByMonth);
        
        for(let i =0;i<categoryMonthly.length;i++)
          this.dataToShow.push({
            entityType: this.datalist[0].entityType,
            category: categoryMonthly[i]
          });
        // console.log(data.body[0].categoryCountByMonth);
        
        this.categoryNamelist= Object.keys(data.body[0].categoryCountByMonth)
        console.log(this.categoryNamelist);
        
      }



    })

  }
}
