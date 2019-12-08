import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html'
})
export class OrderListComponent implements OnInit {
  orderForm = this.formBuilder.group({
    shopName: new FormControl('', Validators.required),
    drinkItems: this.formBuilder.array([
      this.formBuilder.group(this.createDrinkItems())
    ]) 
  });
  
  allSize=[ '大', '中', '小' ];
  allSugar=[ '正常糖', '少糖', '半糖', '微糖' , '無糖' ];
  allIce=[ '正常冰', '少冰', '微冰', '去冰', '熱' ];

  get drinkItemsArray(): FormArray{
    return this.orderForm.get('drinkItems') as FormArray;
  }

  constructor( private formBuilder:FormBuilder ) { }

  ngOnInit() {}

  createDrinkItems(){
    return {
      customer: new FormControl('', Validators.required),
      drinkName: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      sugar: new FormControl('', Validators.required),
      ice: new FormControl('', Validators.required),
      price: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.min(1)])
      ),
    };
  }

  addItem() {
    this.drinkItemsArray.push(this.formBuilder.group(this.createDrinkItems()));
  }

  deleteItem(idx: number) {
    this.drinkItemsArray.removeAt(idx);
  }
  
  submit(){
    if (this.orderForm.invalid) {
      return alert('請填寫完整');
    }

    alert('訂購成功');
    this.orderForm.reset();
  }
}
