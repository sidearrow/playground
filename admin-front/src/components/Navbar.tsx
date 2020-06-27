import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'AuthProvider';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

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
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => {
            setAnchorEl(null);
          }}
          keepMounted
        >
          <MenuItem>
            <Link to="/company">事業者一覧</Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
