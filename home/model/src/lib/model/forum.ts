export type forum = {
  id: string;
  name: string;
  description: string;
  schoolName: string;
  facultyName: string;
  departmentName: string;

  // status: string;
  // user: User;
  // forumUsers: forumUser[];
  // forumTags: forumTag[];
  // forumCategories: forumCategory[];
  // forumPosts: forumPost[];
  // forumEvents: forumEvent[];
  // forumProducts: forumProduct[];
  // forumServices: forumService[];
  // forumProjects: forumProject[];
  // forumTeams: forumTeam[];
  // forumTeams: forumTeam[];
};

export type forumBackend = {
  _id: string;
};

export type ForumBackend = forum & forumBackend;
