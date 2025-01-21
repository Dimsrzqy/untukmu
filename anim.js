const audio = document.querySelector("audio");
const lyrics = document.querySelector("#lyrics");
const fadeInDuration = 0.5; // Durasi efek fade-in dalam detik

// Validasi elemen
if (audio && lyrics) {
  // Data lirik dengan waktu dalam detik
  const lyricsData = [
    { text: "Ku ingin kau jadi milikku", time: 2 },
    { text: "Temani diriku seumur hidupku", time: 6 },
    { text: "Dan ku berjanji tak akan sakiti", time: 10 },
    { text: "Kau yang kucinta sepenuh hati", time: 15 },
    { text: "Biarkan semua manusia", time: 18 },
    { text: "Jadi saksi nyata", time: 21 },
    { text: "Bahwa memilikimu adalah", time: 23 },
    { text: "Anug'rah terindah untuk diriku", time: 28 },
  ];

  let lyricsHidden = false; // Flag untuk memastikan lirik hanya dihilangkan sekali

  // Fungsi untuk memperbarui lirik berdasarkan waktu
  const updateLyrics = () => {
    const time = audio.currentTime;

    // Menyembunyikan lirik pada detik ke-35
    if (time >= 35 && !lyricsHidden) {
      lyrics.style.animation = "fadeOut 1s ease-in-out forwards";
      setTimeout(() => {
        lyrics.style.display = "none";
      }, 1000);
      lyricsHidden = true; // Set flag untuk mencegah pengulangan
      return; // Menghentikan pembaruan lirik
    }

    const currentLine = lyricsData.find(
      (line, index) =>
        time >= line.time &&
        (index === lyricsData.length - 1 || time < lyricsData[index + 1].time)
    );

    if (currentLine) {
      const opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);
      lyrics.style.opacity = opacity;
      lyrics.innerHTML = currentLine.text;
    } else {
      lyrics.style.opacity = 0;
      lyrics.innerHTML = "";
    }

    requestAnimationFrame(updateLyrics);
  };

  // Memulai pembaruan lirik saat audio diputar
  audio.addEventListener("play", () => requestAnimationFrame(updateLyrics));

  // Fungsi untuk menyembunyikan judul setelah 30 detik
  const ocultarTitulo = () => {
    const titulo = document.querySelector(".titulo");
    if (titulo) {
      titulo.style.animation = "fadeOut 3s ease-in-out forwards";
      setTimeout(() => {
        titulo.style.display = "none";
      }, 3000);
    }
  };

  // Memulai penyembunyian judul setelah 30 detik
  setTimeout(ocultarTitulo, 30000);
} else {
  console.error("Elemen audio atau lyrics tidak ditemukan di halaman.");
}
