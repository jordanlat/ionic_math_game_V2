import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


export class Globals {
  public static numberOne: number = 0;
  public static numberTwo: number = 0;
  public static result: number = 0;
  public static symbol: number = 0;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class MainPage implements OnInit {

  inpForm = this.formBuilder.group({
    inpValue: 0,
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    geneEqua();
  }

  onSubmit(): void {
    const data = this.inpForm.value.inpValue
    if (data != undefined && data != null){
      check_result(data);
      this.inpForm.reset();
    }
  }

}

function geneRandomNumber(max: number) {
  return Math.floor(Math.random() * max)
}

function geneEqua() {
  Globals.numberOne = geneRandomNumber(20);
  Globals.numberTwo = geneRandomNumber(10);
  Globals.symbol = geneRandomNumber(4);
  const showEqua = document.getElementById('equation');
  
  switch(Globals.symbol){
    case 0:
      // Addtion
      Globals.result = Globals.numberOne + Globals.numberTwo;
      
      if (showEqua != undefined && showEqua != null){
        showEqua.textContent = Globals.numberOne + ' + ' + Globals.numberTwo;
      }
      
      break;

    case 1:
      // Soustraction
      Globals.result = Globals.numberOne - Globals.numberTwo;
      if (showEqua != undefined && showEqua != null){
        showEqua.textContent = Globals.numberOne + ' - ' + Globals.numberTwo;
      }
      break;

    case 2:
      // Multiplication
      Globals.result = Globals.numberOne * Globals.numberTwo;
      if (showEqua != undefined && showEqua != null){
        showEqua.textContent = Globals.numberOne + ' * ' + Globals.numberTwo;
      }
      break;

    case 3:
      // Division
      Globals.result = Globals.numberOne * Globals.numberTwo;
      if (showEqua != undefined && showEqua != null){
        showEqua.textContent = Globals.result + ' / ' + Globals.numberTwo;
      }
      break;
    
    default:
      console.log("Error gen Number");
      break;
  }
}


function check_result(inpValue:number) {
  console.log(inpValue);
  console.log(typeof(inpValue));
 
  if (inpValue == Globals.result){
    console.log("Cooreect");
  } else {
    console.log("FAUX");
    console.log(Globals.numberOne + " " + Globals.symbol + " " + Globals.numberTwo + " " + Globals.result);
  }

  geneEqua();
  
}