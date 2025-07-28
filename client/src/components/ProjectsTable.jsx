import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert, Check } from '@mui/icons-material';

const projectsData = [
  {
    id: 1,
    name: 'Material XD Version',
    logo: '/logo-xd.svg',
    members: ['/team-1.jpg', '/team-2.jpg', '/team-3.jpg', '/team-4.jpg'],
    budget: '$14,000',
    completion: 60,
  },
  {
    id: 2,
    name: 'Add Progress Track',
    logo: '/logo-atlassian.svg',
    members: ['/team-2.jpg', '/team-4.jpg'],
    budget: '$3,000',
    completion: 10,
  },
  {
    id: 3,
    name: 'Fix Platform Errors',
    logo: '/logo-slack.svg',
    members: ['/team-3.jpg', '/team-1.jpg'],
    budget: 'Not set',
    completion: 100,
  },
  {
    id: 4,
    name: 'Launch our Mobile App',
    logo: '/logo-spotify.svg',
    members: ['/team-4.jpg', '/team-3.jpg', '/team-4.jpg', '/team-1.jpg'],
    budget: '$20,500',
    completion: 100,
  },
  {
    id: 5,
    name: 'Add the New Pricing Page',
    logo: '/logo-jira.svg',
    members: ['/team-4.jpg'],
    budget: '$500',
    completion: 25,
  },
  {
    id: 6,
    name: 'Redesign New Online Shop',
    logo: '/logo-invision.svg',
    members: ['/team-1.jpg', '/team-4.jpg'],
    budget: '$2,000',
    completion: 40,
  },
];

function ProjectsTable() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 2px 14px 0 rgba(0,0,0,0.1)',
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography
                variant="h6"
                sx={{ color: '#344767', fontSize: '1rem', fontWeight: 600 }}
              >
                Projects
              </Typography>
              <Box display="flex" alignItems="center" mt={0.5}>
                <Check sx={{ color: '#17c1e8', fontSize: '16px', mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#67748e' }}>
                  <Box component="span" sx={{ fontWeight: 700 }}>30 done</Box> this month
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Action</MenuItem>
              <MenuItem onClick={handleMenuClose}>Another action</MenuItem>
              <MenuItem onClick={handleMenuClose}>Something else here</MenuItem>
            </Menu>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: '#67748e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: 'none',
                    pb: 1,
                  }}
                >
                  Companies
                </TableCell>
                <TableCell
                  sx={{
                    color: '#67748e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: 'none',
                    pb: 1,
                  }}
                >
                  Members
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#67748e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: 'none',
                    pb: 1,
                  }}
                >
                  Budget
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    color: '#67748e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    border: 'none',
                    pb: 1,
                  }}
                >
                  Completion
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell sx={{ border: 'none', py: 1 }}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={project.logo}
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: '#344767', fontSize: '0.875rem', fontWeight: 600 }}
                      >
                        {project.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ border: 'none', py: 1 }}>
                    <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>
                      {project.members.map((member, index) => (
                        <Avatar
                          key={index}
                          src={member}
                          sx={{ width: 24, height: 24 }}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="center" sx={{ border: 'none', py: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: '#344767', fontSize: '0.75rem', fontWeight: 700 }}
                    >
                      {project.budget}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ border: 'none', py: 1 }}>
                    <Box sx={{ width: '75%', mx: 'auto' }}>
                      <Box display="flex" justifyContent="space-between" mb={0.5}>
                        <Typography
                          variant="body2"
                          sx={{ color: '#344767', fontSize: '0.75rem', fontWeight: 700 }}
                        >
                          {project.completion}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={project.completion}
                        sx={{
                          height: 3,
                          borderRadius: '3px',
                          backgroundColor: '#e9ecef',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: project.completion === 100 ? '#4caf50' : '#17c1e8',
                            borderRadius: '3px',
                          },
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default ProjectsTable;
