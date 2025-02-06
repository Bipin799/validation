import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import './Dashboard.css';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Show logout success message
    alert("You have been logged out successfully!");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div>
        <h2>Welcome to the Dashboard!</h2>
        
        {/* Logout Button */}
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>

        {/* Material UI Styles */}
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => ({
            body: { backgroundColor: theme.palette.background.paper },
          })}
        />

        <div>
          {/* AppBar */}
          <AppBar position="absolute" color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                sx={{ mr: 2 }}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" color="inherit" component="div">
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Floating Action Button */}
          <Fab
            color="secondary"
            sx={(theme) => ({
              position: 'absolute',
              bottom: theme.spacing(2),
              right: theme.spacing(2),
            })}
          >
            <AddIcon />
          </Fab>

          {/* Snackbar */}
          <Snackbar
            open
            autoHideDuration={6000}
            message="Archived"
            action={
              <Button color="inherit" size="small">
                Undo
              </Button>
            }
            sx={{
              position: 'absolute',
              bottom: 16,  // Make sure it's at the bottom with proper spacing
              left: '50%',
              transform: 'translateX(-50%)',  // Center horizontally
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
