function KartuJanjiTemu({ janji, onUbah, onHapus }) {
  const kelasStatus =
    janji.status === 'Konfirmasi' ? 'status-konfirmasi' : 'status-menunggu'

  const tanggal = new Date(janji.tanggal).toISOString().slice(0, 10)

  return (
    <div className="kartu-janji">
      <div className="kartu-atas">
        <h3>{janji.namaPasien}</h3>
        <span className={`status ${kelasStatus}`}>{janji.status}</span>
      </div>
      <p className="kartu-dokter">{janji.dokter}</p>
      <p className="kartu-jadwal">
        {tanggal} - {janji.jam}
      </p>
      <p className="kartu-keluhan">{janji.keluhan}</p>
      <p className="kartu-hp">No. HP: {janji.noHp}</p>
      <div className="kartu-aksi">
        <button type="button" className="tombol-ubah" onClick={() => onUbah(janji)}>
          Ubah
        </button>
        <button type="button" className="tombol-hapus" onClick={() => onHapus(janji)}>
          Hapus
        </button>
      </div>
    </div>
  )
}

export default KartuJanjiTemu
