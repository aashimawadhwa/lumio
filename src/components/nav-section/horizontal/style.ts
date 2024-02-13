import { ReactNode } from 'react';
// @mui
import {  styled } from '@mui/material/styles';
import { Button, Popover, ButtonProps, LinkProps } from '@mui/material';
// config

// ----------------------------------------------------------------------

type IProps = LinkProps & ButtonProps;

interface ListItemStyleProps extends IProps {
  component?: ReactNode;
  to?: string;
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
  open?: boolean;
}

export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'activeRoot' && prop !== 'activeSub' && prop !== 'subItem' && prop !== 'open',
})<ListItemStyleProps>(({ activeRoot, activeSub, subItem, open, theme }) => {
  const activeRootStyle = {
    color: theme.palette.grey[0],
    backgroundColor: theme.palette.grey[900],
  };

  return {
    ...theme.typography.subtitle1,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0),
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      '&:hover': { ...activeRootStyle },

    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,

    }),
    // subItem
    ...(subItem && {
      width: '100%',
      margin: 0,
      justifyContent: 'space-between',

    }),
    // open
    ...(open &&
      !activeRoot && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
  };
});

// ----------------------------------------------------------------------

export const PaperStyle = styled(Popover)(({ theme }) => ({
  pointerEvents: 'none',
  '& .MuiPopover-paper': {
    width: 160,
    pointerEvents: 'auto',
    padding: theme.spacing(1, 1,1,1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}));
