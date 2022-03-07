import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-gmvcount',
  templateUrl: './gmvcount.component.html',
  styleUrls: ['./gmvcount.component.scss']
})
export class GmvcountComponent implements OnInit {

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
  dropdown = new FormGroup({
    entityType: new FormControl(""),
    startYear: new FormControl(""),
  })
  datalist: any;
  dataToShow: any = [];
  categoryNamelist: any;
  categoryMonthly: string[];
  categoryGMVMonthly: string[];
  categoryGMV: any;
  categoryCountMonthly: string[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  getdatagmv() {
    this.dataToShow = [];
    let req: any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
    }
    console.log(req);
    this.dashboardService.getdatagmv(req).subscribe((data: any) => {

      console.log(data)
      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res;
        this.categoryCountMonthly = Object.keys(this.datalist.categoryCount);
        this.categoryGMVMonthly = Object.keys(this.datalist.categoryGMV);
        for (let i = 0; i < this.categoryCountMonthly.length; i++) {
          const element = this.categoryCountMonthly[i];
          const gmvElement = this.categoryGMVMonthly[i];
          let objCount = {
            type: this.dropdown.controls['entityType'].value,
            category: element,
            count: this.getMonthValue(element),
            gmvCount: this.getGMVValue(gmvElement),
          }
          this.dataToShow.push(objCount);
        }
        console.log(this.dataToShow);

      }
    })

  }
  getMonthValue(category): any {
    return this.datalist['categoryCount'][category];
  }
  getGMVValue(category): any {
    return this.datalist['categoryGMV'][category];
  }
}
