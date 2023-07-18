import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header/header";
import { Container } from "@mui/material";

export default function HomePage() {
  return (
    <div>
      <Header/>
      <Container  maxWidth="lg">
        <div className="title-container">
          <h1 className="form-title"> Gamma Judge Admin </h1>
        </div>
        <div className="form-container">
          <Link className="input-container" to="/problems">
            <Button>Problems</Button>
          </Link>
          <Link className="input-container" to="/contests">
            <Button>Contests</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
