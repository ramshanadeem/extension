import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import PropTypes from "prop-types";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
// import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandIcon from "@mui/icons-material/Expand";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import QrCodeIcon from "@mui/icons-material/QrCode";
import SvgIcon from "@mui/material/SvgIcon";
const FontAwesomeSvgIcon = React.forwardRef((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        /**
         * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
         * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
         * of a duotone icon. 40% is the default opacity.
         *
         * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
         */
        svgPathData.map((d, i) => (
          <path style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});

FontAwesomeSvgIcon.propTypes = {
  icon: PropTypes.any.isRequired,
};

export default function BasicPopover(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <EllipsesBtn /> */}

      <IconButton
        style={{ color: "black" }}
        aria-label="Example"
        onClick={handleClick}
      >
        <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faEllipsisV} />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // style={{ marginRight: "30%" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        style={{ left: "-169px" }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              {/* <ContentCopy fontSize="small" /> */}
              <img
                style={{ color: "grey" }}
                src="https://img.icons8.com/material-outlined/24/000000/external-link.png"
              />
            </ListItemIcon>
            <ListItemText>
              {" "}
              View Account on <br />
              Etherscan
            </ListItemText>
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <ExpandIcon />
              {/* <ContentCut fontSize="small" /> */}
            </ListItemIcon>
            <ListItemText>Expand view</ListItemText>
            <Typography variant="body2" color="text.secondary"></Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              {/* <ContentCopy fontSize="small" /> */}
              <QrCodeIcon />
            </ListItemIcon>
            <ListItemText>Account details</ListItemText>
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}
