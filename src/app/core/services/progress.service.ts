import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  constructor(private authService: AuthService) {}

  getCourseProgress(courseId: string): Observable<number> {
    const user = this.authService.currentUserValue;
    if (!user) return of(0);
    
    const progress = user.progress[courseId]?.progressPercentage || 0;
    return of(progress);
  }

  completeLesson(courseId: string, lessonId: string): Observable<boolean> {
    const user = this.authService.currentUserValue;
    if (!user) return of(false);
    
    // Mise à jour de la progression
    if (!user.progress[courseId]) {
      user.progress[courseId] = {
        completedLessons: [],
        lastAccessed: new Date(),
        progressPercentage: 0
      };
    }
    
    // Vérifier si la leçon n'est pas déjà complétée
    if (!user.progress[courseId].completedLessons.includes(lessonId)) {
      user.progress[courseId].completedLessons.push(lessonId);
      
      // Mettre à jour le pourcentage de progression
      // Dans une vraie application, cela dépendrait du nombre total de leçons
      user.progress[courseId].progressPercentage = Math.min(
        100,
        user.progress[courseId].completedLessons.length * 10 // Exemple : 10% par leçon
      );
      
      user.progress[courseId].lastAccessed = new Date();
      
      // Mettre à jour l'utilisateur
      this.authService.updateUser(user);
      
      return of(true);
    }
    
    return of(false);
  }
  
  completeQuiz(courseId: string, quizId: string, score: number, passingScore: number): Observable<boolean> {
    const user = this.authService.currentUserValue;
    if (!user) return of(false);
    
    const passed = score >= passingScore;
    
    if (passed) {
      // Marquer le quiz comme réussi
      if (!user.progress[courseId]) {
        user.progress[courseId] = {
          completedLessons: [],
          lastAccessed: new Date(),
          progressPercentage: 0
        };
      }
      
      // S'assurer que le quiz est marqué comme complété
      if (!user.progress[courseId].completedLessons.includes(quizId)) {
        user.progress[courseId].completedLessons.push(quizId);
      }
      
      // Mettre à jour la progression
      user.progress[courseId].progressPercentage = 100; // 100% si le quiz est réussi
      user.progress[courseId].lastAccessed = new Date();
      
      // Marquer le cours comme complété si ce n'était pas déjà le cas
      if (!user.completedCourses.includes(courseId)) {
        user.completedCourses.push(courseId);
      }
      
      this.authService.updateUser(user);
      return of(true);
    }
    
    return of(false);
  }
  
  isLessonCompleted(courseId: string, lessonId: string): boolean {
    const user = this.authService.currentUserValue;
    if (!user || !user.progress[courseId]) return false;
    
    return user.progress[courseId].completedLessons.includes(lessonId);
  }
  
  isCourseCompleted(courseId: string): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;
    
    return user.completedCourses.includes(courseId);
  }
}
