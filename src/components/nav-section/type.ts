import { ReactElement } from 'react';
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type NavListProps = {
  title: string;
  subtitle:string;
  path: string;
  info?: ReactElement;
  children?: {
    title: string;
    subtitle:string;
    path: string;
    children?: { title: string;subtitle: string, path: string }[];
  }[];
};

export type NavItemProps = {
  item: NavListProps;
  isCollapse?: boolean;
  active?: boolean | undefined;
  open?: boolean;
  onOpen?: VoidFunction;
  onMouseEnter?: VoidFunction;
  onMouseLeave?: VoidFunction;
};

export interface NavSectionProps extends BoxProps {
  isCollapse?: boolean;
  navConfig: {
    subheader: string;
    items: NavListProps[];
  }[];
}
