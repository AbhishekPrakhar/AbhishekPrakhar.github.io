import React from "react";
import { withStyles } from "@material-ui/core";

import { Typography } from "./typography";

// const primary = "#536DFE";
// const secondary = "#FF5C93";
// const warning = "#FFC260";
// const success = "#3CD4A0";
// const info = "#9013FE";

const UserAvatar = ({ classes, theme, color = 'primary', ...props }) => {
  const letters = props.name
    .split(" ")
    .map(word => word[0])
    .join("");
console.log(props.xyz)
const background = props.xyz==='primary'?"#536DFE":props.xyz==='secondary'?"#FF5C93":props.xyz==='warning'?'#FFC260':props.xyz==='success'?"#3CD4A0":"#9013FE"

  return (
    <div className={classes.avatar} style={{ backgroundColor:background}}>
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
};

const styles = () => ({
  avatar: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%"
  },
  text: {
    color: 'white',
  }
});

export default withStyles(styles, { withTheme: true })(UserAvatar);