import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

declare var $;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  @ViewChild('mTableData', { static: false }) table;
  private items: Array<any>;
  private mTableData: any;
  private mLabelAddEdit: string;
  private mClassIconAddEdit: string;
  private mFormAddEdit;
  private dtOption: any = {
    paging: true,
    ordering: true,
    info: true,
    bDestroy: true
  };

  constructor(private categoryService: CategoryService, private chRef: ChangeDetectorRef, private formBuilder: FormBuilder) {
    this.controlAddBinding();
    this.resetForm();
  }

  ngOnInit() {
    this.onLoadClick();
  }

  onLoadClick() {
    this.categoryService.getData().subscribe(res => {
      this.items = res;

      // this.chRef.detectChanges();
      // this.mTableData = $(this.table.nativeElement);
      // this.mTableData.DataTable(this.dtOption);
    });
  }

  onRefreshClick() {
    this.onLoadClick();
  }

  onAddClick() {
    this.controlAddBinding();
    this.resetForm();
  }

  onEditClick(item: any) {
    this.controlEditBinding();
    this.mFormAddEdit = this.formBuilder.group({
      _id: item._id,
      name: item.name,
      upd_by: item.upd_by,
      last_upd_date: item.last_upd_date
    });
  }

  onDeleteClick(item: any) {
    this.mFormAddEdit = this.formBuilder.group({
      _id: item._id,
      name: item.name,
      upd_by: item.upd_by,
      last_upd_date: item.last_upd_date
    });
  }

  addEditProcess(formData: any) {
    // console.warn(formData);
    if (this.mLabelAddEdit === 'Add') {
      this.categoryService.addData(formData).subscribe(res => {
        this.onLoadClick();
        this.resetForm();
      });
    } else {
      this.categoryService.updateData(formData).subscribe(res => {
        this.onLoadClick();
        this.resetForm();
      });
    }
    document.getElementById('btnModalAddEditItemClose').click();
  }

  deleteProcess(formData: any) {
    this.categoryService.deleteData(formData._id).subscribe(res => {
      this.onLoadClick();
    });
  }

  onTestClick() {
    // console.warn('Your order has been submitted', this.mFormAddEdit);
  }

  resetForm() {
    // this.mFormAddEdit.reset();
    this.mFormAddEdit = this.formBuilder.group({
      _id: '',
      name: '',
      upd_by: 'Chanchai Thaiyanon',
      last_upd_date: ''
    });
  }

  controlAddBinding() {
    this.mLabelAddEdit = 'Add';
    this.mClassIconAddEdit = 'fa fa-plus';
  }

  controlEditBinding() {
    this.mLabelAddEdit = 'Edit';
    this.mClassIconAddEdit = 'fa fa-edit';
  }
}

