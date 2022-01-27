import { Component, OnInit } from '@angular/core';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Item } from '../Item';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
  editedItem: string = "none";
  newItem: Item = { _id: "", name: "", category: "", amount: 1 };
  items: Item[];

  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemsService.getItems()
      .subscribe(items => this.items = items);
  }

  addItem(): void {
    if (this.newItem.name && this.newItem.category) {
      this.itemsService.addItem(this.newItem)
        .pipe(map(res => res),
          switchMap(res => this.itemsService.getItem(this.newItem.name)),
          map(res => { this.items.push(res); this.newItem = { _id: "", name: "", category: "", amount: 1 } })
        )
        // .subscribe(item => { this.items.push(this.newItem); this.newItem = { _id: "", name: "", category: "", amount: 1 } })
        .subscribe();
    }
  }

  updateItem(item: Item): void {
    this.itemsService.updateItem(item).subscribe();
    this.toggleEdit('');
  }

  deleteItem(item: Item): void {
    console.log(item)
    this.items = this.items.filter(h => h !== item);
    this.itemsService.deleteItem(item._id).subscribe();
  }

  toggleEdit(id: string): void {
    if (this.editedItem === "none") {
      this.editedItem = id;
    } else {
      this.editedItem = "none";
    }
  }
}
