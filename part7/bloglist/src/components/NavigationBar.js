import React from 'react'
import { 
    AppBar,
    Container,
    Box,
    IconButton,
    Typography,
    Button,
    Toolbar
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const NavigationBar = ({ user, handleLogout }) => {
    const pages = ['Blogs', 'Users', 'Login']

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap   
                        component='div'             
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        BLOGS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href='/'
                        >
                            blogs
                        </Button>
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href='/users'
                        >
                            users
                        </Button>
                        {user === null ? (
                        <Button
                            sx={{ my: 2, color: 'white', display: 'block' }}
                            href='/login'
                        >
                            log in
                        </Button>
                        ) : (
                        <Typography sx={{ alignSelf: 'center', marginLeft: 'auto', order: 2, color: 'white', display: 'block' }} >
                            <span>{user.name} logged in</span>
                            <Button 
                                onClick={handleLogout}
                                sx={{ my: 2, color: 'white'}}
                            >
                                logout
                            </Button>
                        </Typography>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavigationBar