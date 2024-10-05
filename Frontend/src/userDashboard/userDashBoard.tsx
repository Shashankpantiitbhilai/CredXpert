import React, { useEffect, useState, useContext } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Chip,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getAllLoans } from '../services/utils'; // Adjust the import path accordingly
import { AdminContext } from '../App';

const Dashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { IsUserLoggedIn } = useContext(AdminContext);
  const userId = IsUserLoggedIn?._id;

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const data = await getAllLoans(userId);
        setLoans(data.loans);
      } catch (error) {
        setError('Failed to fetch loans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Loan Applications
      </Typography>

      {error && (
        <Typography variant="body1" color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      {loans.length === 0 ? (
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">You have not applied for any loans.</Typography>
        </Paper>
      ) : (
        <List>
          {loans.map((loan) => (
            <Accordion key={loan._id} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                  <Typography variant="subtitle1">
                    Loan Amount: ${loan.loanAmount}
                  </Typography>
                  <Chip 
                    label={loan.status} 
                    color={getStatusColor(loan.status)}
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List disablePadding>
                  <ListItem>
                    <ListItemText primary="Full Name" secondary={loan.fullName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Loan Tenure" secondary={`${loan.loanTenure} months`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Employment Status" secondary={loan.employmentStatus} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Reason for Loan" secondary={loan.reasonForLoan} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Employment Address" secondary={loan.employmentAddress} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Application Date" secondary={formatDate(loan.createdAt)} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Last Updated" secondary={formatDate(loan.updatedAt)} />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Dashboard;