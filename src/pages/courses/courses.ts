import { CoursePage } from '../course/course';
import { TalksServiceProvider } from './../../providers/talks-service/talks-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-courses',
  templateUrl: 'courses.html',
  providers: [TalksServiceProvider]
})
export class CoursesPage {
  courses: any;
  shortcourses: any;

  /**
   *
   * @param NavController
   * @param NavParams
   * @param TalksService
   */
  constructor(public NavController: NavController, public NavParams: NavParams, private TalksService: TalksServiceProvider) { }

  ionViewDidLoad() {
    this.TalksService.list('course').subscribe(
      data => {
        this.courses = data.course;
        this.shortcourses = data.shortcourse;
      }
    );
  }

  /**
   *
   * @param id The course id
   */
  goToCourse(id) {
    this.NavController.push(CoursePage, {
      course: id
    });
  }
}
