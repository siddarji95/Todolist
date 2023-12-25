import * as React from 'react';
import Typography from '@mui/material/Typography';
import {
    useScrollTrigger, Slide, AppBar, Toolbar, Box,
    Tooltip, IconButton, Avatar, Menu, MenuItem, Container
} from '@mui/material';
import { useHistory } from 'react-router-dom';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Header(props) {
    const history = useHistory();
    const { user, handleLogOut } = props
    console.log(history)
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <React.Fragment>
            <HideOnScroll>
                <AppBar>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography variant="h6" component="div"
                                onClick={() => {
                                    window.location.href = "/"
                                }}
                                sx={{
                                    flexGrow: 1
                                }}
                            >
                                Todo List
                            </Typography>
                            {user &&
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" onClick={handleLogOut}>Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}