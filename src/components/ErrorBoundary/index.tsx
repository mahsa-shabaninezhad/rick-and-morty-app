import { Box, Typography } from "@mui/material";
import { ReactNode, Component } from "react";
import Layout from "../Layout";
import pickleRick from "../../assets/img/pickle-rick.png";
import GlassyWrapper from "../GlassyWrapper";
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "error" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ? (
        this.props.fallback
      ) : (
        <Layout bgImg={pickleRick}>
          <GlassyWrapper maxWidth={700}>
            <Typography sx={{ mt: 10, mb: 1 }} variant="h2">
              something went{" "}
              <Box component="span" color="red">
                wrong
              </Box>
              !
            </Typography>
            <Typography variant="h5" component="p">
              {this.state.errorMessage}
            </Typography>
          </GlassyWrapper>
        </Layout>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
