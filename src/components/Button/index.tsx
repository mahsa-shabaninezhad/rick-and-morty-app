import {
  ButtonProps,
  styled,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";

interface Props extends ButtonProps {
  loading?: boolean;
}

const StyledButton = styled(MuiButton)<Props>(({ loading }) => {
  return {
    "&.MuiButtonBase-root": {
      color: "#fff",
      ...(loading && { display: "flex" }),
    },
  };
});

/**
 * by adding loading prop you will get loading and button will be disabled too
 */
function Button({ loading, children, ...props }: Props) {
  return (
    <StyledButton {...props} disabled={loading} loading={loading}>
      {loading ? <CircularProgress color="inherit" size={24} /> : children}
    </StyledButton>
  );
}

export default Button;
