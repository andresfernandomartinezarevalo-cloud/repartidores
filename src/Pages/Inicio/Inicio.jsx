
import "./Inicio.css";

function Inicio() {
  return (
    <div className="inicio">

      {/* PORTADA */}
      <section className="hero">
        <div className="hero-contenido">
          <span className="etiqueta">🍔 ¡El sabor que te encanta!</span>

          <h1>
            Bienvenido a <span>FastFoot</span>
          </h1>

          <p>
            Comida rápida, deliciosa y preparada con ingredientes frescos.
            Hamburguesas, pizzas, alitas y mucho más para disfrutar cada momento.
          </p>

          <div className="hero-botones">
            <a href="#productos" className="btn-principal">
              Ver nuestros productos
            </a>

            <a href="#nosotros" className="btn-secundario">
              Conócenos
            </a>
          </div>
        </div>

        <div className="hero-imagen">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900"
            alt="Deliciosa hamburguesa FastFoot"
          />
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="productos" id="productos">
        <h2>¿Qué se te antoja hoy?</h2>
        <p className="subtitulo">
          Tenemos opciones deliciosas para todos los gustos.
        </p>

        <div className="productos-grid">
          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
              alt="Hamburguesa"
            />
            <h3>Hamburguesas</h3>
            <p>Jugosas, frescas y llenas de sabor.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
              alt="Papas fritas"
            />
            <h3>Papas fritas</h3>
            <p>Crujientes y perfectas para acompañar.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=500"
              alt="Pizza"
            />
            <h3>Pizzas</h3>
            <p>Una combinación irresistible de ingredientes.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500"
              alt="Alitas"
            />
            <h3>Alitas</h3>
            <p>Con sabores y salsas para todos los gustos.</p>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="nosotros" id="nosotros">
        <h2>Conoce FastFoot</h2>

        <p>
          En FastFoot preparamos comida rápida con ingredientes frescos,
          porciones generosas y un sabor que te hará volver. Queremos que
          cada visita sea una experiencia rápida, cómoda y deliciosa.
        </p>

        <div className="nosotros-grid">
          <div className="info-card">
            <span>🎯</span>
            <h3>Nuestra misión</h3>
            <p>
              Brindar comida rápida de calidad, con ingredientes frescos,
              precios accesibles y un servicio amable y eficiente.
            </p>
          </div>

          <div className="info-card">
            <span>🚀</span>
            <h3>Nuestra visión</h3>
            <p>
              Ser reconocidos como una marca favorita por nuestro sabor,
              rapidez, atención cercana y compromiso con los clientes.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="valores">
        <h2>Lo que nos caracteriza</h2>

        <div className="valores-grid">
          <div>⭐ Calidad</div>
          <div>⚡ Rapidez</div>
          <div>🤝 Atención al cliente</div>
          <div>🍔 Sabor</div>
          <div>🧼 Higiene</div>
          <div>❤️ Compromiso</div>
        </div>
      </section>

      {/* PIE DE PAGINA */}
      <footer className="footer">
        <h2>FastFoot</h2>
        <p>El sabor que te hace volver 🍔</p>
        <p>© 2026 FastFoot - Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}

export default Inicio;
