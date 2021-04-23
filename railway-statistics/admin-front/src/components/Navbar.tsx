import React, { useContext } from 'react';
import { AuthContext } from 'AuthProvider';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { CmpLink } from './CmpLink';

export const Navbar: React.FC = () => {
  const { status } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <AppBar position="static" style={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          鉄道統計情報 管理画面
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <List style={{ minWidth: '250px' }}>
          <ListItem>
            <ListItemText>
              <CmpLink to="/company">事業者一覧</CmpLink>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};
