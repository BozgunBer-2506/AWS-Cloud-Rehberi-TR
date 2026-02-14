# Bölüm 16: AWS Cloud Rehberi – Pratik Bilgiler ve Geliştirici Taktikleri

Bu bölüm, AWS üzerinde çalışan geliştiricilerin sistemleri doğru yönetmesi, sorunları hızlı çözmesi ve profesyonel Cloud operasyonu yapabilmesi için hazırlanmıştır.

---

### 1. AWS CLI Ustalığı

AWS servislerini terminal üzerinden yönetmek için kullanılır.

**Aktif kullanıcı kontrolü:**
```bash
aws sts get-caller-identity
```

**S3 bucket listeleme:**
```bash
aws s3 ls
```

**EC2 instance listeleme:**
```bash
aws ec2 describe-instances
```

**Belirli profile kullanma:**
```bash
aws s3 ls --profile prod
```

---

### 2. IAM Güvenlik Prensipleri

* **ASLA root user kullanma**
* Her zaman IAM User kullan
* Her zaman IAM Role kullan
* Least Privilege prensibini uygula

Örnek policy:
```json
{
  "Effect": "Allow",
  "Action": "s3:ListBucket",
  "Resource": "*"
}
```

---

### 3. CloudWatch Log Debugging

Logları canlı izleme:
```bash
aws logs tail /aws/lambda/my-function --follow
```

---

### 4. EC2 Bağlantı Yönetimi

**Instance bağlanma:**
```bash
ssh ec2-user@IP-ADDRESS
```

**Durum kontrolü:**
```bash
aws ec2 describe-instance-status
```

---

### 5. S3 Dosya Yönetimi

**Dosya yükleme:**
```bash
aws s3 cp file.txt s3://bucket-name/
```

**Klasör senkronizasyonu:**
```bash
aws s3 sync . s3://bucket-name/
```

---

### 6. Lambda Debugging

**Log gruplarını listeleme:**
```bash
aws logs describe-log-groups
```

---

### 7. Network Sorun Giderme

Kontrol edilmesi gerekenler:

* Security Group inbound rules
* Security Group outbound rules
* Port 22 (SSH)
* Port 80 (HTTP)
* Port 443 (HTTPS)

---

### 8. Cost Kontrol

Aktif servisleri kontrol et:
```bash
aws ec2 describe-instances
aws rds describe-db-instances
```

Kullanılmayan servisleri kapat ve maliyeti azalt.

---

### 9. Infrastructure as Code

Cloud altyapısını kod ile yönet:
```bash
terraform init
terraform apply
```

---

### 10. AWS SDK Kullanımı (Python)
```python
import boto3

s3 = boto3.client("s3")
response = s3.list_buckets()
print(response)
```

---

## Cloud Profesyonelleri İçin Altın Kurallar

* ❌ Root user kullanma
* ✅ IAM kullan
* ✅ Logları kontrol et
* ✅ Automation kullan
* ✅ Infrastructure as Code kullan
* ✅ Maliyet izle

---

## Kendinizi Test Edin (Cevap icin soruya tiklayin)

<details>
<summary>Soru 1: AWS CLI ile hangi komutla şu anda kullanmakta olduğum AWS hesabını kontrol ederim?</summary>
<div class="answer-content">

```bash
aws sts get-caller-identity
```

Bu komut hesap ID'ni, kullanıcı ARN'sini ve kullanılan profili gösterir. İşlem öncesi her zaman çalıştır!

</div>
</details>

<details>
<summary>Soru 2: IAM güvenliği açısından root user kullanmamam gerekiyor mu?</summary>
<div class="answer-content">

KESINLIKLE HAYIR! Root user hiçbir zaman kullanılmamalıdır. Her zaman:
- IAM User oluştur
- Least Privilege (en az yetki) ver
- Multi-factor Authentication (MFA) kur

</div>
</details>

<details>
<summary>Soru 3: CloudWatch'ta Lambda fonksiyonumun loglarını canlı olarak nasıl izlerim?</summary>
<div class="answer-content">

```bash
aws logs tail /aws/lambda/my-function --follow
```

`--follow` parametresi logları gerçek zamanlı gösterir. Sorun giderme için harika!

</div>
</details>

<details>
<summary>Soru 4: EC2 instance'ıma SSH ile bağlandığımda "Connection timeout" hatası alıyorum. Neler kontrol etmeliyim?</summary>
<div class="answer-content">

Sırasıyla kontrol et:
1. Security Group inbound rules (Port 22 açık mı?)
2. Instance public IP var mı?
3. Key pair dosyası (.pem) doğru mu?
4. Network ACL kuralları doğru mu?

En sık sebep: Security Group port 22'yi engelliyordur!

</div>
</details>

<details>
<summary>Soru 5: 1000 dosyayı S3'e nasıl hızlı yüklerim?</summary>
<div class="answer-content">

```bash
aws s3 sync . s3://bucket-name/ --parallel 10
```

`--parallel 10` ile 10 dosyayı aynı anda yükle. Daha hızlı transferin için paralel yapmanın değeri çok!

</div>
</details>

<details>
<summary>Soru 6: Bir EC2 instance'ını silmeden önce çalıştığını nasıl kontrol ederim?</summary>
<div class="answer-content">

```bash
aws ec2 describe-instance-status
```

Bu komut tüm instance'ların durumunu gösterir. "running" yazıyorsa halen çalışıyor ve silmeden önce iyice düşün!

</div>
</details>

<details>
<summary>Soru 7: AWS maliyetlerimi kontrol etmek için hangi komutu çalıştırmalıyım?</summary>
<div class="answer-content">

Aktif servisleri listele:

```bash
aws ec2 describe-instances
aws rds describe-db-instances
```

Gereksiz çalışan instance'ları bul ve kapat. Kullanmadığın şey parayla ödüyor!

</div>
</details>

<details>
<summary>Soru 8: Production ve Development ortamlarında farklı AWS profilleri kullanmalı mıyım?</summary>
<div class="answer-content">

KESINLIKLE! Hiçbir zaman production hesabında Soru yapma. Her zaman:
- `dev` profili: Geliştirme için
- `prod` profili: Production için

```bash
aws s3 ls --profile prod
```

Doğru profili kullan, yoksa felaket!

</div>
</details>

<details>
<summary>Soru 9: Infrastructure as Code nedir ve neden önemlidir?</summary>
<div class="answer-content">

Altyapıyı elle kurma yerine kod ile kur (Terraform, CloudFormation). Avantajları:
- Tekrarlanabilir (aynı altyapı 100 kez kurabilirsin)
- Versiyon kontrol (git'te tutabilirsin)
- Hızlı deploy (saniyeler içinde)
- Hata az (manuel hata yok)
```bash
terraform init
terraform apply
```

</div>
</details>

<details>
<summary>Soru 10: Python ile AWS'i nasıl kontrol ederim?</summary>
<div class="answer-content">

boto3 kütüphanesini kullan:
```python
import boto3

s3 = boto3.client("s3")
buckets = s3.list_buckets()

for bucket in buckets['Buckets']:
    print(bucket['Name'])
```

Böyle AWS'i Python kodundan kontrolü altına alabilirsin!

</div>
</details>