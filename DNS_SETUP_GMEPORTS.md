# Configuração DNS para gmeports.com.br

## Registros DNS necessários:

### Opção 1 - CNAME (Recomendado)
\`\`\`
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Auto

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
TTL: Auto
\`\`\`

### Opção 2 - Registros A
\`\`\`
Type: A
Name: @
Value: 76.76.19.61
TTL: Auto

Type: A
Name: www  
Value: 76.76.19.61
TTL: Auto
\`\`\`

## Passos para configurar:

1. **No painel do seu provedor DNS** (onde está registrado gmeports.com.br)
2. **Adicione os registros CNAME** conforme acima
3. **Aguarde propagação** (até 48h, geralmente 15-30 min)
4. **Teste:** https://gmeports.com.br/priv8pages

## Verificação:
- Vercel Dashboard → Project → Settings → Domains
- Status deve aparecer como "Valid" quando configurado
