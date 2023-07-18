import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Header from "../../components/Header/header"
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { getAllProblems } from "../../actions/problems.client";
import { ProblemData } from "../../models/problem";
import { useHistory } from "react-router-dom";
import { ContestData } from "../../models/contest";
import { getAllContests } from "../../actions/contests.client";

export const ContestListPage = () => {

  const [contestList, setContestList] = useState<ContestData[]>([]);

  const history = useHistory();

  useEffect(() => {
    getAllContests().then(res => {
        setContestList(res);
    })
  }, [])

  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <TableContainer component={Paper} style={{ marginTop: '20px'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor: "#c0c0c0"}}>
              <TableRow>
                <TableCell style={{ fontSize: '25px', fontWeight: '700'}}>Custom Id</TableCell>
                <TableCell style={{ fontSize: '25px', fontWeight: '700'}}>Nome do contest</TableCell>
                <TableCell>
                  <IconButton onClick={() => history.push('/contest/new')}>
                    <AddCircleIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contestList.map((row) => (
                <TableRow
                  key={row.customId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ fontSize: '20px', fontWeight: '500'}}>
                    {row.customId}
                  </TableCell>
                  <TableCell style={{ fontSize: '20px', fontWeight: '500'}}>{row.name}</TableCell>
                  <TableCell width={"10px"}>
                    <IconButton onClick={() => history.push(`/contests/${row.customId}`)}><EditIcon/></IconButton>
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