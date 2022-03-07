import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.scss']
})
export class CashflowComponent implements OnInit {

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
  dropdown = new FormGroup({
    startYear: new FormControl(""),
    endYear: new FormControl(""),

  })
  datalist: any;
  dataToShow: any = [];
  categoryNamelist: any;
  categoryName: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  getdata() {
    let req: any = {
      'startYear': this.dropdown.controls['startYear'].value,
      'endYear': this.dropdown.controls['endYear'].value,
    }
    console.log(req);
    this.dashboardService.getdatacash(req).subscribe((data: any) => {
      console.log(data)
      this.datalist = data.body
      console.log(this.datalist[0])

      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res
        this.categoryName = Object.keys(this.datalist[0]);
        console.log(this.categoryName);

        for (let i = 0; i < this.categoryName.length; i++) {
          const element = this.categoryName[i];
          let objCount = {
            particulars: element,
            count: this.getMonthValue(element),
          }
          this.dataToShow.push(objCount);
        }
        console.log(this.dataToShow);

      }
    })

  }

  getMonthValue(category): any {
    return this.datalist[0][category];
  }
}