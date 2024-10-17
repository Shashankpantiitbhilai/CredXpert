import { useState, useEffect, MouseEvent } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  IconButton,
  Stack,
  Avatar,
  Tooltip,
  LinearProgress,
  Paper,
  Fade
} from '@mui/material';
import {
  BarChart,
  People,
  AccountBalance,
  MoreVert,
  FileDownload,
  Check,
  Close,
  WatchLater,
  Update,
  TrendingUp
} from '@mui/icons-material';
import { getAllApplications, reviewLoan } from '../services/utils';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Loan, LoanStatus } from "../types";

// Custom theme colors
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

const statusConfig: { [key in LoanStatus]: { icon: JSX.Element; color: string; label: string } } = {
  pending: { icon: <WatchLater />, color: theme.warning, label: 'Pending' },
  approved: { icon: <Check />, color: theme.success, label: 'Approved' },
  rejected: { icon: <Close />, color: theme.error, label: 'Rejected' },
  under_review: { icon: <Update />, color: theme.info, label: 'Under Review' }
};

const StatCard = ({ 
  icon, 
  title, 
  value, 
  trend, 
  color 
}: { 
  icon: JSX.Element; 
  title: string; 
  value: string | number;
  trend: string;
  color: string;
}) => (
  <Fade in={true} timeout={500}>
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${color} 0%, ${theme.primaryDark} 100%)`,
        color: 'white',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              mr: 2,
              p: 1
            }}
          >
            {icon}
          </Avatar>
          <Typography variant="h6">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" fontWeight="bold" mb={1}>
          {value}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TrendingUp fontSize="small" />
          <Typography variant="body2">
            {trend}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  </Fade>
);

const LoanCard = ({ 
  loan, 
  onReviewClick 
}: { 
  loan: Loan; 
  onReviewClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) => (
  <Fade in={true} timeout={500}>
    <Paper 
      elevation={2}
      sx={{
        mb: 2,
        p: 2,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateX(8px)',
          boxShadow: 6,
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar 
            sx={{ 
              bgcolor: theme.primary,
              width: 50,
              height: 50,
              fontSize: '1.5rem'
            }}
          >
            {loan.fullName[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" color={theme.primaryDark}>
              {loan.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {loan.employmentStatus}
            </Typography>
          </Box>
        </Stack>
        <IconButton 
          onClick={onReviewClick}
          sx={{ 
            '&:hover': { 
              bgcolor: theme.secondary,
              transform: 'rotate(180deg)',
              transition: 'transform 0.3s ease-in-out'
            }
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>

      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.05)',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Amount
            </Typography>
            <Typography variant="h6" color={theme.primary}>
              ${loan.loanAmount.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.05)',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Tenure
            </Typography>
            <Typography variant="h6" color={theme.primary}>
              {loan.loanTenure} months
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box 
            sx={{ 
              p: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.05)',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box 
              sx={{ 
                bgcolor: statusConfig[loan.status].color,
                p: 1,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {statusConfig[loan.status].icon}
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ color: statusConfig[loan.status].color }}
              >
                {statusConfig[loan.status].label}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Fade>
);

const VerifierDashboard = () => {
  const [applications, setApplications] = useState<Loan[]>([]);
  const [selectedLoanId, setSelectedLoanId] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<LoanStatus | ''>('');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAllApplications();
        const loans = response?.loans.map((loan) => ({
          ...loan,
          status: ['pending', 'approved', 'rejected', 'under_review'].includes(loan.status)
            ? (loan.status as LoanStatus)
            : 'pending'
        }));
        setApplications(loans);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleReviewClick = (event: MouseEvent<HTMLButtonElement>, loanId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedLoanId(loanId);
  };

  const handleStatusSelect = (status: LoanStatus) => {
    setSelectedStatus(status);
    setAnchorEl(null);
    setOpenDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    if (selectedStatus) {
      try {
        await reviewLoan(selectedLoanId, selectedStatus);
        setOpenDialog(false);
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app._id === selectedLoanId ? { ...app, status: selectedStatus } : app
          )
        );
      } catch (error) {
        console.error('Error reviewing loan:', error);
      }
    }
  };

  const totalLoans = applications.length;
  const approvedLoans = applications.filter(app => app.status === 'approved');
  const borrowers = approvedLoans.length;
  const cashDisbursed = approvedLoans.reduce((acc, app) => acc + app.loanAmount, 0);

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Loan Applications Report', 14, 22);

    const tableData = applications.map(app => [
      app.fullName,
      app.loanAmount,
      app.status,
      app.loanTenure,
      app.employmentStatus
    ]);

    doc.text(`Total Loans: ${totalLoans}`, 14, 40);
    doc.text(`Total Borrowers: ${borrowers}`, 14, 50);
    doc.text(`Total Disbursed: $${cashDisbursed.toLocaleString()}`, 14, 60);

    autoTable(doc, {
      head: [['Name', 'Amount', 'Status', 'Tenure', 'Employment']],
      body: tableData,
      startY: 70,
    });

    doc.save('loan-applications-report.pdf');
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress sx={{ bgcolor: theme.secondary }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.background, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
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
            Loan Verifier Dashboard
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

        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <StatCard 
              icon={<BarChart />}
              title="Total Applications"
              value={totalLoans}
              trend="+12.5% this month"
              color={theme.primary}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard 
              icon={<People />}
              title="Active Borrowers"
              value={borrowers}
              trend="+5.8% this month"
              color={theme.primaryLight}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard 
              icon={<AccountBalance />}
              title="Total Disbursed"
              value={`$${cashDisbursed.toLocaleString()}`}
              trend="+15.3% this month"
              color={theme.secondary}
            />
          </Grid>
        </Grid>

        <Typography 
          variant="h4" 
          fontWeight="bold" 
          mb={3}
          sx={{ color: theme.primaryDark }}
        >
          Loan Applications
        </Typography>

        <Box>
          {applications.map((app) => (
            <LoanCard
              key={app._id}
              loan={app}
              onReviewClick={(event) => handleReviewClick(event, app._id)}
            />
          ))}
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1,
              '& .MuiMenuItem-root': {
                py: 1.5
              }
            }
          }}
        >
          {Object.entries(statusConfig).map(([status, config]) => (
            <MenuItem 
              key={status}
              onClick={() => handleStatusSelect(status as LoanStatus)}
              sx={{
                '&:hover': {
                  bgcolor: 'rgba(25, 118, 210, 0.08)'
                }
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: config.color,
                  mr: 1,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {config.icon}
              </Box>
              {config.label}
            </MenuItem>
          ))}
        </Menu>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            elevation: 24,
            sx: { borderRadius: 2 }
          }}
        >
          <DialogTitle sx={{ bgcolor: theme.primary, color: 'white' }}>
            Confirm Status Change
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <DialogContentText>
              Are you sure you want to change the status of this loan to "
              {selectedStatus && statusConfig[selectedStatus].label}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              sx={{ color: theme.primary }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmStatusChange}
              variant="contained"
              sx={{ 
                bgcolor: theme.primary,
                '&:hover': {
                  bgcolor: theme.primaryDark
                }
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default VerifierDashboard;