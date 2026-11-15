const BASE_URL = 'http://localhost:3000/janji-temu'

async function bacaRespons(response) {
  const data = await response.json()

  if (!response.ok) {
    const pesan = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message

    throw new Error(pesan || 'Terjadi kesalahan saat menghubungi server')
  }

  return data
}

export async function ambilSemuaJanjiTemu() {
  const response = await fetch(BASE_URL)
  return bacaRespons(response)
}

export async function tambahJanjiTemu(janjiBaru) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(janjiBaru),
  })

  return bacaRespons(response)
}

export async function ubahJanjiTemu(id, perubahan) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(perubahan),
  })

  return bacaRespons(response)
}

export async function hapusJanjiTemu(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  return bacaRespons(response)
}
