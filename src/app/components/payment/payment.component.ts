import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { product } from 'src/app/Modal/interfaces/product.interface';
import { social } from 'src/app/Modal/interfaces/social.interface';
import { SocialMediaService } from 'src/app/services/social-media.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  cart: product[] = [];

  totalCost: number = 0;

  whatsappDataLink: product[] = [];

  whatsappDataLinkMsg: string = "";

  whatsapp: social[] = [];

  fakeWhatsappButton: boolean = true;
  
  showAlertMsg:boolean=false;

  address = this.formbuilder.group({
    phone: ["", Validators.required],
    country: ["", Validators.required],
    street: ["", Validators.required],
    area: ["", Validators.required],
    home: ["", Validators.required],
  })


  constructor(private formbuilder: FormBuilder, private iconsServ: SocialMediaService, private toastr: ToastrService) {
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    for (let item of this.cart) {
      this.totalCost += item.productDiscount * item.productquantity!;
    }
    this.totalCost += 3;

    // ----------------------- get whatsapp -----------------------
    iconsServ.getSocialAPI("whats").subscribe(data => {
      for (const key in data) {
        this.whatsapp.push(data[key])
      }
    })
  }

  calc(price: number, i: number, value: number) {
    this.totalCost -= 3;
    if ((this.cart[i].productquantity! + value) > 0) {
      this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
      this.totalCost -= price * this.cart[i].productquantity!;
      this.cart[i].productquantity! += value;
      this.totalCost += price * this.cart[i].productquantity!;
      localStorage.setItem("products-cart", JSON.stringify(this.cart));
    }
    this.totalCost += 3;
  }

  viewRealWatsApp() {
    if (this.address.valid)
      this.fakeWhatsappButton = false
    else
      this.fakeWhatsappButton = true
  }

  errorMsg(){
    this.showAlertMsg=true
  }

  whatsappDataLinkFun() {
    let msg = ""
    this.whatsappDataLink = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    if (this.whatsappDataLink.length > 1) {
      for (const temp of this.whatsappDataLink) {
        msg += `%0A اسم المنتج : ${temp.productsTitle} %0A الكمية المطلوبة : ${temp.productquantity} %0A `;
      }
      this.whatsappDataLinkMsg = `مرحبا اريد الحصول علي هذه المنتجات : %0A ${msg} %0A  السعر الكلي شامل خدمة التوصيل  : ${this.totalCost} د.ك `
    } else if (this.whatsappDataLink.length == 1) {
      this.whatsappDataLinkMsg = `مرحبا اريد الحصول علي المنتج : %0A اسم المنتج :  ${this.whatsappDataLink[0].productsTitle} %0A الكمية المطلوبة : ${this.whatsappDataLink[0].productquantity} %0A   السعر الكلي شامل خدمة التوصيل  : ${this.totalCost} د.ك`
    }
  }
  // ----------------------- delete from cart -----------------------
  delete(itemIndex: number) {
    this.totalCost = 0;
    this.cart = JSON.parse(localStorage.getItem("products-cart")!) ? JSON.parse(localStorage.getItem("products-cart")!) : [];
    this.cart.splice(itemIndex, 1);
    localStorage.setItem("products-cart", JSON.stringify(this.cart));
    for (let item of this.cart) {
      this.totalCost += item.productDiscount * item.productquantity!;
    }
    if (this.totalCost != 0)
      this.totalCost += 3;
  }
}
