//
import { ICountriesProps } from './contact';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export type ICourseTeacherProp = {
  id: string;
  name: string;
  role: string;
  ratings: number;
  picture: string;
  courses: number;
  reviews: number;
  students: number;
};

export type ICourseLessonProp = {
  id: string;
  title: string;
  duration: number;
  videoPath: string;
  isUnLock: boolean;
  description: string;
};

export type ICourseByCategoryProps = {
  id: string;
  name: string;
  students: number;
};

export type ICourseFiltersProps = {
  filterFee: string[];
  filterLevel: string[];
  filterDuration: string[];
  filterCategories: string[];
  filterRating: string | null;
  filterLanguage: ICountriesProps[];
};
