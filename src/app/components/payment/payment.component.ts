import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { SharedService } from '../../services/shared.service';
import { RentModel } from '../../models/entityModels/rent';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { RentService } from '../../services/rent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  creditCardForm: FormGroup;
  private userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private rentService: RentService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createCreditCardForm();
  }

  createCreditCardForm() {
    this.creditCardForm = this.formBuilder.group({
      iban: [
        '',
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      cvv: [
        '',
        [Validators.required, Validators.maxLength(4), Validators.minLength(3)],
      ],
      name: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });

    this.creditCardForm.get('iban').valueChanges.subscribe(() => {
      this.getIbanValue();
    });

    this.creditCardForm.get('cvv').valueChanges.subscribe(() => {
      this.getIbanValue();
    });
  }

  getIbanValue() {
    return String(this.creditCardForm.get('iban').value);
  }

  getCardNumberValue() {
    return String(this.creditCardForm.get('cvv').value);
  }

  getNameValue() {
    return String(this.creditCardForm.get('name').value);
  }

  getExpirationDate() {
    return this.creditCardForm.get('expirationDate').value;
  }

  completeToRent() {
    if (this.creditCardForm.valid) {
      this.userService
        .getUserWithUserName(this.localStorageService.getItem('userName'))
        .subscribe((response) => {
          this.userId = response.data.userId;
          this.sharedService.allCartItems.forEach((item) => {
            let rentModel: RentModel = {
              bookId: item.book.bookId,
              rentalPrice: item.book.money,
              rentalStart: new Date(),
              userId: this.userId,
              rentalStop: new Date()
            };
            rentModel.rentalStop.setDate(rentModel.rentalStart.getDate() + 10);
            this.rentService.rentBook(rentModel).subscribe(
              (repsonse) => {
                this.toastrService.success('Kiralama başarılı', 'Başarılı');
              },
              (responseError) => {
                this.toastrService.error(
                  'Kitap şuan zaten kiralanmış durumda.',
                  'HATA!'
                );
              }
            );
          });
        });
      this.router.navigate(['/']);
    } else {
      this.toastrService.info('Tüm alanları doldurunuz', 'HATA');
    }
  }
}
