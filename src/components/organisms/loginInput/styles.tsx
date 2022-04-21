import styled from "@emotion/styled";
import { theme } from "@src/styles/theme";
import { FlexDiv } from "@styles/index";

const Container = styled(FlexDiv)`
  column-gap: 1vmin;
  p {
    font-size: 1rem;
    min-width: 4rem;
  }
  input {
    min-width: 20vmin;
    min-height: 4vh;
  }
  input.error {
    border-radius: 3px;
    border: 1px solid ${theme.colors.red[900]};
  }
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.red[900]};
  min-height: 2rem;
  margin: 0px;
  font-size: 1rem;
`;

const Empty = styled.div`
  min-height: 4vmin;
`;

export { Container, ErrorMessage, Empty };
