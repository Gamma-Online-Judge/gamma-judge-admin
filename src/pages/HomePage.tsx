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
        <img src="https://i.imgur.com/yi7dy7a.jpg" style={{width: '100%'}}></img>
      </Container>
    </div>
  );
}
