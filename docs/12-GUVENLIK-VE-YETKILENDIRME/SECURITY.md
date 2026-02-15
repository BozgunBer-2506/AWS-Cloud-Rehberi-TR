# Bölüm 12: Security, Identity & Compliance

AWS dünyasında güvenlik "0. gün" meselesidir. Her şeyden önce gelir. AWS'in paylaşımlı sorumluluk modeline göre, cloudun güvenliği AWS'e, cloudun içindeki verinin güvenliği size aittir.

**Day 0 (Zero-Day)** Ne Demek?
Yazılım dünyasında bir projenin ömrünü günlere ayırırlar:

Day 2: Sistemin bakımı ve işletilmesi (Gelecek zaman).

Day 1: Sistemin kurulup canlıya alınması (Şu an).

Day 0: Sistemin daha planlandığı, temellerinin atıldığı an (Başlangıç).

AWS şunu demek ister: "Güvenlik, sistem kurulduktan sonra eklenecek bir özellik değildir. Daha ilk satır kodu yazmadan, sunucuyu açmadan (yani 0. günde) planlanması gereken en temel unsurdur."

---

### 1. AWS IAM (Identity and Access Management)

**IAM**, AWS kaynaklarına kimin erişebileceğini ve neleri yapabileceğini yönettiğiniz merkezi servistir.

* **Users:** Gerçek kişiler (Örn: `test-user-01`).
* **Groups:** Aynı yetkilere sahip kullanıcı kümeleri (Örn: `admin-group`).
* **Roles:** Kullanıcılara değil, kaynaklara verilen geçici yetkilerdir. (Örn: Bir **EC2** sunucusunun **S3**'e dosya yükleyebilmesi için bir Role alması gerekir).
* **Policies:** Yetkileri tanımlayan **JSON** dökümanlarıdır.

---

### 2. Least Privilege Principle (En Az Yetki İlkesi)

Güvenliğin altın kuralıdır: Bir kullanıcıya veya servise sadece işini yapması için gereken **minimum** yetkiyi verin.

* **Hatalı:** Herkese `AdministratorAccess` vermek.
* **Doğru:** Sadece okuma yapacak kişiye `ReadOnlyAccess` vermek.

---

### 3. AWS Artifact ve AWS Shield

* **AWS Artifact:** AWS'in güvenlik sertifikalarına (ISO, PCI, SOC) ulaştığınız yerdir. Denetçilere sunacağınız belgeleri buradan indirirsiniz.
* **AWS Shield:** DDoS saldırılarına karşı koruma sağlar. Tüm AWS müşterileri için **Standard** seviyesi ücretsizdir.

---

### 4. AWS KMS ve CloudHSM

Verilerinizi şifrelemek için anahtar yönetimi servisleridir.

* **KMS (Key Management Service):** Şifreleme anahtarlarını AWS yönetir. Çok kolay kullanılır.
* **CloudHSM:** Donanımsal güvenlik modülüdür. Anahtarlar üzerinde tam kontrol isterseniz ve yüksek regülasyon altındaysanız kullanılır.

---

### 5. Örnek Bir IAM Policy (JSON)

Bir kullanıcının sadece `deneme-bucket` isimli klasörü listelemesine izin veren basit bir kural:

```json
{
    "Version": "2026-02-13",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::deneme-bucket"
        }
    ]
}

```

---

<details>
<summary>SORU: Root User (Kök Kullanıcı) ile günlük işler yapılmalı mı?</summary>
<div class="answer-content">

**Kesinlikle hayır!** AWS hesabını açtığınız e-posta adresi (Root User) sınırsız yetkiye sahiptir. Hesabı açtıktan sonra ilk iş bir IAM kullanıcısı oluşturup Root hesabını MFA (Çok Faktörlü Kimlik Doğrulama) ile kilitlemeli ve sadece acil durumlarda kullanmalısınız.

</div>
</details>