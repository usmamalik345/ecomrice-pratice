import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  constructor(
    private spinnerService: SpinnerService,
    private cdef: ChangeDetectorRef
  ) {
    this.init();
  }

  showSpinner = false;

  ngOnInit(): void {}
  init() {
    
    this.spinnerService.getSpinnerOberver().subscribe((status)=>{
      this.showSpinner = status === "start"
      // this.cdef.detectChanges(); 
    })

  }
}
