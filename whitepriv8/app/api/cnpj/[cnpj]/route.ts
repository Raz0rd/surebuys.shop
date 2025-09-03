import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { cnpj: string } }) {
  const cnpj = params.cnpj

  console.log("[v0] CNPJ API called with:", cnpj)

  if (!cnpj || cnpj.length !== 14) {
    console.log("[v0] Invalid CNPJ length:", cnpj?.length)
    return NextResponse.json({ error: "CNPJ deve ter 14 dígitos" }, { status: 400 })
  }

  try {
    console.log("[v0] Making request to ReceitaWS API")

    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WhitePages Generator/1.0)",
        Accept: "application/json",
        "Accept-Language": "pt-BR,pt;q=0.9",
        "Cache-Control": "no-cache",
        Referer: "https://www.receitaws.com.br/",
        Origin: "https://www.receitaws.com.br",
      },
      method: "GET",
    })

    console.log("[v0] ReceitaWS response status:", response.status)

    if (!response.ok) {
      console.log("[v0] ReceitaWS response not ok:", response.statusText)

      console.log("[v0] Trying alternative CNPJ API")
      const altResponse = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; WhitePages Generator/1.0)",
          Accept: "application/json",
        },
      })

      if (altResponse.ok) {
        const altData = await altResponse.json()
        console.log("[v0] BrasilAPI data received:", altData.razao_social || "No razao_social field")

        const convertedData = {
          nome: altData.razao_social || altData.nome_fantasia,
          fantasia: altData.nome_fantasia,
          cnpj: altData.cnpj,
          logradouro: altData.logradouro,
          numero: altData.numero,
          bairro: altData.bairro,
          municipio: altData.municipio,
          uf: altData.uf,
          cep: altData.cep,
          telefone: altData.ddd_telefone_1,
          email: altData.email,
          atividade_principal: altData.cnae_fiscal_descricao ? [{ text: altData.cnae_fiscal_descricao }] : [],
        }

        return NextResponse.json(convertedData)
      }

      throw new Error("CNPJ não encontrado em nenhuma API")
    }

    const data = await response.json()
    console.log("[v0] ReceitaWS data received:", data.nome || "No name field")

    if (data.status === "ERROR") {
      console.log("[v0] ReceitaWS returned error:", data.message)
      throw new Error(data.message || "CNPJ inválido")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Erro ao buscar CNPJ:", error)
    return NextResponse.json(
      {
        error: "Erro ao consultar CNPJ. Tente novamente.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
