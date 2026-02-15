# Bölüm 08: Route 53 ve CloudFront

Sistemimizi kurduk, ölçeklendirdik ve veritabanına bağladık. Şimdi sıra kullanıcıyı bu sisteme en hızlı ve en güvenli şekilde ulaştırmakta.

---

### 1. Amazon Route 53 - Akıllı DNS Servisi

**Route 53**, sadece bir alan adı (Domain) tescil servisi değildir. Trafiği dünya genelinde yöneten çok güçlü bir DNS servisidir.

* **Sağlık Kontrolü (Health Checks):** Eğer bir bölgedeki (Region) sisteminiz çökerse, **Route 53** bunu anlar ve trafiği otomatik olarak çalışan diğer bölgeye yönlendirir.
* **Yönlendirme Politikaları (Routing Policies)** - Trafiği nasıl yönlendireceğini kontrol etmek için şu seçenekler vardır:
  * **Simple Routing:** Tek bir kaynağa yönlendirir.
  * **Latency-based Routing:** Kullanıcıya en düşük gecikmeyi sunan bölgeye yönlendirir.
  * **Geolocation Routing:** Kullanıcının bulunduğu ülkeye göre farklı içerik sunar (Örneğin: Türkiye'den girene Türkçe sayfa).
  * **Failover Routing:** Ana sistem çöktüğünde yedek sisteme geçiş yapar.



---

### 2. Amazon CloudFront - İçerik Dağıtım Ağı (CDN)

**CloudFront**, statik ve dinamik içerikleri (HTML, CSS, JS, Video) kullanıcılara en yakın noktadan sunarak hızı artırır.

* **Edge Locations:** Dünyanın dört bir yanına yayılmış yüzlerce noktadır. Veri ana sunucudan (S3 veya EC2) bir kez çekilir ve bu noktalarda önbelleğe (**Cache**) alınır.
* **Güvenlik:** **CloudFront**, **AWS Shield** ile birlikte çalışarak sisteminizi DDoS saldırılarına karşı en önde korur.
* **Maliyet:** Ana sunucunuzdan (Origin) sürekli veri çekmek yerine **Edge** üzerinden sunmak, veri transfer maliyetlerini düşürür.

---

### 3. S3 Web Hosting ve CloudFront İlişkisi

Statik bir web sitesi (HTML/CSS tabanlı) yapıyorsanız:

1. Dosyaları bir **S3 Bucket** içine yüklersiniz.
2. **CloudFront**'u bu bucket'ın önüne koyarsınız.
3. Kullanıcı siteye girdiğinde dosyaları doğrudan **S3**'ten değil, kendine en yakın **Edge Location**'dan alır. Bu, sitenizin ışık hızında açılmasını sağlar.

---

### 4. Özet: Trafik Nasıl Akar?

1. Kullanıcı tarayıcıya `www.deneme-sitesi.com` yazar.
2. **Route 53** bu ismi karşılar ve en uygun IP adresini (veya CloudFront linkini) verir.
3. Eğer içerik **CloudFront** üzerindeyse, kullanıcıya en yakın şehirden veri iletilir.
4. Eğer içerik dinamikse, trafik **ELB** üzerinden arkadaki **EC2** sunucularına gider.

---

<details>
<summary>SORU: Siteme saldıran IP adreslerini nasıl engellerim?</summary>
<div class="answer-content">

Bunun için **AWS WAF** (Web Application Firewall) kullanmalısınız. **WAF**'ı **CloudFront** veya **ALB** önüne koyarak belirli ülkeleri engelleyebilir, SQL Injection saldırılarını durdurabilir veya şüpheli IP adreslerine kural yazabilirsiniz.

</div>
</details>