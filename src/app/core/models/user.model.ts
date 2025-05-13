export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  completedCourses: string[];
  progress: {
    [courseId: string]: {
      completedLessons: string[];
      lastAccessed: Date;
      progressPercentage: number;
    };
  };
}
