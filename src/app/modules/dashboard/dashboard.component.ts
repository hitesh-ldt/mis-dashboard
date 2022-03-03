import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
export interface PeriodicElement {
  categoryId: number;
  categoryYear: string;
  categoryTransactionCount: number;

}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  bigChart = [];
  loading = false;
  searchvalue: string;
  resultsLength = 0;
  cards = [];
  pieChart = [];
  array: any = [];
  displayedColumns: string[] = ['categoryId', 'entityType', 'categoryYear', 'categoryTransactionCount'];
  dataSource = new MatTableDataSource(this.array)
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
  endYear: any = [{ year: "2012", value: "2012-01-01" },
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

  filteredstring: string = '';
  temparray: any = []
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  selectedvalue: any = [];
  datalist: any;
  changedepartment(e: any) {
    console.log(e.target.value)
    this.selectedvalue = e.target.value
    // console.log(this.selectedvalue);
    // this.dataSource.filter=e.trim().toLocaleLowerCase
  }
  constructor(private dashboardService: DashboardService) { }
  dropdown = new FormGroup({
    entityType: new FormControl(""),
    startYear: new FormControl(""),
    endYear: new FormControl(""),
  })
  ngOnInit() {
    this.bigChart = this.dashboardService.bigChart();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
    this.dataSource.paginator = this.paginator;
    // this.getapidata()
  }
  // getapidata() {
  //   this.loading = false;
  //   this.dashboardService.getdata().subscribe((data: any) => {

  //     this.loading = false;
  //     console.log(data);
  //     this.dataSource = data.body
  //     console.log(this.dataSource)
  //     this.array = data.body
  //     this.resultsLength = this.array.length
  //     this.dataSource = new MatTableDataSource<any>(this.array)
  //     this.dataSource.paginator = this.paginator
  //   })
  // }
  getdata() {
    console.log("+++");
    let req: any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
      'endYear': this.dropdown.controls['endYear'].value,
    }
    console.log(req);
    this.dashboardService.getdata(req).subscribe((data: any) => {
      console.log(data)
      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res
      }
    

      // this.dropdown.reset()

    })

  }

}
