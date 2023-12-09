interface GithubInterface {
  name: string;
  fullName: string;
  ownerLogin: string;
  description: string | null;
  htmlURL: string;
  createdAt: Date;
  updatedAt: Date;
  homepage?: string;
  readmeContent?: string;
  screenshot?: string;
}

export type { GithubInterface };
