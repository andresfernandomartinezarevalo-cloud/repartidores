import "./Inicio.css";

function Inicio() {
  return (
    <div className="inicio">
      {/* PORTADA */}
      <section className="hero">
        <div className="hero-contenido">
          <span className="etiqueta">El sabor que te encanta</span>

          <h1>
            Bienvenido a <span>FastFoot</span>
          </h1>

          <p>
            Comida rápida gourmet preparada con ingredientes frescos y estándares
            de alta calidad. Disfruta de la mejor experiencia gastronómica
            con servicio ágil y entrega confiable.
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
            alt="Hamburguesa especial FastFoot"
          />
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="productos" id="productos">
        <h2>Nuestra Selección Especial</h2>
        <p className="subtitulo">
          Preparaciones exclusivas diseñadas para satisfacer todos los gustos.
        </p>

        <div className="productos-grid">
          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
              alt="Hamburguesas"
            />
            <h3>Hamburguesas</h3>
            <p>Carne 100% seleccionada, pan artesanal y vegetales frescos.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
              alt="Papas fritas"
            />
            <h3>Papas Rústicas</h3>
            <p>Corte grueso, doradas a la perfección y sazonadas con finas hierbas.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?w=500"
              alt="Pizzas"
            />
            <h3>Pizzas Artesanales</h3>
            <p>Masa madre crujiente con quesos madurados e ingredientes prémium.</p>
          </div>

          <div className="producto-card">
            <img
              src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500"
              alt="Alitas"
            />
            <h3>Alitas Glaseadas</h3>
            <p>Bañadas en salsas de la casa: BBQ ahumada, miel mostaza y picante suave.</p>
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section className="nosotros" id="nosotros">
        <h2>Conoce FastFoot</h2>

        <p className="nosotros-intro">
          En FastFoot combinamos la rapidez del servicio con el compromiso de
          utilizar ingredientes frescos de productores locales. Nuestra meta es
          ofrecer una experiencia culinaria accesible, deliciosa y memorable.
        </p>

        <div className="nosotros-grid">
          <div className="info-card">
            <span className="info-card-badge">Misión</span>
            <h3>Nuestra misión</h3>
            <p>
              Ofrecer alimentos preparados con los más altos estándares de higiene
              y sabor, brindando una atención cálida y tiempos de despacho óptimos.
            </p>
          </div>

          <div className="info-card">
            <span className="info-card-badge">Visión</span>
            <h3>Nuestra visión</h3>
            <p>
              Consolidarnos como el referente gastronómico líder en servicio
              rápido y entregas eficientes en la región.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="valores">
        <h2>Pilares de Calidad</h2>

        <div className="valores-grid">
          <div className="valor-item">Calidad Prémium</div>
          <div className="valor-item">Rapidez de Despacho</div>
          <div className="valor-item">Servicio al Cliente</div>
          <div className="valor-item">Sabor Inconfundible</div>
          <div className="valor-item">Higiene Certificada</div>
          <div className="valor-item">Compromiso Social</div>
        </div>
      </section>

      {/* PIE DE PAGINA */}
      <footer className="footer">
        <h2>FastFoot</h2>
        <p>El estándar de calidad en comida rápida y delivery.</p>
        <p className="copyright">© 2026 FastFoot. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Inicio;
