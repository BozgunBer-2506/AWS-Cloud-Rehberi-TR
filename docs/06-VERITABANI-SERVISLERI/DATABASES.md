# Bölüm 06: Database Services (Veritabanı Servisleri)

Veriyi saklamak (Storage) farklıdır, o veriyi yönetmek ve sorgulamak (Database) farklıdır. AWS'de kendi sunucunuza veritabanı kurmak yerine, yönetilen (**Managed**) servisleri kullanmak size zaman, güvenlik ve performans kazandırır.

---

### 1. Relational (İlişkisel) Veritabanları - Amazon RDS

**RDS (Relational Database Service)**, bildiğiniz SQL tabanlı veritabanlarını (MySQL, PostgreSQL, MariaDB, SQL Server, Oracle) sizin yerinize yöneten servistir.

* **Yönetilen Hizmet:** Donanım kurulumu, işletim sistemi yamaları (patching) ve yedekleme (backup) işlemlerini AWS otomatik yapar.
* **Multi-AZ (Yüksek Erişilebilirlik):** Ana veritabanınız çökerse, AWS saniyeler içinde trafiği başka bir bölgedeki yedeğe yönlendirir.
* **Read Replicas (Okuma Kopyaları):** Eğer web sitenizde çok fazla "okuma" sorgusu varsa, veritabanının kopyalarını oluşturarak ana yükü hafifletebilirsiniz.

---

### 2. Amazon Aurora (Cloud'un Şampiyonu)

**Aurora**, AWS'in Cloud mimarisi için özel olarak baştan tasarladığı veritabanı motorudur.

* **Hız:** Standart MySQL'den 5 kat, PostgreSQL'den 3 kat daha hızlıdır.
* **Dayanıklılık:** Verinizi 3 farklı **AZ**'de 6 kopya olarak saklar. Kendi kendine iyileşme (self-healing) özelliğine sahiptir.
* **Maliyet:** Ticari veritabanlarının (Oracle gibi) onda biri fiyatına aynı performansı sunar.

---

### 3. NoSQL Veritabanları - Amazon DynamoDB

Eğer verileriniz arasında katı bir ilişki yoksa ve milisaniyeler içinde yanıt almanız gerekiyorsa **DynamoDB** doğru tercihtir.

* **Serverless (Sunucu Yönetimsiz):** Sunucu yönetmezsiniz, sadece tablo oluşturur ve veri atarsınız. Kapasiteyi AWS sizin için ayarlar.
* **Sınırsız Ölçekleme:** Saniyede 10 sorgu da gelse, 10 milyon sorgu da gelse hızı değişmez.
* **JSON Yapısı:** Veriler doküman tabanlı saklanır. Şema zorunluluğu yoktur (**Key-Value** yapısı).

---

### 4. Amazon ElastiCache (Hız Deposu)

Veritabanı bazen disk hızı nedeniyle yavaş kalabilir. **ElastiCache**, verileri RAM üzerinde saklayan (In-memory) bir önbellekleme servisidir (Redis veya Memcached destekler).

* **Kullanım Amacı:** Sık sorulan soruları veya oturum (session) bilgilerini buraya koyarak veritabanı üzerindeki yükü azaltırız.

---

### 5. Seçim Rehberi: Hangisini Seçmeliyim?

| İhtiyaç | **Önerilen Servis** |
| --- | --- |
| **E-Ticaret sepeti, karmaşık raporlar** | Amazon RDS / Aurora |
| **Oyun skor tabloları, IoT verileri** | Amazon DynamoDB |
| **Çok hızlı veri çekme (Caching)** | Amazon ElastiCache |
| **Devasa veri ambarı (Data Warehouse)** | Amazon Redshift |

---

<details>
<summary>SORU: AWS benim yerime yedek alıyor mu?</summary>
<div class="answer-content">

Evet! **RDS**'de **Automated Backups** özelliğini açarsanız, AWS her gün belirlediğiniz saatte yedeği alır. Ayrıca istediğiniz an manuel olarak **Snapshot** çekip veritabanının o anki halini ölümsüzleştirebilirsiniz.

</div>
</details>