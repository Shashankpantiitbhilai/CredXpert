import { useEffect, useState, useContext } from 'react';
import {Chip,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Snackbar,
  Alert,
  TextField,
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';
import { getAllLoans } from '../services/utils';
import { AdminContext } from '../App';

interface Loan {
  _id: string;
  loanAmount: number;
  fullName: string;
  loanTenure: number;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface GetAllLoansResponse {
  loans: Loan[];
}

// Create a bluish theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#64b5f6',
    },
    background: {
      default: '#e3f2fd',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const Dashboard: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { user } = useContext(AdminContext);
  let userId = user?._id || '';

  const fetchLoans = async () => {
    setLoading(true);
    try {
      const data: GetAllLoansResponse | null = await getAllLoans(userId);
      if (data) {
        setLoans(data.loans);
        setSnackbarOpen(true);
      } else {
        setError('No loans found or failed to fetch loans.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching loans.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLoans();
    }
  }, [userId]);

  const getStatusColor = (status: string) => {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filterLoans = () => {
    return loans.filter(loan =>
      loan.fullName.toLowerCase().includes(search.toLowerCase()) ||
      loan.status.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Summary section */}
        <Box mb={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center', backgroundColor: '#f0f4c3' }}>
            <Typography variant="h6" gutterBottom>
              Loan Summary
            </Typography>
            <Typography variant="body1">
              Total Loans: {loans.length}
            </Typography>
            <Typography variant="body1">
              Approved: {loans.filter(loan => loan.status === 'approved').length}
            </Typography>
            <Typography variant="body1">
              Pending: {loans.filter(loan => loan.status === 'pending').length}
            </Typography>
            <Typography variant="body1">
              Rejected: {loans.filter(loan => loan.status === 'rejected').length}
            </Typography>
          </Paper>
        </Box>

        {/* Search bar */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="h4"
            gutterBottom
            textAlign="center"
            fontWeight="bold"
            color="primary"
          >
            Your Loan Applications
          </Typography>
          <Tooltip title="Refresh" arrow>
            <IconButton color="primary" onClick={fetchLoans}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box mb={3} display="flex" alignItems="center">
          <SearchIcon />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by name or status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ ml: 2, width: '100%' }}
          />
        </Box>

        {error && (
          <Box sx={{ mb: 3 }}>
            <Paper sx={{ p: 2, backgroundColor: '#fdecea', color: '#d32f2f' }}>
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            </Paper>
          </Box>
        )}

        {loans.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', backgroundColor: 'secondary.light' }}>
            <Typography variant="h6">You have not applied for any loans yet.</Typography>
          </Paper>
        ) : (
          <TableContainer component={Paper} sx={{ backgroundColor: 'background.paper' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography fontWeight="bold">Full Name</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Loan Amount</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Loan Tenure</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Application Date</Typography></TableCell>
                  <TableCell><Typography fontWeight="bold">Last Updated</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterLoans().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((loan) => (
                  <TableRow key={loan._id}>
                    <TableCell>{loan.fullName}</TableCell>
                    <TableCell>${loan.loanAmount}</TableCell>
                    <TableCell>{loan.loanTenure} months</TableCell>
                    <TableCell>
                      <Chip label={loan.status} color={getStatusColor(loan.status)} size="small" />
                    </TableCell>
                    <TableCell>{formatDate(loan.createdAt)}</TableCell>
                    <TableCell>{formatDate(loan.updatedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={loans.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Loan list refreshed successfully!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
