export interface ICompany {
  id: string;
  name: string;
  size: string;
  createdAt: string;
}

export interface ICreateCompany {
  name: string;
  size: string;
}

export interface IJob {
  id: string;
  titles: string;
  level: string;
  companyId: string;
  companyName: string;
  createdAt: string;
}

export interface ICreateJob {
    titles: string;
    level: string;
    companyId: string;
}
  