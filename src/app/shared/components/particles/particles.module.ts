import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesComponent } from './particles.component';

@NgModule({
  declarations: [ParticlesComponent],
  imports: [CommonModule],
  exports: [ParticlesComponent]
})
export class ParticlesModule { }
