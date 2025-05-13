import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ParticlesModule } from '../../shared/components/particles/particles.module';
import { CoursesComponent } from './courses.component';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CoursesComponent }]),
    FormsModule,
    ParticlesModule
  ],
  exports: [CoursesComponent]
})
export class CoursesModule { }
