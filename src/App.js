//LIBRERIAS
import React from "react";
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link as LinkRouter } from 'react-router-dom';
import { Link, animateScroll as Scroll } from 'react-scroll';



//STATIC FILES
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
//ROUTES
import Home from './Home';
import Shop from './Buy';
import ShopSuccess from './Success';
import PageNotFound from './PageNotFound';

function App() {
  const ScrollLink = Scroll.ScrollLink
  return (
    <section className='App-full-height'>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="sticky-top">
          <Container>
            <Navbar.Brand>
            <LinkRouter to="/" className="App-navbar-link">CRESOF</LinkRouter>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                <Link
                    to="Home"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link"
                    activeClass="App-active"
                  >
                    Inicio
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="Comunicacion"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link"
                    activeClass="App-active"
                  >
                    Comunicacion
                  </Link>
                </Nav.Link>
                <Nav.Link>
                <Link
                    to="Guardado"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link"
                    activeClass="App-active"
                  >
                    Guardado
                  </Link>              
                </Nav.Link>
                <Nav.Link>
                <Link
                    to="Ventajas"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link"
                    activeClass="App-active"
                  >
                    Ventajas
                  </Link>              
                </Nav.Link>
                <Nav.Link>
                <Link
                    to="Comprar"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link App-link-comprar"
                    activeClass="App-active-comprar"
                  >
                    Comprar
                  </Link>              
                </Nav.Link>
                <Nav.Link>
                <Link
                    to="Contacto"
                    spy={true}
                    smooth={true}
                    duration={300}
                    isDynamic={true}
                    className="App-navbar-link"
                    activeClass="App-active"
                  >
                    Contacto
                  </Link>              
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </section>
  );
}

export default App;
