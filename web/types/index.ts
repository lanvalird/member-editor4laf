export type Member = {
  // Identification
  name: string;
  tag: string;
  roles: string[];

  // About info
  description: string;
  socials?: string[];

  // Other
  avatar?: string;
  meta?: string[];
};

export type MemberList = Member[];
