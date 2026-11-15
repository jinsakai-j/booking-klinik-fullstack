import { useEffect, useState } from 'react'
import Header from './components/Header'
import RingkasanJanji from './components/RingkasanJanji'
import FormJanjiTemu from './components/FormJanjiTemu'
import DaftarJanji from './components/DaftarJanji'
import TipsKesehatan from './components/TipsKesehatan'
import {
  ambilSemuaJanjiTemu,
  tambahJanjiTemu,
  ubahJanjiTemu,
  hapusJanjiTemu,
} from './services/janjiTemu'
import { daftarDokter } from './data/dokter'
import './App.css'

function App() {
  const [daftarJanji, setDaftarJanji] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMuat, setErrorMuat] = useState('')
  const [pesanForm, setPesanForm] = useState('')
  const [janjiDiedit, setJanjiDiedit] = useState(null)

  async function ambilJanji() {
    setLoading(true)
    setErrorMuat('')

    try {
      const data = await ambilSemuaJanjiTemu()
      setDaftarJanji(data)
    } catch (err) {
      setErrorMuat(err.message || 'Gagal mengambil data janji temu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ambilJanji()
  }, [])

  async function tambahJanji(janjiBaru) {
    try {
      const janjiTersimpan = await tambahJanjiTemu({
        ...janjiBaru,
        jam: janjiBaru.jam.replace(':', '.'),
      })

      setDaftarJanji([...daftarJanji, janjiTersimpan])
      setPesanForm('')
      return true
    } catch (err) {
      setPesanForm(err.message || 'Gagal menambah janji temu')
      return false
    }
  }

  function mulaiUbah(janji) {
    setJanjiDiedit(janji)
    setPesanForm('')
  }

  async function ubahJanji(id, perubahan) {
    try {
      const janjiTerubah = await ubahJanjiTemu(id, {
        ...perubahan,
        jam: perubahan.jam.replace(':', '.'),
      })

      setDaftarJanji(
        daftarJanji.map((janji) => (janji.id === id ? janjiTerubah : janji)),
      )
      setJanjiDiedit(null)
      setPesanForm('')
      return true
    } catch (err) {
      setPesanForm(err.message || 'Gagal mengubah janji temu')
      return false
    }
  }

  async function hapusJanji(janji) {
    const setuju = window.confirm(`Hapus janji temu ${janji.namaPasien}?`)
    if (!setuju) {
      return
    }

    try {
      await hapusJanjiTemu(janji.id)
      setDaftarJanji(daftarJanji.filter((item) => item.id !== janji.id))
      setPesanForm('')

      if (janjiDiedit && janjiDiedit.id === janji.id) {
        setJanjiDiedit(null)
      }
    } catch (err) {
      setPesanForm(err.message || 'Gagal menghapus janji temu')
    }
  }

  return (
    <div className="app">
      <Header
        judul="Booking Klinik Sejahtera"
        subjudul="Buat dan pantau janji temu pasien"
      />
      <RingkasanJanji daftar={daftarJanji} />

      {pesanForm && (
        <div className="tips-error">
          <p>{pesanForm}</p>
        </div>
      )}

      <FormJanjiTemu
        daftarDokter={daftarDokter}
        onTambah={tambahJanji}
        janjiDiedit={janjiDiedit}
        onUbah={ubahJanji}
        onBatalUbah={() => setJanjiDiedit(null)}
      />

      {loading && <p className="data-kosong">Memuat data janji temu...</p>}

      {errorMuat && (
        <div className="tips-error">
          <p>{errorMuat}</p>
          <button type="button" className="tombol-coba-lagi" onClick={ambilJanji}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !errorMuat && (
        <DaftarJanji
          daftar={daftarJanji}
          onUbah={mulaiUbah}
          onHapus={hapusJanji}
        />
      )}

      <TipsKesehatan />
    </div>
  )
}

export default App
