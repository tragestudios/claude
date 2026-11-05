# YDS Hazırlık Uygulaması – Proje Tanımı

> Bu dosya, projeyi geliştirecek yapay zekâ asistanı (Claude Code) için hazırlanmış bir proje özetidir.
> Kararlar netleşmeden kod yazmaya başlama; belirsiz noktaları önce bana sor.
> Uygulama adı şimdilik **"YDS Hazırlık"** (çalışma adı, değişebilir).

---

## 1. Amaç

YDS'ye hazırlanan öğrencinin **kendi çözdüğü denemelerden öğrenmesini** sağlayan bir mobil uygulama.

Hazır soru bankası satan uygulamalardan farkı şu: Kullanıcı kendi çözdüğü denemeyi uygulamaya yükler. Uygulama bu denemeden:
- yanlış yapılan soruları,
- konu bazında zayıf noktaları,
- denemede geçen ve bilinmeyen kelimeleri

çıkarır ve bunlar üzerinden tekrar yaptırır.

**Örnek senaryo:** Deneme 1'i çözdüm. 80 sorudan 44 doğru, 36 yanlış yaptım. Soruların fotoğraflarını çekip uygulamaya yüklüyorum. Uygulama her sorunun konusunu, doğru cevabını ve benim cevabımı kaydediyor. Sonra bu denemedeki kelimelerle quiz çözüyorum, yanlışlarımı tekrar çözüyorum ya da denemenin tamamını baştan çözüyorum.

---

## 2. Temel Özellikler (MVP)

### 2.1 Deneme yükleme
- Kullanıcı yeni bir deneme oluşturur: ad, tarih, kaynak (ör. "Deneme 1", "ÖSYM 2023 YDS İlkbahar").
- Sorular **fotoğraf** (kamera veya galeri) ya da **PDF** olarak yüklenir.
- Yapay zekâ her sayfadan şunları çıkarır:
  - soru numarası,
  - soru kökü,
  - A–E şıkları,
  - soru tipi / konu (bkz. 2.5),
  - varsa paragraf veya metin (okuma sorularında birden fazla soru aynı metne bağlıdır).
- Kullanıcı her soru için **kendi cevabını** ve **doğru cevabı** işaretler. Cevap anahtarı toplu da girilebilmeli, örneğin `1-A 2-C 3-E ...` şeklinde metin olarak ya da cevap anahtarı sayfasının fotoğrafıyla.
- Ayrıştırma sonucu **kullanıcıya gösterilir ve düzeltilebilir.** Yapay zekânın çıktısı asla doğrudan kesin kabul edilmez.
- Boş bırakılan sorular desteklenir: doğru / yanlış / boş.

### 2.2 Sonuç ve istatistik
- YDS puanı: **her doğru 1,25 puan** (80 soru = 100 puan). Yanlış doğruyu götürmez.
- Seviye gösterimi (YDS puan aralıkları):
  - A: 90–100
  - B: 80–89
  - C: 70–79
  - D: 60–69
  - E: 50–59
- Konu / soru tipi bazında doğru oranı. Örnek: "Cümle tamamlama: 3/6".
- Denemeler arası gelişim grafiği.

### 2.3 Tekrar çözme
- **Tam deneme modu:** Denemeyi baştan sona yeniden çöz. Süre sayacı olsun (gerçek sınav 180 dakika).
- **Sadece yanlışlarım:** Yanlış ve boş bırakılan sorular.
- **Konuya göre:** Örneğin bütün denemelerdeki cümle tamamlama soruları.
- Her tekrarın sonucu ayrı kaydedilir. İlk çözüm verisi silinmez.

