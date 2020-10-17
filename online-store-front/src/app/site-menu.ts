export interface ILink {
  name: string;
  link: string;
}

export const menuList: ILink[] = [
  { name: 'Home', link: '/' },
  { name: 'Create Article', link: '/create-article' },
  { name: 'About', link: '/about' },
];
