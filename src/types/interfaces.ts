export interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

export interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
}
