import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  Dashboard,
  AccountBalanceWallet,
  Category,
  ListAlt,
  Settings,
} from '@mui/icons-material';


function SideNav() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const navItems = [
    { name: 'Dashboard', route: '/dashboard', icon: <Dashboard /> },
    {
      name: 'Money Pots',
      route: '/moneypots',
      icon: <AccountBalanceWallet />,
      subItems: [
        { name: 'Sub Item 1', route: '/subitem1' },
        { name: 'Sub Item 2', route: '/subitem2' },
      ],
    },
    { name: 'Categories', route: '/categories', icon: <Category /> },
    { name: 'Transactions', route: '/transactions', icon: <ListAlt /> },
    { name: 'Settings', route: '/settings', icon: <Settings /> },
  ];

  return (
    <Drawer
      variant="permanent"
    >
      <div  />
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <ListItem key={item.name} component={Link} to={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default SideNav;
