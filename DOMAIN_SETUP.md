# Configuração de Domínios - Priv8Pages

## Como configurar no v0:

### Opção 1 - Publish (Recomendado)
1. Clique em **"Publish"** no v0
2. Deploy automático no Vercel
3. No Vercel Dashboard → Settings → Domains
4. Adicionar: `surebuys.shop`

### Opção 2 - Project Settings
1. ⚙️ → Project Settings → Integrations
2. Conectar Vercel
3. Configurar domínio customizado

## Estrutura de Slugs:

- `/priv8pages` - Gerador principal
- `/priv8pages/whitepages` - Landing pages
- `/priv8pages/presell` - Páginas de presell
- `/priv8pages/admin` - Painel administrativo

## Domínios finais:
- https://surebuys.shop/priv8pages
- https://surebuys.shop/priv8pages/whitepages
- https://surebuys.shop/priv8pages/presell

## Próximos projetos:
Cada novo projeto usará slug: `/priv8pages/[nome-projeto]`
