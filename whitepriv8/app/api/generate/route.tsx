import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { companyData, template, domain } = await request.json()

    if (!companyData || !template || !domain) {
      return NextResponse.json({ error: "Dados obrigatórios não fornecidos" }, { status: 400 })
    }

    // Generate HTML content based on template
    const htmlContent = generateHTML(companyData, template, domain)

    // Create a simple response with HTML content
    // In a real implementation, this would create a ZIP file
    const response = new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
        "Content-Disposition": `attachment; filename="${domain}-landing-page.html"`,
      },
    })

    return response
  } catch (error) {
    console.error("Erro ao gerar landing page:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

function generateHTML(companyData: any, template: string, domain: string): string {
  const randomId = Math.random().toString(36).substring(2, 15)

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${companyData.nome || companyData.fantasia} - ${domain}</title>
    <meta name="description" content="${companyData.atividade_principal?.[0]?.text || "Empresa profissional"}">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .header {
            background: rgba(255,255,255,0.95);
            padding: 2rem;
            border-radius: 10px;
            margin-bottom: 2rem;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header h1 {
            color: #2c3e50;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .header p {
            color: #7f8c8d;
            font-size: 1.2rem;
        }
        .content {
            background: rgba(255,255,255,0.95);
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .info-card {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .info-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        .cta {
            background: #667eea;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 5px;
            font-size: 1.1rem;
            cursor: pointer;
            margin-top: 2rem;
            display: block;
            width: 100%;
            text-align: center;
            text-decoration: none;
        }
        .cta:hover {
            background: #5a6fd8;
        }
    </style>
</head>
<body data-fingerprint="${randomId}">
    <div class="container">
        <div class="header">
            <h1>${companyData.nome || companyData.fantasia}</h1>
            <p>${companyData.atividade_principal?.[0]?.text || "Empresa profissional"}</p>
        </div>
        
        <div class="content">
            <h2>Sobre Nossa Empresa</h2>
            <p>Bem-vindo à ${companyData.nome || companyData.fantasia}. Somos uma empresa especializada em ${companyData.atividade_principal?.[0]?.text || "serviços profissionais"}, comprometida em oferecer soluções de qualidade para nossos clientes.</p>
            
            <div class="info-grid">
                <div class="info-card">
                    <h3>Informações da Empresa</h3>
                    <p><strong>CNPJ:</strong> ${companyData.cnpj}</p>
                    ${companyData.telefone ? `<p><strong>Telefone:</strong> ${companyData.telefone}</p>` : ""}
                    ${companyData.email ? `<p><strong>Email:</strong> ${companyData.email}</p>` : ""}
                </div>
                
                ${
                  companyData.logradouro
                    ? `
                <div class="info-card">
                    <h3>Localização</h3>
                    <p>${companyData.logradouro}${companyData.numero ? `, ${companyData.numero}` : ""}</p>
                    ${companyData.bairro ? `<p>${companyData.bairro}</p>` : ""}
                    <p>${companyData.municipio} - ${companyData.uf}</p>
                    ${companyData.cep ? `<p>CEP: ${companyData.cep}</p>` : ""}
                </div>
                `
                    : ""
                }
            </div>
            
            <a href="#contato" class="cta">Entre em Contato</a>
        </div>
    </div>
    
    <script>
        console.log('Landing page carregada - ID: ${randomId}');
        // Fingerprint único para cada carregamento
        document.body.setAttribute('data-session', Date.now().toString());
    </script>
</body>
</html>`
}
