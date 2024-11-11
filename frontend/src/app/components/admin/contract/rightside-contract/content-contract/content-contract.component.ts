import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { PrimeModule } from '../../../../../modules/prime/prime.module';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  matAddOutline,
  matArrowBackOutline,
  matArrowForwardOutline,
  matDeleteForeverOutline,
  matFolderZipOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-content-contract',
  standalone: true,
  imports: [PrimeModule, NgIconComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './content-contract.component.html',
  styleUrl: './content-contract.component.scss',
  providers: [
    provideIcons({
      matSearchOutline,
      matAddOutline,
      matDeleteForeverOutline,
      matFolderZipOutline,
      matArrowForwardOutline,
      matArrowBackOutline,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContentContractComponent implements OnInit {
  contentContractForm: FormGroup<any>;
  @ViewChildren('dropdown') dropdowns!: QueryList<any>;
  @ViewChildren('inputField') inputs!: QueryList<ElementRef>;

  customers: any[] = [
    {
      id: 1,
      name: 'James Butt',
      country: {
        name: 'Algeria',
        code: 'dz',
      },
      company: 'Benton, John B Jr',
      date: '2015-09-13',
      status: 'unqualified',
      verified: true,
      activity: 17,
      representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png',
      },
      balance: 70663,
    },
    {
      id: 2,
      name: 'Josephine Darakjy',
      country: {
        name: 'Egypt',
        code: 'eg',
      },
      company:
        'Chanay, Jeffrey A Esq, loạnabfhbfjbdfbsndf snmd fnmsd fsdnbfsdfbsdsd fbsjfbsf',
      date: '2019-02-09',
      status: 'proposal',
      verified: true,
      activity: 0,
      representative: {
        name: 'Amy Elsner',
        image: 'amyelsner.png',
      },
      balance: 82429,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
    {
      id: 3,
      name: 'Art Venere',
      country: {
        name: 'Panama',
        code: 'pa',
      },
      company: 'Chemel, James L Cpa',
      date: '2017-05-13',
      status: 'qualified',
      verified: false,
      activity: 63,
      representative: {
        name: 'Asiya Javayant',
        image: 'asiyajavayant.png',
      },
      balance: 28334,
    },
  ];
  listHangHoa: any[] = [];
  paginatedHangHoa: any[] = []; // Danh sách dữ liệu được phân trang
  selectedHangHoa!: any[];
  listChiTietHangHoa: any[] = [];
  selectedChiTietHangHoa: any[] = [];

  selectedCustomers!: any[];
  loading: boolean = true;

  visible: boolean = false;

  first: number = 0;

  rows: number = 10;

  constructor(
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.contentContractForm = this.formBuilder.group(
      {
        loaiHopDong: [null, Validators.required],
        namKinhPhi: ['', Validators.required],
        lanhDaoPhuTrach: [null],
        canBoPhuTrach: [null, Validators.required],
        trangThai: [null, Validators.required],
        soHopDong: ['', Validators.required],
        tenHopDong: ['', Validators.required],
        nguonKinhPhi: [null],
        donViCungCap: [null, Validators.required],
        ngayKy: [null, Validators.required],
        ngayCoHieuLuc: [null, Validators.required],
        soNgayThucHien: [0, [Validators.required, Validators.min(1)]],
        tienDoHopDong: [{ value: '', disabled: true }],
        ngayKetThucHopDong: [{ value: null, disabled: true }],
        giaTriHopDongBanDau: [{ value: '', disabled: true }],
        giaTriThucTe: [{ value: '', disabled: true }],
        daThanhToan: [{ value: 0, disabled: true }],
        conThanhToan: [{ value: '', disabled: true }],
        ghiChu: [''],
      }
      // { validators: this.ngayCoHieuLucValidator } --> bị ghi đè validator
    );
    // Thêm validator tùy chỉnh cho toàn bộ form, tránh ghi đè validator
    this.contentContractForm.setValidators(
      this.ngayCoHieuLucValidator.bind(this)
    );

    // Tính ngày kết thúc hợp đồng
    this.loadNgayKetThucHopDong();
  }

  ngOnInit(): void {
    this.loading = false;
    this.loadMockData();
    this.updatePaginatedData();
  }

  // Phương thức reset form về mặc định và tắt validate
  resetForm() {
    this.contentContractForm.reset({
      loaiHopDong: null,
      namKinhPhi: '',
      lanhDaoPhuTrach: null,
      canBoPhuTrach: null,
      trangThai: null,
      soHopDong: '',
      tenHopDong: '',
      nguonKinhPhi: null,
      donViCungCap: null,
      ngayKy: null,
      ngayCoHieuLuc: null,
      soNgayThucHien: 0,
      tienDoHopDong: '',
      ngayKetThucHopDong: null,
      giaTriHopDongBanDau: '',
      giaTriThucTe: '',
      daThanhToan: 0,
      conThanhToan: '',
      ghiChu: '',
    });
    this.contentContractForm.markAsPristine();
    this.contentContractForm.markAsUntouched();
    this.contentContractForm.updateValueAndValidity();
  }

  // Validator tùy chỉnh
  validateForm(): void {
    if (this.contentContractForm.invalid) {
      return this.contentContractForm.markAllAsTouched();
    }
  }
  validateInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Loại bỏ các ký tự không phải là số
    input.value = input.value.replace(/[^0-9]/g, '');
  }
  onCalendarKeydown(event: KeyboardEvent, date: string): void {
    if (event.key === 'Enter') {
      const inputControl = this.contentContractForm.get(date);
      if (!inputControl?.value) {
        // Nếu chưa chọn ngày, lấy ngày hiện tại
        const today = new Date();
        inputControl?.setValue(today); // Thiết lập giá trị cho trường ngày
      }
    }
  }
  onDateInput(event: Event, date: string): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Kiểm tra nếu đã có ngày được chọn
    const inputControl = this.contentContractForm.get(date);
    if (inputControl?.value) {
      // Lọc bỏ các ký tự không phải số
      const filteredValue = value.replace(/[^0-9/]/g, ''); // Chỉ giữ lại số và dấu /
      // Cập nhật giá trị trong trường
      input.value = filteredValue;
      // Cập nhật giá trị trong form control
      inputControl.setValue(filteredValue);
    }
  }
  // Validator kiểm tra ngayKy và ngayCoHieuLuc
  ngayCoHieuLucValidator(form: AbstractControl): { [key: string]: any } | null {
    const ngayKy = form.get('ngayKy')?.value;
    const ngayCoHieuLuc = form.get('ngayCoHieuLuc')?.value;

    if (
      (ngayKy && ngayCoHieuLuc && new Date(ngayKy) > new Date(ngayCoHieuLuc)) ||
      (ngayKy == null && ngayCoHieuLuc)
    ) {
      form.get('ngayCoHieuLuc')?.setErrors({ ngayCoHieuLucError: true });
      return { ngayCoHieuLucError: true };
    }
    // Xóa lỗi nếu điều kiện thỏa mãn
    const errors = form.get('ngayCoHieuLuc')?.errors;
    if (errors && errors['ngayCoHieuLucError']) {
      delete errors['ngayCoHieuLucError'];
      form
        .get('ngayCoHieuLuc')
        ?.setErrors(Object.keys(errors).length ? errors : null);
    }
    return null;
  }
  // Hàm tính toán và thiết lập giá trị cho ngayKetThucHopDong
  setNgayKetThucHopDong() {
    const ngayCoHieuLuc = this.contentContractForm.get('ngayCoHieuLuc')?.value;
    const soNgayThucHien =
      this.contentContractForm.get('soNgayThucHien')?.value;

    if (ngayCoHieuLuc && soNgayThucHien) {
      // Chuyển ngayCoHieuLuc thành Date và loại bỏ timezone bằng cách lấy giá trị gốc
      const ngayCoHieuLucTime = new Date(ngayCoHieuLuc);
      const ngayKetThuc = new Date(ngayCoHieuLucTime.getTime());

      // Cộng số ngày thực hiện vào ngày có hiệu lực
      ngayKetThuc.setDate(ngayKetThuc.getDate() + parseInt(soNgayThucHien));

      this.contentContractForm.get('ngayKetThucHopDong')?.setValue(ngayKetThuc);
    } else {
      // Nếu không có giá trị hợp lệ, đặt null cho ngayKetThucHopDong
      this.contentContractForm.get('ngayKetThucHopDong')?.setValue(null);
    }
  }
  loadNgayKetThucHopDong() {
    // Gọi hàm để thiết lập giá trị cho ngayKetThucHopDong khi form khởi tạo
    this.setNgayKetThucHopDong();

    // Lắng nghe thay đổi trên ngayCoHieuLuc và soNgayThucHien
    this.contentContractForm
      .get('ngayCoHieuLuc')
      ?.valueChanges.subscribe(() => {
        this.setNgayKetThucHopDong();
      });
    this.contentContractForm
      .get('soNgayThucHien')
      ?.valueChanges.subscribe(() => {
        this.setNgayKetThucHopDong();
      });
  }
  // Validate cho các trường trong table
  isInputInvalid(input: any): boolean {
    if (input.value == '' || input.value == null) {
      return true;
    }
    return false;
  }
  validateRequiredFields(): boolean {
    let allValid = true;

    // Kiểm tra dropdowns
    this.dropdowns.forEach((dropdown) => {
      const isDropdownValid = !!dropdown.value;
      if (!isDropdownValid) {
        dropdown.el.nativeElement.classList.add('ng-invalid', 'ng-dirty');
        allValid = false;
      } else {
        dropdown.el.nativeElement.classList.remove('ng-invalid', 'ng-dirty');
      }
    });

    // Kiểm tra inputs
    this.inputs.forEach((input) => {
      const isInputValid = !!input.nativeElement.value.trim();
      if (!isInputValid) {
        input.nativeElement.classList.add('ng-invalid', 'ng-dirty');
        allValid = false;
      } else {
        input.nativeElement.classList.remove('ng-invalid', 'ng-dirty');
      }
    });

    return allValid;
  }

  showDialog() {
    this.visible = true;
  }

  loadMockData(): void {
    this.listHangHoa = Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      code: `P00${i}`,
      name: `Sản phẩm ${i}`,
      category: `Loại ${i}`,
      quantity: 100 + i,
    }));
  }

  xoaChiTietHangHoa() {
    this.confirmationService.confirm({
      message: 'Bạn có muốn xóa các sản phẩm đã chọn?',
      header: 'Thông báo',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'btn-action cancel',
      rejectButtonStyleClass: 'btn-action delete',
      acceptLabel: 'Hủy',
      rejectLabel: 'Xóa',
      accept: () => {},
      reject: () => {
        this.selectedChiTietHangHoa.forEach((item) => {
          const index = this.listChiTietHangHoa.indexOf(item);
          if (index > -1) {
            this.listChiTietHangHoa.splice(index, 1);
          }
        });
        this.selectedChiTietHangHoa = [];
      },
    });
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedHangHoa = this.listHangHoa.slice(start, end); // Lấy dữ liệu từ danh sách theo phạm vi trang
  }
}
