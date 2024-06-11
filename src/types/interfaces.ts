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
  email?: string;
  name?: string;
  initials?: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface UserLookup {
  [key: number]: User;
}
