export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  imageUrl: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  lessons: Lesson[];
  prerequisites: string[];
  learningObjectives: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // in minutes
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string; // URL or text content
  isPreview: boolean;
  resources: Resource[];
  quiz?: Quiz;
}

export interface Resource {
  type: 'pdf' | 'link' | 'code';
  title: string;
  url: string;
}

export interface Quiz {
  questions: Question[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export interface Question {
  id: string;
  type: 'single' | 'multiple' | 'true_false' | 'text';
  question: string;
  options?: string[];
  correctAnswers: string[] | string;
  explanation?: string;
  points: number;
}
