import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html'
})
export class ModalImgComponent implements OnInit {

  public urlImamge: string;
  @Input() img;
  @Input() name;
  nameId: number;
  constructor(private userService: UserService) { 
    this.urlImamge = environment.urlImg;
    this.nameId = new Date().getMilliseconds();
  }


  ngOnInit(): void {
  }

}
