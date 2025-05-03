import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  getColor,
  getFontColor,
  isResourceColor,
  ResourceColor,
} from "../models/ResourceColor.ts";

type Props = {
  color: ResourceColor;
  checked?: boolean;
  onClick?: () => void;
};

export const Resource = (props: Props) => {
  const color = getColor(props.color);
  const fontColor = getFontColor(props.color);
  return (
    <Box
      sx={{
        width: 13,
        height: 13,
        borderRadius: "1px",
        backgroundColor: color,
        color: fontColor,
        border: `1px solid ${grey[800]}`,
        fontSize: 9,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => props.onClick?.()}
    >
      {props.checked ? "v" : ""}
    </Box>
  );
};

type ResourceCubesProps = {
  str: string | null;
};

export const Resources = ({ str }: ResourceCubesProps) => {
  if (str == null) {
    return null;
  }
  const resources = Array.from(str);

  return (
    <Box sx={{ display: "flex", gap: "2px", flexFlow: "row wrap" }}>
      {resources.map((color, index) => {
        if (isResourceColor(color) === false) {
          return null;
        }
        return <Resource key={index} color={color} />;
      })}
    </Box>
  );
};
