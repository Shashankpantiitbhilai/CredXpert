// import  { useState, useEffect } from 'react';
// import { 
//   AppBar, Toolbar, Typography, Container, Grid, Paper, Table, 
//   TableBody, TableCell, TableContainer, TableHead, TableRow, 
//   Button, Box, Card, CardContent
// } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Mock data for charts
// const loanStatusData = [
//   { name: 'Jan', approved: 400, rejected: 240, pending: 240 },
//   { name: 'Feb', approved: 300, rejected: 139, pending: 221 },
//   { name: 'Mar', approved: 200, rejected: 980, pending: 229 },
//   { name: 'Apr', approved: 278, rejected: 390, pending: 200 },
//   { name: 'May', approved: 189, rejected: 480, pending: 218 },
//   { name: 'Jun', approved: 239, rejected: 380, pending: 250 },
// ];

// const DashboardCard = ({ }) => (
//   <Card sx={{ height: '100%', backgroundColor: color }}>
//     <CardContent>
//       <Typography variant="h6" component="div">
//         {title}
//       </Typography>
//       <Typography variant="h4" component="div">
//         {value}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch users from API
//     // setUsers(fetchedUsers);
//   }, []);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6">Admin Dashboard</Typography>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Grid container spacing={3}>
//           <Grid item xs={12} md={3}>
//             <DashboardCard title="Total Users" value="200" color="#e3f2fd" />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <DashboardCard title="Active Loans" value="150" color="#e8f5e9" />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <DashboardCard title="Total Revenue" value="$1,000,000" color="#fff3e0" />
//           </Grid>
//           <Grid item xs={12} md={3}>
//             <DashboardCard title="Avg. Loan Amount" value="$10,000" color="#fce4ec" />
//           </Grid>
//           <Grid item xs={12}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 User Management
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Action</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {users.map((user) => (
//                       <TableRow key={user.id}>
//                         <TableCell>{user.name}</TableCell>
//                         <TableCell>{user.email}</TableCell>
//                         <TableCell>{user.role}</TableCell>
//                         <TableCell>
//                           <Button variant="contained" size="small">
//                             Edit
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Grid>
//           <Grid item xs={12}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Loan Status Overview
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={loanStatusData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="approved" fill="#4caf50" />
//                   <Bar dataKey="rejected" fill="#f44336" />
//                   <Bar dataKey="pending" fill="#ff9800" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default AdminDashboard;