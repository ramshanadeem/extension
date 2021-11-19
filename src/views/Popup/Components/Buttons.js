import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../pages/Cards.css";
export default function ContainedButtons(props) {
  return (
    // <Stack direction="row" spacing={2}>
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      className={props.className}
      variant="contained"
    >
      {props.btn}
    </Button>

    // </Stack>
  );
}
// export function ContainedButton(props) {
//   return (
//     // <Stack direction="row" spacing={2}>
//     <Button
//       disabled={props.disabled}
//       onClick={props.onClick}
//       className={props.className}
//       variant="contained"
//     >
//       {props.btn}
//     </Button>

//     // </Stack>
//   );
// }
