import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {

  url = "http://localhost:3000";
  scannedCode;
  scannedItem;
  @ViewChild('sourceSelect', { static: false }) sourceSelect: ElementRef;
  
  name = "";
  category = "";
  result = "";
  productName = "";
  amount = 1;
  desiredDevice: MediaDeviceInfo = null;
  cameras: MediaDeviceInfo[];
  scannerEnabled = false;
  displayAddSection = false;
  displayBarcodeSection = false;

  camerasFoundHandler(cameras: MediaDeviceInfo[]): void {
    console.log(this.result)
    this.cameras = cameras;
    this.desiredDevice = this.sourceSelect.nativeElement.value;
    console.log(cameras);
  }
  scanSuccessHandler(code: string): void {
    console.log(code);
    this.scannedCode = code;
    this.result = code;
    this.scannedCode = code;
    this.checkBarcodeDB(code);
  }

  scanErrorHandler(err): void {
    this.result = err;
  }

  addBarcode() {
    // add barcode
    fetch(this.url + '/products/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.name,
        category: this.category,
        code: this.scannedCode
      })
    }).catch(err => console.log(err))
    //reset scanner
    this.resetScanner();
  }

  // undefined = not found
  async checkBarcodeDB(result) {
    let res = await fetch(this.url + '/products/get/' + result, {
      method: 'GET'
    })
    if (res.status !== 404) {
      this.scannedItem = await res.json();
      this.displayAddSection = true;
      this.productName = "name: " + this.scannedItem.name;
    } else {
      this.displayBarcodeSection = true;

    }
  }

  async addItem() {
    let item;
    //check inventory for the item
    let response = await fetch(this.url + '/getItem/' + this.scannedItem.name, {
        method: 'GET'
    })
    if (response.status !== 404) {
        item = await response.json();
        console.log(item)
    }
    
    if (item === undefined) {
        console.log(item + "inside second if")
        fetch(this.url + '/add', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: this.scannedItem.name,
                    amount: this.amount,
                    category: this.scannedItem.category
                })
            })
            .catch(err => console.log(err));
    } else {
        fetch(this.url + "/update", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: item._id,
                    name: item.name,
                    amount: this.amount + item.amount,
                    category: item.category
                })
            })
            .catch(err => console.log(err));
    }
    //reset scanner
    this.resetScanner();
}

  resetScanner() {
    this.name = '';
    this.category = '';
    this.amount = 1;
    this.displayAddSection = false;
    this.displayBarcodeSection = false;
    this.result = '';
    //not disabling scanner to avoid ngx-scanner bugs
    // this.scannerEnabled = false;
    // this.desiredDevice = this.sourceSelect.nativeElement.value;
    console.log('Reset.')
  }

}
