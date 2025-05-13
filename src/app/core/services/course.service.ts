import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Lesson, Question, Quiz, Resource } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Introduction à la Cybersécurité',
      description: 'Découvrez les bases de la cybersécurité et apprenez à protéger vos systèmes.',
      level: 'beginner',
      duration: 10,
      imageUrl: 'assets/images/cyber-security.jpg',
      instructor: 'Jean Dupont',
      rating: 4.7,
      studentsEnrolled: 1250,
      prerequisites: [],
      learningObjectives: [
        'Comprendre les concepts de base de la cybersécurité',
        'Identifier les menaces courantes',
        'Mettre en place des mesures de protection de base'
      ],
      lessons: this.generateLessons('1'),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Tests d\'Intrusion Avancés',
      description: 'Maîtrisez les techniques avancées de test d\'intrusion et de sécurisation des systèmes.',
      level: 'advanced',
      duration: 20,
      imageUrl: 'assets/images/pentesting.jpg',
      instructor: 'Marie Martin',
      rating: 4.9,
      studentsEnrolled: 843,
      prerequisites: ['Connaissances de base en cybersécurité', 'Bases des réseaux'],
      learningObjectives: [
        'Réaliser des tests d\'intrusion complets',
        'Utiliser des outils avancés de pentesting',
        'Rédiger des rapports professionnels'
      ],
      lessons: this.generateLessons('2'),
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-02-10')
    },
    // Ajoutez plus de cours selon vos besoins
  ];

  constructor() {}

  getAllCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  getPopularCourses(limit: number = 3): Observable<Course[]> {
    return of([...this.courses]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit));
  }

  getCoursesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Observable<Course[]> {
    return of(this.courses.filter(course => course.level === level));
  }

  searchCourses(query: string): Observable<Course[]> {
    const lowerQuery = query.toLowerCase();
    return of(this.courses.filter(course => 
      course.title.toLowerCase().includes(lowerQuery) || 
      course.description.toLowerCase().includes(lowerQuery)));
  }

  private generateLessons(courseId: string): Lesson[] {
    // Génère des leçons factices en fonction de l'ID du cours
    if (courseId === '1') {
      return [
        {
          id: '1-1',
          title: 'Introduction à la sécurité informatique',
          duration: 30,
          type: 'video',
          content: 'https://example.com/videos/cyber-intro',
          isPreview: true,
          resources: [
            { type: 'pdf', title: 'Support de cours', url: 'assets/docs/cyber-intro.pdf' },
            { type: 'link', title: 'Article complémentaire', url: 'https://example.com/articles/cyber-basics' }
          ]
        },
        {
          id: '1-2',
          title: 'Les menaces courantes',
          duration: 45,
          type: 'video',
          content: 'https://example.com/videos/cyber-threats',
          isPreview: false,
          resources: []
        },
        {
          id: '1-3',
          title: 'Quiz de fin de module',
          duration: 20,
          type: 'quiz',
          isPreview: false,
          resources: [],
          quiz: this.generateQuiz('1-3')
        }
      ];
    } else {
      // Génère des leçons pour d'autres cours
      return [
        {
          id: `${courseId}-1`,
          title: 'Introduction',
          duration: 30,
          type: 'video',
          content: `https://example.com/videos/course-${courseId}-intro`,
          isPreview: true,
          resources: []
        },
        // Ajoutez plus de leçons selon vos besoins
      ];
    }
  }

  private generateQuiz(lessonId: string): Quiz {
    return {
      questions: [
        {
          id: `${lessonId}-q1`,
          type: 'single',
          question: 'Quelle est la définition de la cybersécurité ?',
          options: [
            'La protection des ordinateurs contre la poussière',
            'La protection des systèmes connectés contre les cybermenaces',
            'Un type de logiciel malveillant',
            'Une méthode de programmation sécurisée'
          ],
          correctAnswers: ['La protection des systèmes connectés contre les cybermenaces'],
          explanation: 'La cybersécurité vise à protéger les systèmes connectés contre les menaces en ligne.',
          points: 1
        },
        // Ajoutez plus de questions selon vos besoins
      ],
      passingScore: 70,
      timeLimit: 15
    };
  }
}
