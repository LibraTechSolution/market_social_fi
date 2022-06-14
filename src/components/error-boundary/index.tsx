import { Component, ReactNode } from "react";
import Button from "components/button";
import Styled from "./index.style";

interface Props {
  onReset: () => void;
  children: ReactNode | null;
}

interface State {
  error: any;
  errorInfo: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <Styled.Container>
          <Styled.Content>
            <Styled.Title>Whoops!</Styled.Title>
            <Styled.Description>
              Stuck in a blind spot. Reload to see the magic!
            </Styled.Description>

            <Button onClick={this.props.onReset}>Reload</Button>
          </Styled.Content>
        </Styled.Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
