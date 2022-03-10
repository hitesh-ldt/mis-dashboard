import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-monthgmv',
  templateUrl: './monthgmv.component.html',
  styleUrls: ['./monthgmv.component.scss']
})
export class MonthgmvComponent implements OnInit {

  startYear: any = [{ year: "2022", value: "2012-01-01" },
  { year: "2021", value: "2013-01-01" },
  { year: "2020", value: "2014-01-01" },
  { year: "2019", value: "2015-01-01" },
  { year: "2018", value: "2016-01-01" },
  { year: "2017", value: "2017-01-01" },
  { year: "2016", value: "2018-01-01" },
  { year: "2015", value: "2019-01-01" },
  { year: "2014", value: "2020-01-01" },
  { year: "2013", value: "2021-01-01" },
  { year: "2012", value: "2022-01-01" },
  ];
  dropdown = new FormGroup({
    entityType: new FormControl(""),
    startYear: new FormControl(""),
  })
  datalist: any;
  dataToShow: any = [];
  categoryNamelist: any;
  categoryMonthly = [];
  totalCount: [];
  datacount: unknown[];
  total: any;
  totalFlag: false;
  constructor(private dashboardService: DashboardService) { }
  ngOnInit() {
  }

  getdatamonth() {
   let totalFlag = false;
    this.dataToShow = [];
    let req: any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
    }
    console.log(req);
    if(req.entityType == 0){
      totalFlag = true
      this.getTotal(); 
      console.log(totalFlag);
      
    }else{
      console.log(totalFlag);
      
    this.dashboardService.getdatamonthgmv(req).subscribe((data: any) => {
      console.log(data)
      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res;
        this.categoryMonthly = Object.keys(this.datalist[0]);
        for (let i = 0; i < this.categoryMonthly.length; i++) {
          const element = this.categoryMonthly[i];

          let objCount = {
            count: this.dropdown.controls['entityType'].value,
            category: element,
            janCount: this.getMonthValue(0, element),
            febCount: this.getMonthValue(1, element),
            marCount: this.getMonthValue(2, element),
            aprCount: this.getMonthValue(3, element),
            mayCount: this.getMonthValue(4, element),
            junCount: this.getMonthValue(5, element),
            julCount: this.getMonthValue(6, element),
            augCount: this.getMonthValue(7, element),
            sepCount: this.getMonthValue(8, element),
            octCount: this.getMonthValue(9, element),
            novCount: this.getMonthValue(10, element),
            decCount: this.getMonthValue(11, element),
            // total:
          }
          this.dataToShow.push(objCount);
        }
      
      }
    })
  }}
  getMonthValue(index, category): any {
    return this.datalist[index][category];
  }
  getTotal() {
    this.dataToShow = [];
    let req: any = {
      'startYear': this.dropdown.controls['startYear'].value,
    }
    console.log(req);
    this.dashboardService.gettotalmonthgmv(req).subscribe((data: any) => {
      console.log(data)
      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res;
        this.categoryMonthly = Object.keys(this.datalist[0]);
        for (let i = 0; i < this.categoryMonthly.length; i++) {
          const element = this.categoryMonthly[i];

          let objCount = {
            category: element,
            janCount: this.getMonthValue(0, element),
            febCount: this.getMonthValue(1, element),
            marCount: this.getMonthValue(2, element),
            aprCount: this.getMonthValue(3, element),
            mayCount: this.getMonthValue(4, element),
            junCount: this.getMonthValue(5, element),
            julCount: this.getMonthValue(6, element),
            augCount: this.getMonthValue(7, element),
            sepCount: this.getMonthValue(8, element),
            octCount: this.getMonthValue(9, element),
            novCount: this.getMonthValue(10, element),
            decCount: this.getMonthValue(11, element),
            // total:
          }
          this.dataToShow.push(objCount);
        }
      }
    })
  }
}