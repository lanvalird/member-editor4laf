export type MemberType = {
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
