"use client"

import type React from "react"

import { useState } from "react"

interface CompanyData {
  nome: string
  fantasia?: string
  cnpj: string
  atividade_principal: Array<{ text: string }>
  telefone?: string
  email?: string
  logradouro?: string
  numero?: string
  bairro?: string
  municipio?: string
  uf?: string
  cep?: string
}

interface PersonalData {
  nome: string
  cpf: string
  endereco: string
  cidade: string
  cep: string
  telefone: string
  ramo: string
}

const businessSectors = [
  "Advocacia",
  "Consultoria",
  "Tecnologia",
  "Saúde",
  "Educação",
  "Beleza e Estética",
  "Alimentação",
  "Construção",
  "Varejo",
  "Serviços Gerais",
  "Marketing",
  "Contabilidade",
  "Outro",
]

const templates = [
  {
    id: "institutional",
    name: "Institucional",
    description: "Design profissional com SEO completo",
    preview: "🏢",
  },
  {
    id: "modern",
    name: "Moderno",
    description: "Layout contemporâneo e minimalista",
    preview: "✨",
  },
  {
    id: "corporate",
    name: "Corporativo",
    description: "Estilo empresarial elegante",
    preview: "💼",
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Visual inovador e diferenciado",
    preview: "🎨",
  },
]

export default function WhitePagesGenerator() {
  const [step, setStep] = useState<"start" | "cnpj" | "cpf" | "template" | "generate">("start")
  const [userType, setUserType] = useState<"cnpj" | "cpf" | null>(null)

  // CNPJ data
  const [cnpj, setCnpj] = useState("")
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)

  // CPF data
  const [personalData, setPersonalData] = useState<PersonalData>({
    nome: "",
    cpf: "",
    endereco: "",
    cidade: "",
    cep: "",
    telefone: "",
    ramo: "",
  })

  const [domain, setDomain] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("institutional")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCompanyData = async (cnpjValue: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/cnpj/${cnpjValue}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "CNPJ não encontrado")
      }
      const data = await response.json()
      setCompanyData(data)
      setStep("template")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar dados da empresa")
      setCompanyData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setCnpj(value)

    if (value.length === 14) {
      fetchCompanyData(value)
    }
  }

  const handlePersonalDataSubmit = () => {
    if (
      personalData.nome &&
      personalData.cpf &&
      personalData.endereco &&
      personalData.cidade &&
      personalData.telefone &&
      personalData.ramo
    ) {
      setStep("template")
    } else {
      setError("Por favor, preencha todos os campos obrigatórios")
    }
  }

  const generateLandingPage = async () => {
    const data = userType === "cnpj" ? companyData : personalData
    if (!data || !domain) return

    setLoading(true)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          type: userType,
          template: selectedTemplate,
          domain,
        }),
      })

      if (!response.ok) throw new Error("Erro ao gerar landing page")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${domain}-landing-page.zip`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar landing page")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setStep("start")
    setUserType(null)
    setCnpj("")
    setCompanyData(null)
    setPersonalData({
      nome: "",
      cpf: "",
      endereco: "",
      cidade: "",
      cep: "",
      telefone: "",
      ramo: "",
    })
    setDomain("")
    setSelectedTemplate("institutional")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">WhitePages Pro</h1>
                <p className="text-sm text-muted-foreground">Gerador de Landing Pages Profissionais</p>
              </div>
            </div>
            {step !== "start" && (
              <button
                onClick={resetForm}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Voltar ao início
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        {error && (
          <div className="mb-6 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive font-medium">{error}</p>
          </div>
        )}

        {step === "start" && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground">Crie sua Landing Page Profissional</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Gere sites institucionais completos com SEO otimizado, políticas de privacidade e formulários de contato
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => {
                  setUserType("cnpj")
                  setStep("cnpj")
                }}
                className="group p-8 bg-card hover:bg-card/80 border border-border rounded-xl transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold mb-2">Empresa (CNPJ)</h3>
                <p className="text-muted-foreground">
                  Busque automaticamente os dados da sua empresa na Receita Federal
                </p>
              </button>

              <button
                onClick={() => {
                  setUserType("cpf")
                  setStep("cpf")
                }}
                className="group p-8 bg-card hover:bg-card/80 border border-border rounded-xl transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">👤</div>
                <h3 className="text-xl font-semibold mb-2">Pessoa Física (CPF)</h3>
                <p className="text-muted-foreground">Informe seus dados pessoais e área de atuação</p>
              </button>
            </div>
          </div>
        )}

        {step === "cnpj" && (
          <div className="bg-card rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Dados da Empresa</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">CNPJ da Empresa</label>
                <input
                  type="text"
                  value={cnpj}
                  onChange={handleCnpjChange}
                  placeholder="Digite apenas os números do CNPJ"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={14}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Os dados serão buscados automaticamente na Receita Federal
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Domínio do Site</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="exemplo.com.br"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {loading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="mt-2 text-muted-foreground">Buscando dados da empresa...</p>
                </div>
              )}

              {companyData && (
                <div className="bg-muted rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">✅ Dados Encontrados:</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Razão Social:</strong> {companyData.nome}
                    </div>
                    {companyData.fantasia && (
                      <div>
                        <strong>Nome Fantasia:</strong> {companyData.fantasia}
                      </div>
                    )}
                    <div>
                      <strong>CNPJ:</strong> {companyData.cnpj}
                    </div>
                    <div>
                      <strong>Atividade:</strong> {companyData.atividade_principal?.[0]?.text}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === "cpf" && (
          <div className="bg-card rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Dados Pessoais</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={personalData.nome}
                  onChange={(e) => setPersonalData({ ...personalData, nome: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CPF *</label>
                <input
                  type="text"
                  value={personalData.cpf}
                  onChange={(e) => setPersonalData({ ...personalData, cpf: e.target.value.replace(/\D/g, "") })}
                  placeholder="Apenas números"
                  maxLength={11}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Endereço Completo *</label>
                <input
                  type="text"
                  value={personalData.endereco}
                  onChange={(e) => setPersonalData({ ...personalData, endereco: e.target.value })}
                  placeholder="Rua, número, bairro"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cidade/UF *</label>
                <input
                  type="text"
                  value={personalData.cidade}
                  onChange={(e) => setPersonalData({ ...personalData, cidade: e.target.value })}
                  placeholder="São Paulo/SP"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CEP</label>
                <input
                  type="text"
                  value={personalData.cep}
                  onChange={(e) => setPersonalData({ ...personalData, cep: e.target.value.replace(/\D/g, "") })}
                  placeholder="Apenas números"
                  maxLength={8}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Telefone *</label>
                <input
                  type="text"
                  value={personalData.telefone}
                  onChange={(e) => setPersonalData({ ...personalData, telefone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Área de Atuação *</label>
                <select
                  value={personalData.ramo}
                  onChange={(e) => setPersonalData({ ...personalData, ramo: e.target.value })}
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione sua área</option>
                  {businessSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Domínio do Site</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="seusite.com.br"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handlePersonalDataSubmit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continuar para Templates
              </button>
            </div>
          </div>
        )}

        {step === "template" && (
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Escolha o Template</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-6 border-2 rounded-xl transition-all text-left ${
                      selectedTemplate === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-3">{template.preview}</div>
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={generateLandingPage}
                disabled={!domain || loading}
                className="bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                {loading ? "Gerando Landing Page..." : "🚀 Gerar Landing Page"}
              </button>

              {domain && (
                <p className="mt-4 text-muted-foreground">
                  Será gerado um arquivo ZIP com o site completo para <strong>{domain}</strong>
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground">© 2024 WhitePages Pro - Gerador de Landing Pages Profissionais</p>
        </div>
      </footer>
    </div>
  )
}
