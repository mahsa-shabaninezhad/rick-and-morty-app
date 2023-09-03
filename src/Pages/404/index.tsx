import Layout from "../../components/Layout";
import pickleRick from "../../assets/img/pickle-rick.png";
import GlassyWrapper from "../../components/GlassyWrapper";

const NotFound = () => {
  return (
    <Layout bgImg={pickleRick}>
      <GlassyWrapper
        sx={{
          width: "max-content",
          margin: '80px',
          color: "#fff",
          fontSize: "10rem",
        }}
      >
        404
      </GlassyWrapper>
    </Layout>
  );
};

export default NotFound;
