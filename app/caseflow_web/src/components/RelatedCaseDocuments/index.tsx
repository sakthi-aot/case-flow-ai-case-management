import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  size: number,
  creationDate: Date,
  lastUpdated: Date,
  version: number,
) {
  return { name, size, creationDate, lastUpdated, version };
}

const rows = [
  createData('Frozen yoghurt', 159, new Date(), new Date(), 4.0),
  createData('Ice cream sandwich', 237, new Date(), new Date(), 4.3),
  createData('Eclair', 262, new Date(), new Date(), 6.0),
  createData('Cupcake', 305, new Date(), new Date(), 4.3),
  createData('Gingerbread', 356, new Date(), new Date(), 3.9),
];

export default function RelatedCaseDocuments() {
  return (
    <TableContainer component={Paper} sx={{ boxShadow : 0}}>
      <Table sx={{ minWidth: 650 ,border : 0}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <TableCell  sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Name</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Size</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Creation Date</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >Last Updated</TableCell>
            <TableCell align="right" sx={{ color: '#606060',fontWeight: 'bold',fontSize: 16,}} >version</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{  border: 0 }}
            >
              <TableCell style={{borderBottom: "none"}} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.size}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.creationDate.toDateString()}</TableCell>
              <TableCell style={{borderBottom: "none"}} align="right">{row.lastUpdated.toDateString()}</TableCell>
              <TableCell  style={{borderBottom: "none"}} align="right">{row.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}