"use client"

import type React from "react"

import { useState } from "react"

export default function Page() {
  const [cnpj, setCnpj] = useState("")
  const [domain, setDomain] = useState("")
  const [template, setTemplate] = useState("corporate")
  const [loading, setLoading] = useState(false)
  const [companyData, setCompanyData] = useState<any>(null)

  const fetchCompanyData = async (cnpjValue: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cnpj/${cnpjValue}`)
      if (!response.ok) throw new Error("Erro ao buscar dados")
      const data = await response.json()
      setCompanyData(data)
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao buscar dados da empresa")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (cnpj.length >= 14) {
      fetchCompanyData(cnpj.replace(/\D/g, ""))
    }
  }

  const generateLandingPage = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyData,
          domain,
          template,
          fingerprint: Math.random().toString(36).substring(7),
        }),
      })

      if (!response.ok) throw new Error("Erro ao gerar landing page")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${companyData.nome_fantasia || "landing-page"}.zip`
      a.click()
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao gerar landing page")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">WhitePages Generator</h1>
          <p className="text-slate-600">Gere landing pages profissionais automaticamente usando dados de CNPJ</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">CNPJ da Empresa</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0000-00"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Domínio de Destino</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="exemplo.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="corporate">Corporativo</option>
                <option value="modern">Moderno</option>
                <option value="minimal">Minimalista</option>
                <option value="creative">Criativo</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Buscando..." : "Buscar Dados da Empresa"}
            </button>
          </form>
        </div>

        {companyData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Dados da Empresa</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Razão Social:</strong> {companyData.razao_social}
              </div>
              <div>
                <strong>Nome Fantasia:</strong> {companyData.nome_fantasia}
              </div>
              <div>
                <strong>CNPJ:</strong> {companyData.cnpj}
              </div>
              <div>
                <strong>Situação:</strong> {companyData.situacao}
              </div>
            </div>

            <button
              onClick={generateLandingPage}
              disabled={loading}
              className="mt-4 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Gerando..." : "Gerar Landing Page"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