### 2.4 Kelime çalışması
- Denemedeki sorulardan **kelimeler ve kalıplar** (phrasal verb, bağlaç vb.) otomatik çıkarılır.
- Kullanıcı bildiği kelimeleri eler, sadece **bilmediklerini** listesine ekler.
- Her kelime için şunlar tutulur: İngilizce kelime, Türkçe anlam(lar), kelime türü, **denemedeki örnek cümle** ve hangi deneme/sorudan geldiği.
- Quiz modları:
  - **Eşleştirme:** İngilizce ↔ Türkçe kartları eşleştir.
  - **Çoktan seçmeli:** Kelimenin anlamını 4–5 şıktan seç.
  - **Kart çevirme (flashcard).**
- **Aralıklı tekrar (spaced repetition):** Basit bir Leitner kutusu veya SM-2 algoritması kullanılır. Bilinmeyen kelime daha sık sorulur.
- Kelime listesi deneme bazında veya tüm denemeler genelinde çalışılabilir.

### 2.5 YDS soru tipleri (konu etiketleri)
1. Kelime bilgisi (vocabulary)
2. Dilbilgisi (grammar): zamanlar, edatlar, bağlaçlar vb.
3. Cloze test (boşluk doldurma paragrafı)
4. Cümle tamamlama
5. İngilizce → Türkçe çeviri
6. Türkçe → İngilizce çeviri
7. Okuma / paragraf soruları
8. Diyalog tamamlama
9. Anlamca en yakın cümle
10. Paragraf tamamlama
11. Anlam bütünlüğünü bozan cümle

Dilbilgisi soruları için ayrıca **alt konu** etiketi tutulmalı. Örnekler: "Tenses", "Relative clauses", "Conjunctions".

---

## 3. Hukuki Kısıt – ÇOK ÖNEMLİ

**ÖSYM soruları üzerinde ÖSYM'nin telif hakkı vardır.** Yazılı izin olmadan çoğaltılamaz ve yayımlanamaz.

Bu nedenle:
- Uygulama **hiçbir ÖSYM sorusunu barındırmaz, içinde getirmez ve sunucudan dağıtmaz.**
- Sunucuda soru veya fotoğraf **saklanmaz.** Sunucu sadece ayrıştırma isteğini iletir ve yanıtı döndürür, hiçbir şey kaydetmez.
- Tüm sorular, fotoğraflar ve kayıtlar **sadece kullanıcının cihazında** tutulur.
- Çıkmış sorular için uygulama içinde sadece ÖSYM'nin resmi sayfasına **bağlantı** verilir. Kullanıcı PDF'i kendisi indirip kendisi yükler.
- Kullanıcılar arası soru paylaşımı özelliği **yapılmaz.**

Bu kurallar mimariyi doğrudan etkiler. Bunları ihlal eden bir özellik önerme.

---

## 4. Önerilen Teknik Mimari

> Bunlar öneri. Daha iyi bir gerekçen varsa önce bana söyle.

### 4.1 Mobil uygulama
- **Expo (React Native) + TypeScript.** Tek kodla Android ve iOS çıkar.
- Yerel veritabanı: **expo-sqlite** (veya Drizzle ORM ile SQLite).
- Kamera / galeri: `expo-image-picker`. PDF seçimi: `expo-document-picker`.
- Fotoğraflar uygulamanın yerel dosya alanında saklanır.

### 4.2 Arka uç (küçük bir proxy)
- **Claude API anahtarı kesinlikle mobil uygulamanın içine konmaz.**
- Araya çok küçük bir sunucu konur, örneğin **Cloudflare Workers.** Uygulama fotoğrafı buraya gönderir, sunucu Claude API'yi çağırıp sonucu döndürür.
- Sunucu veri saklamaz. Kötüye kullanıma karşı basit bir hız sınırı (rate limit) olmalı.

