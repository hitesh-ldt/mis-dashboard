import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FilterPipe } from 'src/app/filter.pipe';
import { FormControl, FormGroup } from '@angular/forms';
FilterPipe
export interface PeriodicElement {
  categoryId: number;
  categoryName: string;
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
  displayedColumns: string[] = ['categoryId', 'entityType', 'categoryName', 'categoryYear', 'categoryTransactionCount'];
  dataSource = new MatTableDataSource(this.array)

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
   dropdown=new FormGroup ({
    entityType: new FormControl(""),
    startYear:new FormControl(""),
    endYear:new FormControl(""),
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
  getdata(){
    console.log("+++");
    let req:any = {
      'entityType': this.dropdown.controls['entityType'].value,
      'startYear': this.dropdown.controls['startYear'].value,
      'endYear': this.dropdown.controls['endYear'].value,
      }
      console.log(req);
    this.dashboardService.getdata(req).subscribe((data: any) => {
      console.log(data)
      if(data.statusCode==200){
        let res =data.body
        this.datalist=res
      }
    

    })

      
  }
}
