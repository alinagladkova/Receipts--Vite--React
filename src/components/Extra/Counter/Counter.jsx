import cn from "classnames";
import styles from "./counter.module.scss";
import { useState, createContext } from "react";
import CounterNumber from "../CounterNumber/CounterNumber";
import CounterMinus from "../CounterMinus/CounterMinus";
import CounterPlus from "../CounterPlus/CounterPlus";

const CounterContext = createContext({ number: 0, handlePlus: () => console.log("click"), handleMinus: () => console.log("click") });

function Counter({ children }) {
  const [number, setNumber] = useState(0);

  const handlePlus = () => {
    setNumber(number + 1);
  };

  const handleMinus = () => {
    setNumber(number - 1);
  };

  return (
    <div className={cn(styles.counter)}>
      <CounterContext.Provider value={{ number, handlePlus, handleMinus }}>{children}</CounterContext.Provider>
    </div>
  );
}

Counter.CounterNumber = CounterNumber;
Counter.CounterMinus = CounterMinus;
Counter.CounterPlus = CounterPlus;

export default Counter;
export { CounterContext };

{
  /* <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown> */
}

{
  /* <Navbar expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>; */
}
