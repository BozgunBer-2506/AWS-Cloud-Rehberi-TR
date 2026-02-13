# Bölüm 04: EC2 (Elastic Compute Cloud)

**EC2**, AWS üzerinde saniyeler içinde kiralayabileceğiniz sanal sunuculardır. **Elastic** (Esnek) denmesinin sebebi, sunucunun kapasitesini (CPU, RAM, Disk) istediğiniz an artırıp azaltabilmenizdir. Kendi bilgisayarınızı fiziksel olarak güçlendirmek aylar sürerken, EC2'de bu işlem birkaç tıkla biter.

---

### 1. EC2 Satın Alma Modelleri (Maliyet Yönetimi)

Bir Cloud Architect, sunucuyu sadece açmayı değil, en ucuza nasıl çalıştıracağını da bilmelidir. 4 ana model vardır:

* **On-Demand (Talep Üzerine):** En esnek modeldir. İstediğin an aç, istediğin an kapat. Saniye başına ödeme yaparsın. En pahalıdır ama taahhüt gerektirmez.
* **Reserved Instances (RI - Rezerv Edilmiş):** 1 veya 3 yıllık kullanım sözü verirsiniz. Fiyatta **%75'e varan indirim** alırsınız. "Benim bu sunucum 7/24 hiç kapanmadan çalışacak" dediğiniz durumlar içindir.
* **Spot Instances:** AWS'in o an kullanılmayan boş kapasitesini çok ucuza (%90 indirimle) kullanmaktır. 
    * **Dikkat:** AWS kapasiteye ihtiyaç duyarsa size 2 dakika önceden haber verip sunucuyu kapatabilir. Kesintiye dayanıklı işler (veri işleme vb.) için harikadır.
* **Dedicated Hosts:** Sunucunun fiziksel donanımı tamamen size ayrılır. Genellikle çok özel lisanslama veya yüksek güvenlik gereksinimleri için kullanılır.

---

### 2. Instance Tipleri: Hangi Sunucu Bana Uygun?

AWS'de yüzlerce sunucu tipi vardır. Bunları "aileler" olarak kodlamalıyız:

* **T & M Ailesi (General Purpose):** Denge arayanlar içindir. Küçük web siteleri, test ortamları ve mikro servisler için idealdir.
* **C Ailesi (Compute Optimized):** Yüksek işlemci gücü ister (Video render, yüksek matematiksel hesaplamalar).
* **R Ailesi (RAM / Memory Optimized):** Dev veritabanları veya bellek içinde (In-memory) çalışan uygulamalar içindir.
* **P & G Ailesi (GPU / Graphics):** Yapay zeka eğitimi (Machine Learning) veya grafik yoğunluklu işler içindir.

---

### 3. AMI (Amazon Machine Image) - Sunucunun Ruhu

Bir EC2 sunucusu açarken ona bir "kalıp" seçersiniz. Buna **AMI** denir.
* **İçinde ne var?** İşletim sistemi (Linux, Windows), önceden kurulmuş yazılımlar ve ayarlar.
* **Custom AMI:** Kendi sunucunuzu kurup ayarlarını yaptıktan sonra onun bir "fotoğrafını" (snapshot) çekip kendi AMI'nizi oluşturabilirsiniz. Böylece aynı sunucudan 100 tane daha açmak saniyeler sürer.

---

### 4. Storage (Depolama): EBS ve Instance Store

Sunucunuzun verilerini nerede saklayacağız?

* **EBS (Elastic Block Store):** Sunucuya takılan sanal bir hard disktir. Sunucuyu kapatsanız bile veriler burada kalır. Başka bir sunucuya söküp takabilirsiniz (Network bağlantılıdır).
* **Instance Store:** Sunucunun fiziksel olarak üzerinde bulunan disktir. Çok hızlıdır ama sunucuyu "Stop" ederseniz veriler **silinir**. Geçici veriler için kullanılır.

---

### 5. Güvenlik ve Erişim: Key Pairs & Security Groups

* **Key Pairs:** Sunucunuza şifreyle değil, özel bir anahtar dosyasıyla (.pem veya .ppk) bağlanırsınız. Bu, kırılamayacak kadar güvenli bir erişim sağlar.
* **Security Groups:** Sunucunun etrafındaki sanal güvenlik duvarıdır. "Sadece benim IP adresimden 22 portuna (SSH) izin ver" gibi kurallar burada yazılır.

---

### 6. User Data (Otomatik Kurulum)

Bir sunucuyu açarken, içine "bu sunucu açılır açılmaz şu kodları çalıştır" diyebilirsiniz. Buna **User Data** denir. Örneğin sunucu açılır açılmaz otomatik olarak bir web server (Apache/Nginx) kurup kodlarınızı GitHub'dan çekebilir.

---

### 7. Önemli Kavram: Agility vs Scalability

