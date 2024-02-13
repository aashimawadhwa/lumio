import { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography, Box } from '@mui/material';
// type
import { NavItemProps } from '../type';
//
import Iconify from '../../Iconify';
import { ListItemStyle } from './style';
import { isExternalLink } from '..';

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef<HTMLButtonElement & HTMLAnchorElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, subtitle, path, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent subtitle={subtitle} title={title} children={children} />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
        <NavItemContent subtitle={subtitle} title={title} children={children} />
      </ListItemStyle>
    ) : (
      <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
        <NavItemContent subtitle={subtitle} title={title} children={children} />
      </ListItemStyle>
    );
  }
);

// ----------------------------------------------------------------------

export const NavItemSub = forwardRef<HTMLButtonElement & HTMLAnchorElement, NavItemProps>(
  ({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
    const { title, subtitle, path, children } = item;

    if (children) {
      return (
        <ListItemStyle
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <NavItemContent subtitle={subtitle} title={title} children={children} subItem />
        </ListItemStyle>
      );
    }

    return isExternalLink(path) ? (
      <ListItemStyle
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component={Link}
      >
        <NavItemContent subtitle={subtitle} title={title} children={children} subItem />
      </ListItemStyle>
    ) : (
      <ListItemStyle disableRipple component={RouterLink} to={path} activeSub={active} subItem>
        <NavItemContent subtitle={subtitle} title={title} children={children} subItem />
      </ListItemStyle>
    );
  }
);

// ----------------------------------------------------------------------

type NavItemContentProps = {
  subtitle: string;
  title: string;
  children?: { title: string; path: string }[];
  subItem?: boolean;
};

function NavItemContent({ title, subtitle, children, subItem }: NavItemContentProps) {
  return (
    <>
      <Box>
        <Typography color="grey.0" variant="subtitle1" align="left">
          {title}
        </Typography>
        <Typography color="grey.500" variant="subtitle2" align="left">
          {subtitle}
        </Typography>
      </Box>
      {children && (
        <Iconify
          icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
          sx={{
            ml: { xs: 1, sm: 3 },
            width: 30,
            height: 30,
          }}
        />
      )}
    </>
  );
}
