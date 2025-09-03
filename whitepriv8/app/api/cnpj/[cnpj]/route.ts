import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { cnpj: string } }) {
  const cnpj = params.cnpj

  if (!cnpj || cnpj.length !== 14) {
    return NextResponse.json({ error: "CNPJ deve ter 14 dígitos" }, { status: 400 })
  }

  try {
    const proxyConfig = {
      scheme: "http",
      host: "2521b1c087ea390c.ika.na.pyproxy.io",
      port: 16666,
      username: "postman2025-zone-resi-region-br",
      password: "postman2025",
    }

    const proxyAuth = Buffer.from(`${proxyConfig.username}:${proxyConfig.password}`).toString("base64")
    const proxyUrl = `${proxyConfig.scheme}://${proxyConfig.host}:${proxyConfig.port}`

    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
        "Proxy-Authorization": `Basic ${proxyAuth}`,
      },
      // @ts-ignore - Node.js fetch agent configuration
      agent: proxyUrl,
    })

    if (!response.ok) {
      throw new Error("CNPJ não encontrado")
    }

    const data = await response.json()

    if (data.status === "ERROR") {
      throw new Error(data.message || "CNPJ inválido")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar CNPJ:", error)
    return NextResponse.json({ error: "Erro ao consultar CNPJ. Tente novamente." }, { status: 500 })
  }
}
