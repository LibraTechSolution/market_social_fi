import { ReactNode } from "react";
import NavbarUser from "./components/navbar";
import FooterUser from "./components/footer";
import Styled from "./index.styles";

interface Props {
  children?: ReactNode;
}

const Layout = ({
  children,
}: Props) => {
  return (
    <Styled.Wrapper id="onTop">
      <NavbarUser />
      <Styled.Container>{children}</Styled.Container>
      <FooterUser />
    </Styled.Wrapper>
  );
};

export default Layout;
