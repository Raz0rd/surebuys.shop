<?php
$nonce = bin2hex(random_bytes(16));
?>
<!DOCTYPE html>
<html lang="pt-BR" itemscope itemtype="https://schema.org/ProfessionalService">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fantasia}} - {{atividade}} | {{cidade}}/{{uf}}</title>
    <meta name="description" content="{{descricao_seo}}">
    <meta name="keywords" content="{{atividade}}, {{cidade}}, {{fantasia}}, {{servico1}}, {{servico2}}, {{servico3}}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="{{fantasia}}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://{{domain}}/">
    <meta property="og:title" content="{{fantasia}} - {{atividade}}">
    <meta property="og:description" content="{{descricao_seo}}">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://{{domain}}/">
    <meta property="twitter:title" content="{{fantasia}} - {{atividade}}">
    <meta property="twitter:description" content="{{descricao_seo}}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://{{domain}}/">
    
    <!-- Schema.org markup for Google -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "{{fantasia}}",
        "@id": "https://{{domain}}/",
        "url": "https://{{domain}}/",
        "telephone": "{{tel}}",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "{{logradouro}}, {{num}}",
            "addressLocality": "{{bairro}}",
            "addressRegion": "{{uf}}",
            "postalCode": "{{cep}}",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-23.5505",
            "longitude": "-46.6333"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "12:00"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/{{domain}}",
            "https://www.instagram.com/{{domain}}"
        ]
    }
    </script>
    <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;color:#1e293b;line-height:1.6;background:#f8fafc;}
    a{text-decoration:none;color:inherit;}
    header{background:linear-gradient(135deg,{{primary}},{{secondary}});color:#f8fafc;padding:1.5rem;position:sticky;top:0;z-index:1000;box-shadow:0 4px 12px rgba(0,0,0,.15);}
    nav{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto;}
    .logo{font-size:2rem;font-weight:700;letter-spacing:.8px;text-transform:uppercase;}
    .nav-links{display:flex;gap:2rem;}
    .nav-links a{font-weight:500;font-size:1.1rem;position:relative;transition:color .3s;}
    .nav-links a::after{content:'';position:absolute;width:0;height:2px;bottom:-5px;left:0;background:{{highlight}};transition:width .3s;}
    .nav-links a:hover::after{width:100%;}
    .nav-links a:hover{color:{{highlight}};}
    .menu-toggle{display:none;font-size:2rem;cursor:pointer;color:{{highlight}};}
    .hero{background:linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),background-size:cover;background-position:center;color:#f8fafc;text-align:center;padding:8rem 1.5rem;position:relative;}
    .hero h1{font-size:3rem;margin-bottom:1rem;text-shadow:2px 2px 10px rgba(0,0,0,.5);}
    .hero p{font-size:1.15rem;margin:0 auto 2rem;max-width:820px;}
    .cta-button{background:linear-gradient(135deg,{{highlight}},{{primary}});color:#f8fafc;padding:1rem 2.5rem;border-radius:50px;font-size:1.1rem;font-weight:600;transition:transform .3s;display:inline-block;}
    .cta-button:hover{transform:translateY(-5px);box-shadow:0 8px 25px rgba(0,0,0,.3);}
    .about,.services,.contact,.legal{max-width:1200px;margin:4rem auto;padding:0 1.5rem;text-align:center;}
    h2{font-size:2.2rem;margin-bottom:1.2rem;color:#2D3748;position:relative;}
    h2::after{content:'';width:120px;height:5px;background:linear-gradient(to right,{{highlight}},{{primary}});display:block;margin:1rem auto 0;border-radius:3px;}
    .about-content{display:grid;gap:2rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));}
    .about-content div{background:#fff;padding:2rem;border-radius:20px;box-shadow:0 8px 30px rgba(0,0,0,.08);transition:transform .4s;}
    .about-content div:hover{transform:translateY(-8px);}
    .services-grid{display:grid;gap:2rem;}
    .services-grid.grid-1{grid-template-columns:1fr;max-width:500px;margin:0 auto;}
    .services-grid.grid-2{grid-template-columns:repeat(2,minmax(260px,1fr));max-width:820px;margin:0 auto;}
    .services-grid.grid-3{grid-template-columns:repeat(auto-fit,minmax(260px,1fr));}
    .service-card{background:#fff;padding:2rem;border-radius:20px;position:relative;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.08);transition:transform .4s;}
    .service-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:6px;background:linear-gradient(to right,{{highlight}},{{primary}});border-radius:20px 20px 0 0;}
    .service-card:hover{transform:translateY(-8px);box-shadow:0 12px 35px rgba(0,0,0,.12);}
    footer{background:linear-gradient(135deg,#1f2937,#111827);color:#f8fafc;padding:3rem 1.5rem;text-align:center;}
    .footer-links{display:flex;justify-content:center;gap:2rem;margin-bottom:1.2rem;flex-wrap:wrap;}
    .footer-links a,.btn-legal{font-weight:500;font-size:1.05rem;transition:color .3s;background:none;border:none;color:{{highlight}};cursor:pointer;}
    .footer-links a:hover,.btn-legal:hover{color:#fff;text-decoration:underline;}
    .modal{display:none;position:fixed;z-index:999;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.6);align-items:center;justify-content:center;}
    .modal-content{background:#fff;padding:2rem;max-width:800px;width:90%;border-radius:12px;max-height:80vh;overflow:auto;}
    .close{float:right;font-size:1.5rem;font-weight:bold;cursor:pointer;}
    @media(max-width:768px){
      .nav-links{display:none;flex-direction:column;position:absolute;top:80px;left:0;width:100%;background:#2D3748;padding:2rem;}
      .nav-links.active{display:flex;}
      .menu-toggle{display:block;}
    }
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  </style>
</head>
<body data-id="<?php echo $nonce; ?>">
  <header class="header" itemscope itemtype="https://schema.org/WPHeader">
    <nav>
      <div class="logo">{{fantasia}}</div>
      <div class="menu-toggle">☰</div>
      <div class="nav-links">
        <a href="#home">Início</a>
        <a href="#about">Sobre</a>
        <a href="#services">Serviços</a>
        <a href="#contact">Contato</a>
      </div>
    </nav>
  </header>

  <section id="home" class="hero">
    <h1>{{fantasia}}</h1>
    <p>{{fraseInstitucional}}</p>
    <a href="#contact" class="cta-button">Entre em Contato</a>
  </section>

  <section id="about" class="about">
    <h2>Sobre Nós</h2>
    <div class="about-content">
      <div><h3>Missão</h3><p>Oferecer serviços de qualidade com excelência e compromisso.</p></div>
      <div><h3>Visão</h3><p>Ser referência no mercado através da inovação e satisfação do cliente.</p></div>
      <div><h3>Valores</h3><p>Ética, transparência, qualidade e responsabilidade social.</p></div>
    </div>
  </section>

  <section id="contact" class="contact">
    <h2>Contato</h2>
    <p><strong>Endereço:</strong> {{endereco_completo}}</p>
    <p><strong>Telefone:</strong> {{tel}}</p>
    <p><strong>E-mail:</strong> <a href="mailto:{{email}}">{{email}}</a></p>
    
    <form method="POST" action="contato.php" style="max-width:600px;margin:2rem auto;text-align:left;">
      <div style="margin-bottom:1rem;">
        <label style="display:block;margin-bottom:0.5rem;font-weight:600;">Nome:</label>
        <input type="text" name="nome" required style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:8px;">
      </div>
      <div style="margin-bottom:1rem;">
        <label style="display:block;margin-bottom:0.5rem;font-weight:600;">E-mail:</label>
        <input type="email" name="email" required style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:8px;">
      </div>
      <div style="margin-bottom:1rem;">
        <label style="display:block;margin-bottom:0.5rem;font-weight:600;">Mensagem:</label>
        <textarea name="mensagem" rows="5" required style="width:100%;padding:0.75rem;border:1px solid #ddd;border-radius:8px;resize:vertical;"></textarea>
      </div>
      <button type="submit" style="background:{{primary}};color:#fff;padding:0.75rem 2rem;border:none;border-radius:8px;font-weight:600;cursor:pointer;">Enviar Mensagem</button>
    </form>
  </section>

  <footer>
    <p>&copy; {{ano}} {{fantasia}}. Todos os direitos reservados.</p>
    <div class="footer-links">
      <button class="btn-legal" onclick="openModal('privacidade')">Política de Privacidade</button>
      <button class="btn-legal" onclick="openModal('termos')">Termos de Uso</button>
    </div>
  </footer>

  <!-- Modal -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div id="modal-body"></div>
    </div>
  </div>

  <script>
  document.addEventListener("DOMContentLoaded",function(){
    const toggle=document.querySelector(".menu-toggle");
    const links=document.querySelector(".nav-links");
    toggle.addEventListener("click",()=>links.classList.toggle("active"));
  });

  function openModal(tipo){
    let body = document.getElementById("modal-body");
    if(tipo === "privacidade"){
      body.innerHTML = `<h2>Política de Privacidade</h2>
        <p>Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.</p>
        <h3>Coleta de Informações</h3>
        <p>Coletamos apenas as informações necessárias para fornecer nossos serviços, como nome, e-mail e telefone.</p>
        <h3>Uso das Informações</h3>
        <p>Utilizamos suas informações apenas para entrar em contato e fornecer os serviços solicitados.</p>
        <h3>Proteção de Dados</h3>
        <p>Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado.</p>`;
    }
    if(tipo === "termos"){
      body.innerHTML = `<h2>Termos de Uso</h2>
        <p>Ao utilizar nosso site, você concorda com os seguintes termos:</p>
        <h3>Uso Permitido</h3>
        <p>Este site destina-se ao uso pessoal e comercial legítimo.</p>
        <h3>Propriedade Intelectual</h3>
        <p>Todo o conteúdo deste site é protegido por direitos autorais.</p>
        <h3>Limitação de Responsabilidade</h3>
        <p>Não nos responsabilizamos por danos indiretos decorrentes do uso deste site.</p>`;
    }
    document.getElementById("modal").style.display = "flex";
  }
  function closeModal(){ document.getElementById("modal").style.display = "none"; }
  </script>
</body>
</html>
