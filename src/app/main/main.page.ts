import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent, ModalService } from '../modal/modal.component';
import { Router } from '@angular/router';


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
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, ModalComponent]
})
export class MainPage implements OnInit, OnDestroy {

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private modalService: ModalService,
    private router: Router,
  ) {}

  inpForm = this.formBuilder.group({
    inpValue: 0,
  });

  remainingTime: number = 10;
  counting: boolean = false;
  countdownInterval: any;
  score: number = 0;

  ngOnInit() {
    this.geneEqua();
    this.startCountdown();
  }
  ngOnDestroy(): void {
    if(this.counting){
      clearInterval(this.countdownInterval);
    }
  }

  onSubmit(): void {
    const data = this.inpForm.value.inpValue
    if (data != undefined && data != null){
      this.check_result(data);
      this.inpForm.reset();
      this.stopCountdown();
      this.startCountdown();
    }
  }

  startCountdown() {
    console.log(this.counting);
    if (!this.counting) {
      this.counting = true;
      this.countdownInterval = setInterval(() => {
        this.remainingTime--;
        if (this.remainingTime === 0) {
          this.stopCountdown();
          this.openPseudoModal()
        }
      }, 1000);
    }
  }

  pauseCountdown() {
    clearInterval(this.countdownInterval);
    this.counting = false;
    console.log("PAUSE");
  }

  stopCountdown() {
    clearInterval(this.countdownInterval);
    this.counting = false;
    this.remainingTime = 10;
  }

  geneRandomNumber(max: number) {
    return Math.floor(Math.random() * (max - 1) + 1);
  }
  
  geneEqua() {
    Globals.numberOne = this.geneRandomNumber(20);
    Globals.numberTwo = this.geneRandomNumber(10);
    Globals.symbol = this.geneRandomNumber(4);
    const showEqua = document.getElementById('equation');
    const showScore = document.getElementById('score');

    if(showScore != undefined && showScore != null) {
      showScore.textContent = this.score.toString();
    }
 
    
    switch(Globals.symbol){
      case 0:
        // Addtion
        Globals.result = Globals.numberOne + Globals.numberTwo;
        
        if (showEqua != undefined && showEqua != null){
          showEqua.textContent = Globals.numberOne + ' + ' + Globals.numberTwo + ' = ?';
        }
        
        break;
  
      case 1:
        // Soustraction
        Globals.result = Globals.numberOne - Globals.numberTwo;
        if (showEqua != undefined && showEqua != null){
          showEqua.textContent = Globals.numberOne + ' - ' + Globals.numberTwo + ' = ?';
        }
        break;
  
      case 2:
        // Multiplication
        Globals.result = Globals.numberOne * Globals.numberTwo;
        if (showEqua != undefined && showEqua != null){
          showEqua.textContent = Globals.numberOne + ' * ' + Globals.numberTwo + ' = ?';
        }
        break;
  
      case 3:
        // Division
        Globals.result = Globals.numberOne * Globals.numberTwo;
        if (showEqua != undefined && showEqua != null){
          showEqua.textContent = Globals.result + ' / ' + Globals.numberTwo + ' = ?';
        }
        break;
      
      default:
        console.log("Error gen Number");
        break;
    }
    this.startCountdown();
  }
  
  
  check_result(inpValue:number) {

    if(Globals.symbol == 3) {
      if(inpValue == Globals.numberOne) {
        console.log("Cooreect");
        this.score++;
        this.stopCountdown();
        this.geneEqua();
        this.startCountdown();        
      } else {
        console.log("FAUX");
        console.log(Globals.numberOne + " " + Globals.symbol + " " + Globals.numberTwo + " " + Globals.result);
        this.pauseCountdown();
        this.stopCountdown();
        this.openPseudoModal();
      }
    } else {
      if (inpValue == Globals.result){
        console.log("Cooreect");
        this.score++;
        this.stopCountdown();
        this.geneEqua();
        this.startCountdown();
      } else {
        console.log("FAUX");
        console.log(Globals.numberOne + " " + Globals.symbol + " " + Globals.numberTwo + " " + Globals.result);
        this.pauseCountdown();
        this.stopCountdown();
        this.openPseudoModal();
      }
    }
  }

  async openPseudoModal() {
    if (!this.modalService.isModalOpen()) {
      this.modalService.openModal();

      const modal = await this.modalController.create({
        component: ModalComponent,
        componentProps: {},
      });

      modal.onDidDismiss().then((data) => {
        if (data.role === 'ok') {
          const pseudo = data.data.pseudo;
          //this.geneEqua();
          this.stopCountdown();
        }
        this.score = 0;
        this.router.navigate(['/home']);
        this.modalService.closeModal();
        
      });

      return await modal.present();
    }
  }
}



