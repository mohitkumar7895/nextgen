async function checkUrls() {
  const urls = [
    'https://share.google/oY45ZWszHY25v4tBJ',
    'https://share.google/4RAq27rEgIjgJKNdx'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { redirect: 'follow' });
      console.log('URL:', u);
      console.log('Final URL:', res.url);
      console.log('Status:', res.status);
      const text = await res.text();
      console.log('Title:', text.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'No title');
      console.log('Preview:', text.slice(0, 500).replace(/\s+/g, ' '));
      console.log('-----------------------------------');
    } catch (e) {
      console.log('Error fetching', u, e.message);
    }
  }
}
checkUrls();
