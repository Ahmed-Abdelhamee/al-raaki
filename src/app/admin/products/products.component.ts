import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  controlView:string="add-data";
  
  uploading:any="";
  
  dataControl(){

  }

  // promo upload to show which files uploaded and the size of each photo
  upload(event:any){
    const files=event.target.files[0];
    let loader=new FileReader();
    if(event.target.files[0].size/1024 > 30)
    loader.readAsDataURL(event.target.files[0])
    loader.onload=(event)=>{
      this.uploading=event.target?.result;  // show the photos before uploading
    }
  }
  
}