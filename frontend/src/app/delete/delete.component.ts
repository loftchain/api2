import { Component, OnInit } from '@angular/core';
import {DeleteService} from './delete.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  public deletedItem;
  public itemUrl;
  public redirectUrl;
  constructor(private deleteService: DeleteService, private router: Router) { }

  ngOnInit() {
    this.deleteService.messageSource.subscribe(data => {
      this.deletedItem = data.data;
      this.itemUrl = data.url;
      this.redirectUrl = data.redirect;
    });
  }

  deleteData(item) {
    this.deleteService.deleteData(item.id, this.itemUrl)
      .subscribe(data => {
        this.router.navigate([this.redirectUrl]);
      });
  }
}
