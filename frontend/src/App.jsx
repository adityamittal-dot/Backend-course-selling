import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Card, CardContent, CardMedia } from '@mui/material';

function App() {
  const [courses, setCourses] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  useEffect(() => {
    fetch('http://localhost:3000/course/preview')
      .then(res => res.json())
      .then(data => {
        if (data.courses) setCourses(data.courses);
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
        if (data.firstName) {
          setUserName(data.firstName);
          localStorage.setItem('userName', data.firstName);
        }
        setOpenLogin(false);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Error during login");
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navbar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: { xs: 2, md: 6 }, py: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}>
          NexDev.
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4, typography: 'body2', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
          <span style={{ cursor: 'pointer' }}>About</span>
          <span style={{ cursor: 'pointer' }}>Courses</span>
          <span style={{ cursor: 'pointer' }}>Process</span>
          <span style={{ cursor: 'pointer' }}>FAQ</span>
        </Box>
        <Box>
          {!token ? (
            <>
              <Button color="inherit" sx={{ mr: 2, fontWeight: 600 }} onClick={() => setOpenLogin(true)}>Login</Button>
              <Button variant="contained" sx={{ borderRadius: 8, px: 3, bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#e0e0e0' } }} onClick={() => setOpenSignup(true)}>
                Apply now
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2, fontWeight: 600, color: 'white' }}>
                Hello, {userName}
              </Typography>
              <Button variant="outlined" sx={{ borderRadius: 8, px: 3, borderColor: 'rgba(255,255,255,0.3)', color: 'white' }} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mt: { xs: 8, md: 15 }, mb: { xs: 10, md: 15 } }}>
        <Typography variant="overline" sx={{ letterSpacing: '0.15em', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
          PREMIUM BACKEND COURSES
        </Typography>
        <Typography variant="h1" sx={{ mt: 2, mb: 4, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, fontSize: { xs: '4rem', md: '7rem' } }}>
          NexDev<br />Academy
        </Typography>
        <Button variant="outlined" sx={{ borderRadius: 8, px: 4, py: 1.5, borderColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }} onClick={() => setOpenSignup(true)}>
          Apply now
        </Button>
      </Container>

      {/* Stats Ribbon */}
      <Box className="stat-ribbon" sx={{ py: 4, width: '100%' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'block', mb: 3 }}>LOCATION</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Global / Remote</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'block', mb: 3 }}>DURATION</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Self-paced</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'block', mb: 3 }}>MENTORS</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>10+ Industry Experts</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', display: 'block', mb: 3 }}>COURSES</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{courses.length || 4}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 2, fontWeight: 600, letterSpacing: '-0.02em' }}>
          What's in it for you?
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', mb: 8, maxWidth: 600, mx: 'auto' }}>
          Gain all the skills you need to kick-start your professional path through mentoring by industry professionals.
        </Typography>

        <Grid container spacing={4}>
          {[
            { title: "Hands-on learning", desc: "Each course will take you through the entire process of completing and testing a project." },
            { title: "Expert Mentorship", desc: "Take advantage of your mentor's expertise and gain industry-relevant feedback." },
            { title: "Scalable Architecture", desc: "The Academy is designed to give you a solid foundation to build scalable systems." },
            { title: "Verified Certificates", desc: "Upon completion you will receive a certificate verifying your new skills." }
          ].map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box className="glass-card" sx={{ p: 4, height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, lineHeight: 1.2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
                  {feature.desc}
                </Typography>
                <Typography sx={{ position: 'absolute', bottom: 16, right: 24, fontSize: '2rem', fontWeight: 300, color: 'rgba(255,255,255,0.1)' }}>
                  0{idx + 1}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Courses Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 15 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 8, fontWeight: 600, letterSpacing: '-0.02em' }}>
          Courses
        </Typography>
        <Grid container spacing={4}>
          {courses.length > 0 ? courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Box className="glass-card" sx={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box
                  sx={{
                    height: 180,
                    backgroundImage: `url(${course.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>{course.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, flexGrow: 1 }}>{course.description}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>${course.price}</Typography>
                    <Button variant="outlined" size="small" sx={{ borderRadius: 8, borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}>Buy Now</Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          )) : (
            <Typography variant="body1" color="text.secondary" sx={{ width: '100%', textAlign: 'center' }}>
              Loading courses or no courses available at the moment.
            </Typography>
          )}
        </Grid>
      </Container>

      {/* Auth Dialogs */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)} PaperProps={{ className: 'glass-card', sx: { bgcolor: '#111', color: 'white', border: '1px solid rgba(255,255,255,0.1)' } }}>
        <DialogTitle sx={{ fontWeight: 600 }}>Login</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenLogin(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>Cancel</Button>
          <Button onClick={handleLogin} variant="contained" sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#e0e0e0' } }}>Login</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSignup} onClose={() => setOpenSignup(false)} PaperProps={{ className: 'glass-card', sx: { bgcolor: '#111', color: 'white', border: '1px solid rgba(255,255,255,0.1)' } }}>
        <DialogTitle sx={{ fontWeight: 600 }}>Sign Up</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="First Name" type="text" fullWidth variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
          <TextField margin="dense" label="Last Name" type="text" fullWidth variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
          <TextField margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.5)' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' } } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenSignup(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>Cancel</Button>
          <Button onClick={handleSignup} variant="contained" sx={{ bgcolor: 'white', color: 'black', '&:hover': { bgcolor: '#e0e0e0' } }}>Sign Up</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
