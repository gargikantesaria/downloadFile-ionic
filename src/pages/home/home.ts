import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private fileTransfer: FileTransferObject;
  public downloadFile;

  constructor(public navCtrl: NavController, private transfer: FileTransfer, private file: File,
    private fileOpener: FileOpener) {
  }

  ionViewDidLoad() {
  }

  public download(fileName, filePath) {

    let url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();

    this.fileTransfer.download(url, this.file.dataDirectory + fileName, true).then((entry) => {
      //here logging our success downloaded file path in mobile. 
      console.log('download completed: ' + entry.toURL());

      // open downloaded file 
      this.downloadFile = entry.toURL();
      //this.openFileHandler(entry.toURL());
    }, (error) => {
      //here logging an error. 
      console.log('download failed: ' + JSON.stringify(error));
    });

  }

  downloadHandler() {
    this.download('DownloadFile.pdf', 'http://www.africau.edu/images/default/sample.pdf');
    // this.download('Downloadimage.png', 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png');
  }

  openFileHandler() {
    this.fileOpener.open(this.downloadFile, '')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
  }

}
