import React from 'react';
import { Box, Typography } from '@mui/material';

function Billing() {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: '#000', fontWeight: 700, mb: 2 }}>
       Applications
      </Typography>
      <Typography variant="body1" sx={{ color: '#000' }}>
        Application information coming soon...
      </Typography>
    </Box>
  );
}

export default Billing;
