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

const templates = [
  { id: "corporate", name: "Corporativo", description: "Design profissional para empresas" },
  { id: "modern", name: "Moderno", description: "Layout contemporâneo e minimalista" },
  { id: "classic", name: "Clássico", description: "Estilo tradicional e elegante" },
  { id: "tech", name: "Tecnologia", description: "Visual inovador para empresas de tech" },
]

export default function WhitePagesGenerator() {
  const [cnpj, setCnpj] = useState("")
  const [domain, setDomain] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("corporate")
  const [companyData, setCompanyData] = useState<CompanyData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchCompanyData = async (cnpjValue: string) => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/whitepriv8/api/cnpj/${cnpjValue}`)
      if (!response.ok) {
        throw new Error("CNPJ não encontrado")
      }
      const data = await response.json()
      setCompanyData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar dados")
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

  const generateLandingPage = async () => {
    if (!companyData || !domain) return

    setLoading(true)
    try {
      const response = await fetch("/whitepriv8/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyData,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">WhitePages Generator</h1>
          <p className="text-xl text-gray-600">Gere landing pages profissionais automaticamente usando dados de CNPJ</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Dados da Empresa</h2>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={handleCnpjChange}
                placeholder="Digite o CNPJ (apenas números)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={14}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domínio</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="exemplo.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Carregando dados...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {companyData && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <h3 className="font-semibold text-green-800 mb-2">Dados Encontrados:</h3>
              <p>
                <strong>Nome:</strong> {companyData.nome}
              </p>
              {companyData.fantasia && (
                <p>
                  <strong>Fantasia:</strong> {companyData.fantasia}
                </p>
              )}
              <p>
                <strong>CNPJ:</strong> {companyData.cnpj}
              </p>
              <p>
                <strong>Atividade:</strong> {companyData.atividade_principal?.[0]?.text}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Selecione o Template</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <h3 className="font-semibold mb-2">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={generateLandingPage}
            disabled={!companyData || !domain || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            {loading ? "Gerando..." : "Gerar Landing Page"}
          </button>
        </div>
      </div>
    </div>
  )
}
