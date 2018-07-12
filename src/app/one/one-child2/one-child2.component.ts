import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { OneComponent } from '../one.component'
@Component({
  selector: 'app-one-child2',
  templateUrl: './one-child2.component.html',
  styleUrls: ['./one-child2.component.css']
})
export class OneChild2Component implements OnInit {

  imgData;
  imgData2 = 'assets/1.jpg';

  time;
  ff = false; // 判断是否点击全选
  num = 0;
  interval; // 计时只能用在全局，放在嵌套的函数里就不好使（无法停止，this指向不明）
  myForm: FormGroup;
  form: FormGroup;
  likesArr: string[] = ['喜欢', '不喜欢', '非常喜欢', '超级喜欢', '喜欢得不得了'];
  selects: string[] = [];
  item = {
    id: 1
  }
  seeItem;
  formGroupSelect;
  intervals;

  constructor(
    private fb: FormBuilder,
    public oneComponent: OneComponent  // 子组建获取、修改父组件的方法（把父组件注入到子组件中）
  ) { }
  get likes() {
    return this.myForm.get('likes');
  };
  ngOnInit() {
    this.time = 0;
    this.myForm = this.fb.group({
      likes: this.fb.array([false, false, false, false, false])
    });
    this.form = this.fb.group({
      one: false,
      two: false,
      three: false,
      four: false,
    });

    this.likes.valueChanges.subscribe(values => {
      let selects: string[] = [];
      values.forEach((selected: boolean, i: number) => {
        selected === true && selects.push(this.likesArr[i])
      });
      this.selects = selects;
    });

    this.intervals = setInterval(() => {
      this.oneComponent.childInterval++;
    }, 1000);
    this.imgData = 'https://upload-images.jianshu.io/upload_images/311249-f67fda8e02d91fd6?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240'
  }

  start() {
    this.time = 5;
    this.interval = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(this.interval);
      }
    }, 1000)
  }
  stop() {
    clearInterval(this.interval)
  }
  onSubmit(form, event) {
    event.preventDefault();
    this.formGroupSelect = form.value
  }
  turnAll(form) { // 点击全选
    let value = form.value;
    if (this.ff == true) {
      for (let i in value) {
        this.form.get(i).patchValue(true)
      }
      this.num = 4;
    } else {
      for (let i in value) {
        this.form.get(i).patchValue(false)
      }
      this.num = 0
    }
  }
  isAll() { // 判断是否将全部checkbox一个一个点过了
    for (let i in this.form.value) {
      if (this.form.value[i] == true) {
        this.num++
      }
    }
    if (this.num == 4) {
      this.ff = true
    } else {
      this.ff = false
      this.num = 0
    }
  }
  selectItem(item, ite) {
    this.seeItem = item;
  }
  ngOnDestroy(): void {
    clearInterval(this.intervals)
  }
}