import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Buttons from "../Components/Buttons";
import { Link } from "react-router-dom";
const bull = (
  <Box
    component="span"
    sx={{
      display: "inline-block",
      mx: "2px",
      transform: "scale(0.8)",
      justifyContent: "space-between",
    }}
  ></Box>
);

const card = (props) => (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ marginTop: "35px", marginBottom: "10px" }}>
        <img src={props.image} />
      </Typography>
      <Typography
        sx={{
          fontSize: "1.125rem",
          fontFamily: " Euclid, Roboto, Helvetica, Arial, sans-serif",
        }}
        component="div"
        gutterBottom
      >
        {props.heading}
      </Typography>
      <Typography
        sx={{ fontSize: 14, marginBottom: "40px" }}
        color="text.secondary"
      >
        {props.para}
      </Typography>

      <Link to="/create">
        <button
          style={{ cursor: "pointer" }}
          className="btn1"
          variant="contained"
        >
          {props.btn}
        </button>
      </Link>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard(props) {
  return (
    <div className="box1">
      <Box sx={{ minWidth: 375, height: 378 }}>
        {/* <Card style={{marginRight:"30px"}}  className="importCard" variant="outlined">{card(props)}</Card> */}
        <Card
          style={{ padding: "20px" }}
          className="importCard"
          variant="outlined"
        >
          {card(props)}
        </Card>
      </Box>
    </div>
  );
}
