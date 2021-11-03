import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CardPhrase(props) {
  return (
    <Card sx={{ width: 340,height:190,marginLeft:"7.5%"}}>
      <CardContent>
        <Typography style={{marginTop:"10%"}} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
       {props.content}
        </Typography>
        </CardContent>
    </Card>
  );
}
