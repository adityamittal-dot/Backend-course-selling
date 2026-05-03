import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, AppBar, Toolbar, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, CardMedia } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';

function App() {
  const [courses, setCourses] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    // Fetch courses from backend
    fetch('http://localhost:3000/course/preview')
      .then(res => res.json())
      .then(data => {
        if (data.courses) {
          setCourses(data.courses);
        }
      })
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, firstName, lastName })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup successful! Please login.");
        setOpenSignup(false);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during signup");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setOpenLogin(false);
        alert("Login successful!");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during login");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #222' }}>
        <Toolbar>
          <MenuBookIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            CoursePlatform
          </Typography>
          {!token ? (
            <>
              <Button color="inherit" sx={{ mr: 2 }} onClick={() => setOpenLogin(true)}>Login</Button>
              <Button variant="contained" color="primary" onClick={() => setOpenSignup(true)} sx={{ color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#e0e0e0' } }}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="outlined" color="primary" onClick={handleLogout} sx={{ borderColor: '#444', color: 'white' }}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 8 }}>
        <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                Master Backend Development
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400 }}>
                A modern platform to buy and access premium courses. Elevate your skills with minimal, distraction-free learning.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#e0e0e0' } }}
                  onClick={() => window.scrollTo({ top: document.getElementById('courses-section').offsetTop, behavior: 'smooth' })}
                >
                  Explore Courses
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ borderColor: '#444', color: 'white', '&:hover': { borderColor: '#888', bgcolor: 'transparent' } }}
                >
                  View Dashboard
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: '#111', height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
               <CodeIcon sx={{ fontSize: 80, color: '#444', mb: 2 }} />
               <Typography variant="h5" color="text.secondary">
                 Interactive Learning Space
               </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box id="courses-section" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Available Courses
          </Typography>
          <Grid container spacing={4}>
            {courses.length > 0 ? courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <Card sx={{ bgcolor: '#111', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.imageUrl || 'https://via.placeholder.com/300x140?text=Course+Image'}
                    alt={course.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${course.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button variant="contained" fullWidth sx={{ color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#e0e0e0' } }}>
                      Buy Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            )) : (
              <Typography variant="body1" color="text.secondary" sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                No courses available at the moment.
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>

      {/* Login Dialog */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)} PaperProps={{ sx: { bgcolor: '#111', color: 'white' } }}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenLogin(false)} sx={{ color: '#aaa' }}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained" sx={{ color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#e0e0e0' } }}>Login</Button>
        </DialogActions>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={openSignup} onClose={() => setOpenSignup(false)} PaperProps={{ sx: { bgcolor: '#111', color: 'white' } }}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="First Name" type="text" fullWidth variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
          <TextField margin="dense" label="Last Name" type="text" fullWidth variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
          <TextField margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: 'white' }, label: { color: '#aaa' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' } } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenSignup(false)} sx={{ color: '#aaa' }}>Cancel</Button>
          <Button onClick={handleSignup} variant="contained" sx={{ color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#e0e0e0' } }}>Sign Up</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default App;
