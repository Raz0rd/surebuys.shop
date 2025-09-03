import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { cnpj: string } }) {
  const cnpj = params.cnpj

  console.log("[v0] CNPJ API called with:", cnpj)

  if (!cnpj || cnpj.length !== 14) {
    console.log("[v0] Invalid CNPJ length:", cnpj?.length)
    return NextResponse.json({ error: "CNPJ deve ter 14 dígitos" }, { status: 400 })
  }

  try {
    const proxyConfig = {
      host: "2521b1c087ea390c.ika.na.pyproxy.io",
      port: "16666",
      username: "postman2025-zone-resi-region-br",
      password: "postman2025",
    }

    console.log("[v0] Making request to ReceitaWS with proxy")

    const proxyUrl = `http://${proxyConfig.username}:${proxyConfig.password}@${proxyConfig.host}:${proxyConfig.port}`

    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "pt-BR,pt;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
      },
      // @ts-ignore - Vercel Edge Runtime proxy configuration
      proxy: proxyUrl,
    })

    console.log("[v0] ReceitaWS response status:", response.status)

    if (!response.ok) {
      console.log("[v0] ReceitaWS response not ok:", response.statusText)
      throw new Error("CNPJ não encontrado")
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
