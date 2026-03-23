async function generate() {
  const brand = document.getElementById("brand").value;
  const vpo = document.getElementById("vpo").value;
  const mdo = document.getElementById("mdo").value;
  const component = document.getElementById("component").value;
  const file = document.getElementById("product").files[0];

  const base64 = await toBase64(file);

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ brand, vpo, mdo, component, image: base64 })
  });

  const data = await res.json();
  document.getElementById("output").src = data.image;
}

function toBase64(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = rej;
  });
}
