import { useState, useEffect } from 'react';
import {
 Typography, Container, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Box, Dialog, DialogTitle, DialogActions,
  DialogContent, DialogContentText, Select, MenuItem, FormControl, InputLabel, Chip,
  Tab, Tabs
} from '@mui/material';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAllApplications, reviewLoan, getAllUsers, deleteUser, updateUserRole } from '../services/utils';
import { Loan, LoanStatus, User } from "../types";
import { FileDownload } from "@mui/icons-material"
const statusColors: { [key in LoanStatus]: string } = {
  pending: '#FFA000',
  approved: '#4CAF50',
  rejected: '#F44336',
  under_review: '#2196F3'
};
const theme = {
  primary: '#1976d2',
  primaryLight: '#42a5f5',
  primaryDark: '#1565c0',
  secondary: '#90caf9',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  background: '#f5f9ff'
};
const AdminDashboard = () => {
  const [applications, setApplications] = useState<Loan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tabValue, setTabValue] = useState(0);

  // Loan management states
  const [selectedLoanId, setSelectedLoanId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<LoanStatus | ''>('');
  const [openLoanDialog, setOpenLoanDialog] = useState<boolean>(false);

  // User management states
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>('');

  useEffect(() => {
    const fetchApplicationsAndUsers = async () => {
      try {
        const loanResponse = await getAllApplications();
        const loans = loanResponse?.loans.map((loan) => ({
          ...loan,
          status: ['pending', 'approved', 'rejected', 'under_review'].includes(loan.status)
            ? (loan.status as LoanStatus)
            : 'pending'
        }));
        setApplications(loans);

        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchApplicationsAndUsers();
  }, []);

  const handleReviewClick = (loanId: string) => {
    setSelectedLoanId(loanId);
    setOpenLoanDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    if (selectedStatus) {
      try {
        await reviewLoan(selectedLoanId, selectedStatus);
        setOpenLoanDialog(false);
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === selectedLoanId ? { ...app, status: selectedStatus as LoanStatus } : app
          )
        );
      } catch (error) {
        console.error('Error reviewing loan:', error);
      }
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUserRole = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const totalLoans = applications.length;
  const approvedLoans = applications.filter(app => app.status === 'approved');
  const borrowers = approvedLoans.length;
  const cashDisbursed = approvedLoans.reduce((acc, app) => acc + app.loanAmount, 0);
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === 'admin').length;
  const totalVerifiers = users.filter(user => user.role === 'verifier').length;

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Admin Report', 14, 22);

    // Add summary statistics
    doc.setFontSize(14);
    doc.text('Summary Statistics', 14, 40);
    const summaryData = [
      ['Total Loans', totalLoans.toString()],
      ['Approved Borrowers', borrowers.toString()],
      ['Total Cash Disbursed', `$${cashDisbursed.toLocaleString()}`],
      ['Total Users', totalUsers.toString()],
      ['Total Admins', totalAdmins.toString()],
      ['Total Verifiers', totalVerifiers.toString()],
    ];
    autoTable(doc, {
      head: [['Metric', 'Value']],
      body: summaryData,
      startY: 50,
    });

    // Add loan applications table
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Loan Applications', 14, 20);
    const loanData = applications.map(app => [
      app.fullName,
      `$${app.loanAmount.toLocaleString()}`,
      app.status,
      `${app.loanTenure} months`,
      app.employmentStatus
    ]);
    autoTable(doc, {
      head: [['Name', 'Amount', 'Status', 'Loan Tenure', 'Employment Status']],
      body: loanData,
      startY: 30,
    });

    // Add users table
    doc.addPage();
    doc.setFontSize(14);
    doc.text('User Management', 14, 20);
    const userData = users.map(user => [user.email, user.role]);
    autoTable(doc, {
      head: [['Email', 'Role']],
      body: userData,
      startY: 30,
    });

    doc.save('admin-report.pdf');
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
     
  <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold"
            sx={{ 
              color: theme.primaryDark,
              borderBottom: `4px solid ${theme.primary}`,
              pb: 1
            }}
          >
           Admin Dashboard
          </Typography>
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={generateReport}
            sx={{
              bgcolor: theme.primary,
              '&:hover': {
                bgcolor: theme.primaryDark,
              },
              px: 3,
              py: 1.5
            }}
          >
            Export Report
          </Button>
        </Box>
     

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#1b5e20', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Loans
              </Typography>
              <Typography component="p" variant="h4">
                {totalLoans}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#4CAF50', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Approved Borrowers
              </Typography>
              <Typography component="p" variant="h4">
                {borrowers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#b71c1c', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Cash Disbursed
              </Typography>
              <Typography component="p" variant="h4">
                ${cashDisbursed.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#2196F3', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Users
              </Typography>
              <Typography component="p" variant="h4">
                {totalUsers}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#FFC107', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Admins
              </Typography>
              <Typography component="p" variant="h4">
                {totalAdmins}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140, backgroundColor: '#FF5722', color: 'white' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Total Verifiers
              </Typography>
              <Typography component="p" variant="h4">
                {totalVerifiers}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Tabs
                value={tabValue}
                onChange={(event, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Loan Applications" />
                <Tab label="User Management" />
              </Tabs>

              {tabValue === 0 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Loan Tenure</TableCell>
                        <TableCell>Employment Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {applications.map((application) => (
                        <TableRow key={application._id}>
                          <TableCell>{application.fullName}</TableCell>
                          <TableCell>{`$${application.loanAmount.toLocaleString()}`}</TableCell>
                          <TableCell>
                            <Chip
                              label={application.status}
                              sx={{
                                backgroundColor: statusColors[application.status],
                                color: 'white'
                              }}
                            />
                          </TableCell>
                          <TableCell>{`${application.loanTenure} months`}</TableCell>
                          <TableCell>{application.employmentStatus}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleReviewClick(application._id)}
                            >
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {tabValue === 1 && (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setUserToDelete(user._id);
                                setOpenDeleteDialog(true);
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => {
                                setUserToEdit(user._id);
                                setOpenEditDialog(true);
                              }}
                            >
                              Edit Role
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Loan Review Dialog */}
      <Dialog open={openLoanDialog} onClose={() => setOpenLoanDialog(false)}>
        <DialogTitle>Review Loan</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="loan-status-label">Status</InputLabel>
            <Select
              labelId="loan-status-label"
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value as LoanStatus)}
              fullWidth
            >
              <MenuItem value="approved">Approve</MenuItem>
              <MenuItem value="rejected">Reject</MenuItem>
              <MenuItem value="under_review">Under Review</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLoanDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmStatusChange}>Confirm</Button>
        </DialogActions>
      </Dialog>

      {/* Generate Report Dialog */}
      <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)}>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will generate a detailed report of all loan applications and users.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReportDialog(false)}>Cancel</Button>
          <Button onClick={generateReport}>Generate</Button>
        </DialogActions>
      </Dialog>

      {/* Delete User Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={() => userToDelete && handleDeleteUser(userToDelete)}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Role Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              value={newRole}
              onChange={(event) => setNewRole(event.target.value)}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="verifier">Verifier</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={() => userToEdit && handleEditUserRole(userToEdit, newRole)}>Update</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
