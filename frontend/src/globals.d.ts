type User = {
  _id: string;
  name: string;
  about: string;
  avatar: string;
  email: string;
};

type Card = {
  _id: string;
  name: string;
  link: string;
  owner: User;
  likes: User[];
};
