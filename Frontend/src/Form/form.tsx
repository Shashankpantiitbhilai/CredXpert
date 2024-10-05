import React, { useState,useContext } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Paper,
  Snackbar,
  Alert,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { submitLoanApplication } from '../services/utils'; // Adjust the path accordingly
import { AdminContext } from '../App';
const LoanApplicationForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {
        userId:'',
      fullName: '',
      loanAmount: '',
      loanTenure: '',
      employmentStatus: '',
      reasonForLoan: '',
      employmentAddress: '',
      hasReadInformation: false,
      agreeToDisclosure: false,
    }
  });

  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
    const { IsUserLoggedIn } = useContext(AdminContext);
    const userId = IsUserLoggedIn._id;
    const onSubmit = async (data) => {
      
    setLoading(true);
        try {
            data.userId = userId;
      await submitLoanApplication(data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error submitting loan application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Apply for a Loan
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Full name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="loanAmount"
              control={control}
              rules={{ 
                required: "Loan amount is required",
                validate: (value) => Number(value) > 0 || "Loan amount must be a positive number"
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Loan Amount"
                  variant="outlined"
                  type="number"
                  error={!!errors.loanAmount}
                  helperText={errors.loanAmount?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="loanTenure"
              control={control}
              rules={{ 
                required: "Loan tenure is required",
                validate: (value) => Number.isInteger(Number(value)) && Number(value) > 0 || "Loan tenure must be a positive integer"
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Loan Tenure (in months)"
                  variant="outlined"
                  type="number"
                  error={!!errors.loanTenure}
                  helperText={errors.loanTenure?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="employmentStatus"
              control={control}
              rules={{ required: "Employment status is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Employment Status"
                  variant="outlined"
                  error={!!errors.employmentStatus}
                  helperText={errors.employmentStatus?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="reasonForLoan"
              control={control}
              rules={{ required: "Reason for loan is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Reason for Loan"
                  variant="outlined"
                  multiline
                  rows={4}
                  error={!!errors.reasonForLoan}
                  helperText={errors.reasonForLoan?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="employmentAddress"
              control={control}
              rules={{ required: "Employment address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Employment Address"
                  variant="outlined"
                  error={!!errors.employmentAddress}
                  helperText={errors.employmentAddress?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="hasReadInformation"
              control={control}
              rules={{ required: "You must read the information provided" }}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="I have read the information provided"
                />
              )}
            />
            {errors.hasReadInformation && (
              <Typography color="error">{errors.hasReadInformation.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="agreeToDisclosure"
              control={control}
              rules={{ required: "You must agree to the disclosure terms" }}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="I agree to the disclosure terms"
                />
              )}
            />
            {errors.agreeToDisclosure && (
              <Typography color="error">{errors.agreeToDisclosure.message}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Your Loan is under review!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default LoanApplicationForm;