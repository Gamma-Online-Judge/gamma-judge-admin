import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom'
import { Container, Link } from '@mui/material';

const navigation = [
    {
        path: '/contests',
        title: 'Contest'
    },
    {
        path: '/problems',
        title: 'Lista de Problemas'
    },
]

export default function Header() {

  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => history.push('/')}>
            Gamma Judge Admin
          </Typography>
          {
            navigation.map(nav => (
                <Link href={nav.path} color="inherit" underline='none' component={Button}>{nav.title}</Link>
            ))
          }
        </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}