import React from 'react';
import { Box, Typography } from '@mui/material';

function Profile() {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#344767', fontWeight: 700, mb: 2 }}>
        Profile
      </Typography>
      <Typography variant="body1" sx={{ color: '#67748e' }}>
        User profile coming soon...
      </Typography>
    </Box>
  );
}

export default Profile;
