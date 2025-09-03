# Configuração DNS e SSL no Cloudflare

## Problema DNS_PROBE_FINISHED_NXDOMAIN

### Configuração DNS Correta:
\`\`\`
Tipo: A
Nome: gmeports.com.br (ou @)
Valor: 76.76.21.21
Proxy: 🔴 DESABILITADO (DNS only)

Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com
Proxy: 🔴 DESABILITADO (DNS only)
\`\`\`

### Configuração SSL no Cloudflare:
1. **SSL/TLS** → **Overview** → **Full (strict)**
2. **Edge Certificates** → **Always Use HTTPS**: ON
3. **Edge Certificates** → **Minimum TLS Version**: 1.2

### Verificação:
- Aguarde 5-30 minutos para propagação DNS
- Teste: https://gmeports.com.br
- Teste: https://www.gmeports.com.br

### URLs Funcionais após correção:
- https://gmeports.com.br (raiz do projeto)
- https://gmeports.com.br/priv8pages (redirecionamento)
- https://v0-whitepages-generation-app.vercel.app
