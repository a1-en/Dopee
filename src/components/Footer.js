// src/components/Footer.js
import React from 'react';
import { Box, Typography, IconButton, Link, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#e27604', // Dark background for footer
        color: '#fff',
        padding: '20px',
        marginTop: 'auto', // Push the footer to the bottom
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={4} sx={{ textAlign: 'left' }}>
          <Typography variant="h6">
Dopee          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton color="inherit" component={Link} href="/" target="_blank">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="/" target="_blank">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="/" target="_blank">
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="/" target="_blank">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>
          <Typography variant="body2">
            1234 Street Address, City, Country
          </Typography>
          <Typography variant="body2">
            info@yourcompany.com | (123) 456-7890
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
