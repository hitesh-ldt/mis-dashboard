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
  loading = false;
  searchvalue: string;
  resultsLength = 0;
  cards = [];
  array: any = [];
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

  datalist: any;

  constructor(private dashboardService: DashboardService) { }
  dropdown = new FormGroup({
    entityType: new FormControl(""),
    startYear: new FormControl(""),
    endYear: new FormControl(""),
  })
  ngOnInit() {
  }
 
  getdata() {
    let req: any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
      'endYear': this.dropdown.controls['endYear'].value,
    }
    console.log(req);
    this.loading = true;
    this.dashboardService.getdata(req).subscribe((data: any) => {
    console.log(data)
    this.loading = false;

      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res
      }
    })

  }

}
