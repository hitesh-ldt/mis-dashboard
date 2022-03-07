import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.scss']
})
export class BalancesheetComponent implements OnInit {
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
  categoryAsset: any;
  categoryCurrent: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }
  getdata() {
    let req: any = {
      'startYear': this.dropdown.controls['startYear'].value,
      'endYear': this.dropdown.controls['endYear'].value,
    }
    console.log(req);
    this.dashboardService.getdatabalance(req).subscribe((data: any) => {
      console.log(data)
      this.datalist = data.body
      console.log(this.datalist[0]['equityAndLiabilities']['shareholdersFund'])

      if (data.statusCode == 200) {
        let res = data.body
        this.datalist = res
        this.categoryAsset = Object.keys(this.datalist[0]);
        this.categoryCurrent = Object.keys(this.datalist[0].equityAndLiabilities);
        console.log(this.categoryCurrent);
        for (let i = 0; i < this.categoryAsset.length; i++) {
          const element = this.categoryAsset[i];
          const gmvElement = this.categoryCurrent[i];
          let objCount = {
            asset: element,
            assetCount: this.getMonthValue(element),
            equity: gmvElement,
            equitycount: this.getGMVValue(gmvElement),
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
  getGMVValue(category): any {

    return this.datalist[0]['equityAndLiabilities'][category];
  }
}