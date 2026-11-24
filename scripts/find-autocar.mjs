async function getAutocarImages() {
  try {
    const res = await fetch('https://www.autocarpro.in/news-national/amw-drive-medium-cv-segment-2576', {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await res.text();
    const matches = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)];
    const unique = [...new Set(matches.map(m => m[0]))];
    console.log('Found images:', unique);
  } catch (e) {
    console.error('Error:', e);
  }
}
getAutocarImages();
