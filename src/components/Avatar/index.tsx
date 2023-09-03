import { BoxProps, Typography, TypographyProps, styled } from "@mui/material";
import { ImgHTMLAttributes } from "react";
import { CharacterStatusType } from "../../Types";
const IMG_FILTER = {
  Dead: "grayscale(100%)",
  Alive: "unset",
  Unknown: "unset",
};
const Avatar = ({
  imgSrc,
  caption,
  status,
  round,
  width,
  height,
  zoomOnHover,
}: {
  imgSrc: string;
  caption?: string;
  status?: CharacterStatusType;
  round?: boolean;
  width: string;
  height: string;
  zoomOnHover?: boolean;
}) => {
  return (
    <Figure
      width={width}
      height={height}
      round={round}
      zoom={zoomOnHover}
      component="figure"
    >
      <Image src={imgSrc} status={status} />
      {caption && (
        <Caption textAlign={round ? "center" : "left"} component="figcaption">
          {caption}
        </Caption>
      )}
    </Figure>
  );
};

export default Avatar;

// --------------------FIGURE-COMPONENT-STYLE--------
interface FigureProps extends BoxProps {
  width: string;
  height: string;
  round?: boolean;
  zoom?: boolean;
}

const Figure = styled(Typography)<FigureProps>(
  ({ width, height, round, zoom }) => ({
    "&:hover": {
      transform: zoom ? "scale(1.5)" : "",
    },
    transition: "transform .5s",
    width,
    height,
    position: "relative",
    margin: 0,
    borderRadius: round ? "50%" : "unset",
    overflow: "hidden",
    flexShrink: 0,
  })
);

// --------------------CAPTION-COMPONENT-STYLE--------
interface CaptionProps extends TypographyProps {
  textAlign: "center" | "left";
}

const Caption = styled(Typography)<CaptionProps>(({ theme, textAlign }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  backgroundColor: "#48484896",
  textAlign: textAlign,
}));

// --------------------IMAGE-COMPONENT-STYLE--------
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  status?: CharacterStatusType;
}

const Image = styled("img")<ImageProps>(({ status }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
  filter: status ? IMG_FILTER[status] : "",
}));
