import { getAreaPath } from './areasWeServe';

export type HeaderCity = {
  name: string;
  href: string;
};

/** Top-level cities shown in the header CITY dropdown */
export const HEADER_CITIES: HeaderCity[] = [
  { name: 'Mumbai', href: getAreaPath('mumbai') },
  { name: 'Navi Mumbai', href: getAreaPath('navi-mumbai') },
  { name: 'Thane', href: getAreaPath('thane') },
  { name: 'Pune', href: getAreaPath('pune') },
  { name: 'Lonavala', href: '/pest-control-in-lonavala/' },
];
