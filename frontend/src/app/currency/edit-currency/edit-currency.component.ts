import { Component, OnInit } from '@angular/core';
import { Pair } from '../pair';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCurrencyService } from './edit-currency.service';

@Component({
  selector: 'app-edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.scss']
})
export class EditCurrencyComponent implements OnInit {
  public currency = {
    pair: '',
    price: '',
    timestamp: ''
  };

  public pairs: Pair[] = [
    {value: 'BTC/USD', viewValue: 'BTC/USD'},
    {value: 'BTC/ETH', viewValue: 'BTC/ETH'},
    {value: 'ETH/USD', viewValue: 'ETH/USD'}
  ];

  private id: any;

  constructor(private route: ActivatedRoute, private editCurrencyService: EditCurrencyService, private router: Router) { }

  ngOnInit() {
    this.findCurrency();
  }

  findCurrency() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.editCurrencyService.find(this.id)
      .subscribe(data => {
        this.currency.pair = data.pair;
        this.currency.price = Number(data.price).toFixed(2);
        this.currency.timestamp = data.timestamp;
      });
  }

  updateCurrency() {
    this.editCurrencyService.update(this.id, this.currency)
      .subscribe(data => this.router.navigate(['currencies']));
  }
}
