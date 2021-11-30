import React from 'react';
import { Element } from 'react-scroll';

//STYLE
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
import codeJSON from './code.png';
import Buy from './Buy';
const Home = () => (
  <section className="Home">
    <Element id="Home" name="Home">
      <div className="App-background App-banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-12 text-center p-4">
              <h1 className="App-title display-2 fw-bold">SerialWorkbook Core</h1>
              <h3>Mejora tu sistema de inventario guardando tus pesas, con nuestra aplicación multiplataforma y ligero</h3>
            </div>
          </div>
        </div>
      </div>
    </Element>
    <Element id="Comunicacion" name="Comunicacion">
      <div className="container-fluid bg-dark App-banner" id="Comunicacion">
        <div className="row">
          <div className="col-sm-12 col-md-6 p-2 text-center">
            <h1 className="App-subtitle">Conecta tu indicador de peso de manera sencilla</h1>
            <p className="App-paragraph">Utilizando el protocolo de comunicación RS-232 para comunicar el indicador de peso con nuestra aplicación, se vuelve sencillo ya que todo indicador de fabrica vienen con este protocolo</p>
          </div>
        </div>
      </div>
    </Element>
    <Element id="Guardado" name="Guardado" className="App-background">
      <div className="container App-background App-banner">
        <div className="row p-2">
          <h1 className="App-subtitle text-center p-2 mb-5 mt-5">Guarda tus pesadas en el forma que más te acomode</h1>
          <div className="col-sm-12 col-md-6">
            <img
              src={codeJSON}
              className="img-fluid w-50"
            />
          </div>
          <div className="col-sm-12 col-md-6 text-center">
            <h2>Guarda tus mejor activo en el formato que mas te acomode</h2>
          </div>
        </div>
      </div>
    </Element>
    <Element id="Ventajas" name="Ventajas" className="bg-dark">
      <div className="container App-banner">
        <div className="row p-2">
          <h1 className="App-subtitle text-center p-2 mb-5 mt-5">Ventajas de usar <span className="App-title">SerialWorkbook</span></h1>
          <div className="col-sm-12 col-md-12 text-center">
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    </Element>
    <Element id="Comprar" name="Comprar">
      <Buy></Buy>
    </Element>
    <Element id="Contacto" name="Contacto" className="bg-dark">
      <div className="container App-banner">
        <div className="row p-2">
          <h1 className="App-subtitle text-center p-2 mb-5 mt-5">Contacto</h1>
          <div className="col-sm-12 col-md-12 text-center">
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    </Element>
  </section>
)

export default Home