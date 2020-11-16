export interface ILink {
  name: string;
  link: string;
}

export const menuList: ILink[] = [
  { name: 'Home', link: '/' },
  { name: 'Goods', link: '/goods' },
  { name: 'News', link: '/news' },
  { name: 'Reviews', link: '/review' },
  { name: 'About', link: '/about' },
];
