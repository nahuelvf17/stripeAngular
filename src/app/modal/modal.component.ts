import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentService } from '../payment/payment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id;
  @Input() nombre;
  @Input() descripcion;
  @Input() precio;

  constructor(
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  confirmar(id: string): void {
    this.paymentService.confirmar(id).subscribe(
      data => {
        this.alertSuccessFul( data[`id`]);
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }

  cancelar(id: string): void {
    this.paymentService.cancelar(id).subscribe(
      data => {
        this.alertCancel( data[`id`]);
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }

  public alertSuccessFul(idDetail: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'pago confirmado',
      text: 'se ha confirmado el pago con id:' + idDetail,
      width: 600,
      showConfirmButton: false,
      timer: 3000
    })
  }

  public alertCancel(idDetail: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'pago cancelado',
      text : 'se ha cancelado el pago con id: ' +  idDetail,
      width: 600,
      showConfirmButton: false,
      timer: 3000
    })
  }
}