### 4.3 Yapay zekâ ile ayrıştırma
- Varsayılan model: **Claude Haiku 5.5** (`claude-haiku-5-5`). Ucuz ve bu iş için yeterli.
- Haiku'nun okuyamadığı veya hatalı ayrıştırdığı sayfalar için yedek model: **Claude Sonnet 5.5** (`claude-sonnet-5-5`).
- Fotoğraf görsel (image) olarak gönderilir. Çıktı **yapılandırılmış JSON** olarak alınır: Claude API'nin structured outputs özelliği, `output_config.format` ile.
- API kullanım detaylarını ezberden yazma. Claude API dokümantasyonuna veya `claude-api` skill'ine bakarak doğrula.
- Kelime çıkarma ve Türkçe anlam üretme de aynı veya ayrı bir çağrıyla yapılabilir.

İleride maliyeti daha da düşürmek için: telefonda OCR (Google ML Kit / Apple Vision, ücretsiz ve internetsiz) yapılıp yapay zekâya sadece metin gönderilebilir. **MVP'de gerek yok.**

### 4.4 Tahmini maliyet
Kabaca, bir sayfa ≈ 2.500 girdi + 2.000 çıktı token, bir deneme ≈ 20 sayfa varsayımıyla:

- **Haiku 5.5:** Bir deneme (80 soru) yaklaşık **0,03 $**.
- **Sonnet 5.5:** Bir deneme yaklaşık **0,50 $**.

Gerçek token sayıları birkaç örnek fotoğrafla ölçülmeli.

---

## 5. Veri Modeli (taslak)

```
Deneme
  id, ad, tarih, kaynak, sure_dk, olusturma_zamani

Metin              (okuma/cloze paragrafları; birden fazla soru bağlanabilir)
  id, deneme_id, icerik

Soru
  id, deneme_id, metin_id (opsiyonel), numara,
  kok, sik_a, sik_b, sik_c, sik_d, sik_e,
  dogru_cevap, soru_tipi, alt_konu, fotograf_yolu

Cozum              (her çözüm denemesi ayrı kayıt: ilk çözüm + tekrarlar)
  id, deneme_id, tarih, mod (ilk | tam_tekrar | yanlislar | konu), sure_sn

CozumCevap
  id, cozum_id, soru_id, verilen_cevap (A–E veya boş), dogru_mu

Kelime
  id, ingilizce, turkce, tur, ornek_cumle, kaynak_soru_id,
  kutu (Leitner seviyesi), sonraki_tekrar_tarihi, dogru_sayisi, yanlis_sayisi
```

---

## 6. Geliştirme Aşamaları

1. **Aşama 1 – İskelet:** Expo projesi, SQLite, deneme oluşturma, soruları **elle** girme, cevap işaretleme, puan hesabı.
2. **Aşama 2 – Fotoğrafla yükleme:** Cloudflare Worker proxy, Claude ile ayrıştırma, düzeltme ekranı, cevap anahtarı girişi.
3. **Aşama 3 – Tekrar çözme:** Tam deneme / yanlışlar / konuya göre modlar, süre sayacı.
4. **Aşama 4 – Kelime:** Kelime çıkarma, bilinmeyenleri seçme, eşleştirme ve çoktan seçmeli quiz, aralıklı tekrar.
5. **Aşama 5 – İstatistik:** Konu bazlı başarı, denemeler arası gelişim grafiği.
6. **Sonra:** Telefonda OCR, PDF desteğinin iyileştirilmesi, yedekleme (dışa/içe aktarma dosyası), mağaza yayını.

Her aşama bitince çalışır durumda olmalı ve bana gösterilmeli.

---

## 7. Kapsam Dışı (şimdilik yapılmayacak)

- Uygulama içinde hazır ÖSYM soruları
- Kullanıcı hesabı, bulutta senkronizasyon, soru paylaşımı
- Ödeme / abonelik
- Web sürümü

---

## 8. Açık Sorular (başlamadan önce bana sor)

- Uygulamanın kalıcı adı ne olacak?
- Önce sadece Android mi, yoksa ikisi birlikte mi?
- Kelime anlamları sadece yapay zekâdan mı gelsin, yoksa kullanıcı da düzenleyebilsin mi? (Önerim: ikisi birden.)
- Arayüz dili sadece Türkçe mi?
