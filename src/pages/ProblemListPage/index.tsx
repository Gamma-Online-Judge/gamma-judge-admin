import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Header from "../../components/Header/header"
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { getAllProblems } from "../../actions/problems.client";
import { ProblemData } from "../../models/problem";
import { useHistory } from "react-router-dom";

export const ProblemListPage = () => {

  const [problemList, setProblemList] = useState<ProblemData[]>([]);

  const history = useHistory();

  useEffect(() => {
    getAllProblems().then(res => {
      setProblemList(res);
    })
  })
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor: "#c0c0c0"}}>
              <TableRow>
                <TableCell style={{ fontSize: '25px', fontWeight: '700'}}>Custom Id</TableCell>
                <TableCell style={{ fontSize: '25px', fontWeight: '700'}}>Título do problema</TableCell>
                <TableCell>
                  <IconButton onClick={() => history.push('/problem/new')}>
                    <AddCircleIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problemList.map((row) => (
                <TableRow
                  key={row.customId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ fontSize: '20px', fontWeight: '500'}}>
                    {row.customId}
                  </TableCell>
                  <TableCell style={{ fontSize: '20px', fontWeight: '500'}}>{row.pt_BR?.title}</TableCell>
                  <TableCell width={"10px"}>
                    <IconButton onClick={() => history.push(`/problems/${row.customId}`)}><EditIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}