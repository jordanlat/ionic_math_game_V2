import { Component, OnInit, Injectable } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Injectable({
  providedIn:'root',
})
export class ModalService {
  modalIsOpen: boolean = false;

  constructor() {}

  isModalOpen(): boolean {
    return this.modalIsOpen;
  }

  openModal() {
    this.modalIsOpen = true;
  }

  closeModal() {
    this.modalIsOpen = false;
  }
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, ReactiveFormsModule]
})
export class ModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) {}
  ngOnInit() {}

  nameForm = this.formBuilder.group(
    {
      pseudo: '',
    }
  )

  pseudo: string = '';
  modalIsOpen: boolean = false;

  onSubmit() {
    const data = this.nameForm.value.pseudo
    if (data != undefined && data != null){
      this.pseudo = data;
      this.nameForm.reset();
      this.closeModal();
    }
  }

  closeModal() {
    this.modalController.dismiss(
      {
        pseudo: this.pseudo
      },
      'ok'
    )
  }
}
