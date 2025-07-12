const languageCodeToVoiceLang = {
  en: 'en-US',
  hi: 'hi-IN',
  fr: 'fr-FR',
  es: 'es-ES',
  de: 'de-DE',
  it: 'it-IT',
  ja: 'ja-JP',
  zh: 'zh-CN',
  ko: 'ko-KR',
  ru: 'ru-RU',
  ar: 'ar-SA',
  pt: 'pt-PT',
  sa: 'hi-IN' // Sanskrit fallback voice as Hindi
};

async function translateText() {
  const text = document.getElementById("inputText").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;

  const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
  const data = await res.json();
  document.getElementById("output").innerText = data.responseData.translatedText;
}

function copyText() {
  const translated = document.getElementById("output").innerText;
  navigator.clipboard.writeText(translated);
  alert("Copied!");
}

function speakText() {
  const text = document.getElementById("output").innerText.trim();
  if (!text) return alert("Please translate something first!");

  const langCode = document.getElementById("toLang").value;
  const lang = languageCodeToVoiceLang[langCode] || 'en-US';

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.volume = 1;
  utterance.pitch = 1.1;
  utterance.rate = 0.95;

  const voices = window.speechSynthesis.getVoices();
  const bestVoice = voices.find(v => v.lang === lang || v.lang.startsWith(lang));
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

window.speechSynthesis.onvoiceschanged = () => {};