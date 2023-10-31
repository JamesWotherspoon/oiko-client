import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@mui/material';
import { Dashboard, AccountBalanceWallet, Category, ListAlt, Settings, ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function SideNav() {
    const classes = useStyles();
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
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                {navItems.map((item) => (
                    <React.Fragment key={item.name}>
                        {item.subItems ? (
                            <React.Fragment>
                                <ListItem button onClick={handleClick}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => (
                                            <ListItem button key={subItem.name} className={classes.nested} component={Link} to={subItem.route}>
                                                <ListItemIcon>{item.icon}</ListItemIcon>
                                                <ListItemText primary={subItem.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ) : (
                            <ListItem button key={item.name} component={Link} to={item.route}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

export default SideNav;
