import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { cnpj: string } }) {
  const cnpj = params.cnpj

  if (!cnpj || cnpj.length !== 14) {
    return NextResponse.json({ error: "CNPJ deve ter 14 dígitos" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)

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
    return NextResponse.json({ error: "Erro ao consultar CNPJ" }, { status: 500 })
  }
}
