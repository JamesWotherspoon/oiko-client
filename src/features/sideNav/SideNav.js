import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  StyledDrawer,
  StyledListItem,
  StyledListItemButton,
  StyledAvatar,
  StyledBox,
  StyledIconButton,
} from './SideNavStyles';
import { Subject, PieChart, Grain, SyncAlt, Settings, Logout, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { List, ListItemText } from '@mui/material';

function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  };

  const navItems = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: <Subject className="nav-icon" />,
    },
    {
      name: 'Money Pots',
      route: '/moneypots',
      icon: <PieChart className="nav-icon" />,
    },
    {
      name: 'Categories',
      route: '/categories',
      icon: <Grain className="nav-icon" />,
    },
    {
      name: 'Transactions',
      route: '/transactions',
      icon: <SyncAlt className="nav-icon" />,
    },
    {
      name: 'Settings',
      route: '/settings',
      icon: <Settings className="nav-icon" />,
    },
    {
      name: 'Logout',
      route: '/logout',
      icon: <Logout className="nav-icon" />,
    },
  ];

  return (
    <StyledDrawer
      variant="permanent"
      open={open}
      theme={theme}
    >
      <StyledBox>
        <StyledAvatar theme={theme}>JW</StyledAvatar>
        {open ? (
          <h5 className="user-name">
            James <br /> Wotherspoon
          </h5>
        ) : null}
        <StyledIconButton onClick={handleClick}>{open ? <ChevronLeft /> : <ChevronRight />}</StyledIconButton>
      </StyledBox>
      <List>
        {navItems.map((item) => (
          <StyledListItem key={item.name} component={Link} to={item.route}>
            <StyledListItemButton selected={location.pathname === item.route} theme={theme}>
              {item.icon}
              {open ? <ListItemText primary={item.name} /> : null}
            </StyledListItemButton>
          </StyledListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}

export default SideNav;
