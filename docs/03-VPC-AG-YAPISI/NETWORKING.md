# Bölüm 03: VPC (Virtual Private Cloud) ve Network Yapısı

AWS dünyasında bir sunucu açmadan önce, o sunucunun içinde yaşayacağı bir "ev" yani bir ağ (Network) kurmanız gerekir. İşte bu özel, izole edilmiş sanal ağa **VPC** diyoruz. Kendi veri merkezinizi **Cloud** üzerinde inşa etmek gibidir.

---

### 1. VPC’nin Temel Yapı Taşları

Bir VPC kurarken şu kavramları avucunuzun içi gibi bilmelisiniz:

#### A. IPv4 CIDR Block
VPC'nize bir adres aralığı vermeniz gerekir. Genellikle `10.0.0.0/16` gibi bir blok seçilir. Bu, ağınızda kaç tane cihaz (IP adresi) olabileceğini belirler.

#### B. Subnets (Alt Ağlar)
VPC'nizi daha küçük parçalara böleriz. Bu parçalar **AZ**'ler (Availability Zones) içinde yaşar.
* **Public Subnet:** İnternetten doğrudan erişilebilen ağdır. (Örn: Web sitenizin ön yüzü).
* **Private Subnet:** İnternete kapalı, izole ağdır. (Örn: Veritabanları, hassas veriler).



---

### 2. İnternete Çıkış ve Giriş Trafiği

VPC'niz varsayılan olarak dış dünyaya kapalıdır. Kapıları biz açarız:

* **Internet Gateway (IGW):** VPC'nizin "dış kapısıdır". Eğer bu kapı yoksa, VPC içindeki hiçbir sunucu internete çıkamaz ve internetten erişilemez.
* **NAT Gateway:** Private Subnet içindeki sunucuların, dışarıdan erişilmeden (güvenli bir şekilde) internete çıkıp güncelleme yapmasını sağlar. (Tek yönlü çıkış kapısı).
* **Route Tables (Rota Tabloları):** Ağ içindeki trafiğin nereye gideceğini belirleyen "trafik polisleridir".

---

### 3. Güvenlik Katmanları (NACL vs Security Groups)

AWS Network güvenliği iki aşamalıdır. Bu ayrımı anlamayan bir öğrenci, "Neden bağlantı kuramıyorum?" sorusuyla saatlerini harcar:

| Özellik | **Security Groups (SG)** | **Network ACL (NACL)** |
| :--- | :--- | :--- |
| **Kapsam** | Instance (Sunucu) Seviyesi | Subnet (Alt Ağ) Seviyesi |
| **Durum** | **Stateful:** Gidişe izin verirsen dönüşe otomatik izin verilir. | **Stateless:** Hem gidiş hem dönüş kuralı yazmalısın. |
| **Öncelik** | İkinci savunma hattı. | İlk savunma hattı. |
| **Kural** | Sadece "İzin Ver" kuralı yazılır. | "İzin Ver" ve "Reddet" kuralı yazılabilir. |



---

### 4. VPC Peering ve VPN

* **VPC Peering:** İki farklı VPC'yi birbirine sanki aynı ağdaymış gibi bağlamanızı sağlar.
* **Site-to-Site VPN:** Şirketinizdeki fiziksel ofisi, AWS'teki VPC'nize güvenli bir tünelle bağlar.

---

### 5. Senaryo: Profesyonel Bir Mimari Nasıl Kurulur?

Bir öğrenciye şu standart yapıyı öğretmeliyiz:
1. Bir VPC oluştur.
2. 2 farklı AZ'de **Public Subnet** aç (Yüksek erişilebilirlik için).
3. Web sunucularını buraya koy ve **Internet Gateway**'e bağla.
4. 2 farklı AZ'de **Private Subnet** aç.
5. Veritabanlarını buraya sakla. Kimse internetten onlara doğrudan ulaşamasın.

---

<details>
<summary>SORU: Sunucuma SSH ile bağlanamıyorum ama Security Group kuralları doğru. Sorun ne olabilir?</summary>
<div class="answer-content">

Üç ihtimal var:

1. Sunucunun bulunduğu Subnet'te bir **Internet Gateway** tanımlı değildir.
2. **Route Table** içinde dış dünyaya (0.0.0.0/0) giden bir rota yoktur.
3. **NACL** (Network ACL) üzerinden 22 portu (ve dönüş trafiği) engellenmiştir.

</div>
</details>