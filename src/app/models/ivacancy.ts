export class IVacancy {
  id: number = 0;
  name: string = '';
  description: string = '';
  responsibilities: string = '';
  skills: string = '';
  category: string = '';
  validFrom: string = '';
  validTo: string = '';
  maxApplicants: number = 0;
}

export interface IVacancyPagination {
  vacancies: IVacancy[];
  totalCount: number;
}

export class IApplicant {
  id: number = 0;
  name: string = '';
  email: string = '';
  mobile: string = '';
}

export class IApplyVacancy {
  applicantId: number = 0;
  vacancyId: number = 0;
}

