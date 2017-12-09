import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TalksServiceProvider } from './../../providers/talks-service/talks-service';

@Component({
  selector: 'page-course',
  templateUrl: 'course.html',
  providers: [TalksServiceProvider]
})
export class CoursePage {
  courseId: number;
  course: any;
  constructor(private NavParams: NavParams, private TalksService: TalksServiceProvider) {}

  ionViewDidLoad() {
    this.courseId = this.NavParams.get('course');

    this.TalksService.get(this.courseId).subscribe(
      data => {
        this.course = data;
      }
    );
  }

}