Öğrencinin en çok karıştırdığı yer burasıdır:
* **Agility (Çeviklik):** Saniyeler içinde yeni bir sunucu kiralayıp hemen işe koyulabilme yeteneğidir.
* **Vertical Scaling (Dikey Ölçekleme):** Mevcut bir sunucunun kapasitesini (Örn: RAM artırmak) yükseltmektir. Bir sınırı vardır ve sunucuyu kapatıp açmak gerekir.
* **Horizontal Scaling (Yatay Ölçekleme):** Mevcut sunucunun yanına aynılarından yeni sunucular ekleyerek gücü artırmaktır. Sınırı yoktur ve sistem kapanmadan yapılır.

---

<details>
<summary>SORU: Sunucum çok yavaşladı, RAM yetmiyor. Ne yapmalıyım?</summary>
<div class="answer-content">

Eğer tek bir sunucun varsa onu durdurup tipini büyütebilirsin (**Vertical Scaling**). Ama profesyonel çözüm, yanına yeni sunucular ekleyip yükü paylaştırmaktır (**Horizontal Scaling**).

</div>
</details>

---

## Kurulum Rehberi

AWS, yeni kullanıcılara 12 ay boyunca aylık 750 saat ücretsiz **t2.micro** (veya bazı bölgelerde **t3.micro**) sunucu kullanma hakkı verir. Bu rehberde, kişisel bilgi içermeyen standart bir web sunucusunu nasıl ayağa kaldıracağımızı göreceğiz.

---

### KRİTİK KURAL: İsimlendirme Standartları

AWS servis isimleri (Örn: **EC2**, **VPC**) büyük yazılsa da, sizin oluşturduğunuz kaynak isimlerinde (Name Tags) şu kurallara **mutlaka** uymalısınız:

1. **Sadece İngilizce karakterler kullanın:** (a-z, 0-9 ve tire "-").
2. **Asla Türkçe karakter kullanmayın:** (ç, ğ, ı, i, ö, ş, ü / Ç, Ğ, İ, Ö, Ş, Ü).
3. **Küçük harf (lowercase) tercih edin:** Teknik hataları önlemek için tüm isimlendirmeleri `test-server-01` gibi küçük harfle yapın.

---

### Adım 1: EC2 Dashboard'a Giriş

1. AWS Console üzerinden **EC2** servisini aratın ve açın.
2. Turuncu renkli **Launch Instance** butonuna tıklayın.

---

### Adım 2: Sunucuya İsim ve İşletim Sistemi Seçimi

1. **Name:** Sunucunuza genel bir isim verin (Örn: `web-server-test`).
2. **AMI (Amazon Machine Image):** Listeden **Amazon Linux 2023** seçin. Altında mutlaka **Free tier eligible** yazdığından emin olun.

---

### Adım 3: Instance Type Seçimi

1. **Instance Type:** Listeden **t2.micro** seçin. (Yanında **Free tier eligible** etiketi olmalı).

---

### Adım 4: Key Pair (Anahtar Çifti) Oluşturma

1. **Create new key pair** linkine tıklayın.
2. İsim verin: `my-ssh-key` (Küçük harf ve İngilizce karakter).
3. **Key pair type:** RSA, **File format:** .pem seçin.
4. **Create** dediğinizde dosya bilgisayarınıza iner.

---

### Adım 5: Network Ayarları (Security Group)

1. **Allow SSH traffic from:** `My IP` seçin.
2. **Allow HTTP traffic from the internet:** Bu kutucuğu işaretleyin.

---

### Adım 6: User Data (Otomatik Web Server Kurulumu)

Sayfanın en altındaki **Advanced Details** kısmını açın ve en alttaki **User Data** kutusuna şu genel kodları yapıştırın:
```bash
#!/bin/bash
# sistemi guncelle
dnf update -y
# apache web server kur
dnf install -y httpd
# apache'yi baslat ve acilista calisacak sekilde ayarla
systemctl start httpd
systemctl enable httpd
# genel bir karsilama sayfasi yaz
echo "<h1>aws egitim dunyasina hos geldiniz!</h1>" > /var/www/html/index.html
```

---

### Adım 7: Başlat ve Test Et

1. Sağ taraftaki **Launch Instance** butonuna basın.
2. Sunucunun durumu **Running** olduğunda, alt taraftaki **Public IPv4 address** kısmındaki IP'yi kopyalayın.
3. Tarayıcınıza bu IP'yi yapıştırın. Ekranda **"aws egitim dunyasina hos geldiniz!"** yazısını görüyorsanız işlem tamamdır.

---

<details>
<summary>DİKKAT: Ücret ödememek için ne yapmalıyım?</summary>
<div class="answer-content">

1. Her zaman **Free tier eligible** etiketli kaynakları seçin.
2. İşiniz bittiğinde sunucuyu seçip **Instance State > Terminate** diyerek tamamen silin.
3. **EBS** disk boyutunu 30 GB'ın üzerine çıkarmayın.

</div>
</details>
