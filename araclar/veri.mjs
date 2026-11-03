// Şifreli veri aracı. Parola PAROLA ortam değişkeninden okunur, hiçbir yere yazılmaz.
//   PAROLA=... node araclar/veri.mjs coz              -> index.html içindeki veriyi JSON olarak yazdırır
//   PAROLA=... node araclar/veri.mjs sifrele veri.json -> JSON'u şifreleyip index.html içine yerleştirir
import { readFileSync, writeFileSync } from "node:fs";
import { webcrypto } from "node:crypto";
const { subtle } = webcrypto, getRandomValues = a => webcrypto.getRandomValues(a);

const HTML = new URL("../index.html", import.meta.url);
const ISARET = /\/\*VERI\*\/[\s\S]*?\/\*VERI\*\//;
const ITER = 310000;
const b64 = u => Buffer.from(u).toString("base64");
const ub64 = s => new Uint8Array(Buffer.from(s, "base64"));

const parola = process.env.PAROLA;
if (!parola) { console.error("PAROLA ortam değişkeni gerekli."); process.exit(1); }

async function anahtar(salt) {
  const k = await subtle.importKey("raw", new TextEncoder().encode(parola), "PBKDF2", false, ["deriveKey"]);
  return subtle.deriveKey({ name: "PBKDF2", salt, iterations: ITER, hash: "SHA-256" }, k,
    { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

const [komut, dosya] = process.argv.slice(2);
const html = readFileSync(HTML, "utf8");

if (komut === "coz") {
  const s = JSON.parse(html.match(ISARET)[0].slice(8, -8));
  const acik = await subtle.decrypt({ name: "AES-GCM", iv: ub64(s.iv) }, await anahtar(ub64(s.salt)), ub64(s.veri));
  console.log(JSON.stringify(JSON.parse(new TextDecoder().decode(acik)), null, 2));
} else if (komut === "sifrele") {
  const veri = JSON.stringify(JSON.parse(readFileSync(dosya, "utf8")));
  const salt = getRandomValues(new Uint8Array(16)), iv = getRandomValues(new Uint8Array(12));
  const sifreli = await subtle.encrypt({ name: "AES-GCM", iv }, await anahtar(salt), new TextEncoder().encode(veri));
  const blok = `/*VERI*/${JSON.stringify({ iter: ITER, salt: b64(salt), iv: b64(iv), veri: b64(new Uint8Array(sifreli)) })}/*VERI*/`;
  writeFileSync(HTML, html.replace(ISARET, () => blok));
  console.log("index.html güncellendi.");
} else {
  console.error("Kullanım: node araclar/veri.mjs coz | sifrele <veri.json>"); process.exit(1);
}
