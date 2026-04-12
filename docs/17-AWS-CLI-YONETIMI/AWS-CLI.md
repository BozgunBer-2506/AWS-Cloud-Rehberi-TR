# Bölüm 17: AWS CLI ile Cloud Yönetimi

**AWS CLI (Command Line Interface)**, AWS kaynaklarını terminal üzerinden yönetmenizi sağlayan resmi araçtır. AWS Console'da fare ile yaptığınız her işlemi tek bir komutla yapabilir, scriptlere gömebilir ve pipeline'lara entegre edebilirsiniz. Gerçek bir Cloud Engineer'ın en çok kullandığı araçlardan biridir.

---

### 1. Kurulum

AWS CLI, birden fazla yöntemle kurulabilir.

**pip ile (Python kuruluysa):**

```bash
pip install awscli
aws --version

```

**Resmi installer ile (önerilen):**

```bash
# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

```

---

### 2. Kimlik Doğrulama – `aws configure`

AWS CLI'ın sizin adınıza işlem yapabilmesi için IAM erişim anahtarlarınızı tanıtmanız gerekir. Bu bilgileri **AWS Console → IAM → Kullanıcı → Güvenlik Bilgileri** bölümünden alırsınız.

```bash
aws configure

```

```text
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: eu-central-1
Default output format [None]: json

```

Bu bilgiler `~/.aws/credentials` dosyasına kaydedilir. Birden fazla hesap yönetmek için **named profile** kullanılır:

```bash
aws configure --profile production
aws s3 ls --profile production

```

> **Güvenlik Notu:** `~/.aws/credentials` dosyasını asla GitHub'a yüklemeyin. `.gitignore` dosyanıza ekleyin.

---

### 3. S3 – Temel Komutlar

S3 (Simple Storage Service), AWS'nin nesne depolama hizmetidir.

**Bucket Oluşturma:**

```bash
aws s3 mb s3://sirket-yedek-bucket --region eu-central-1

```

**Dosya Yükleme:**

```bash
aws s3 cp rapor.pdf s3://sirket-yedek-bucket/

```

**Bucket İçeriğini Listeleme:**

```bash
aws s3 ls s3://sirket-yedek-bucket/

```

**Dosya İndirme:**

```bash
aws s3 cp s3://sirket-yedek-bucket/rapor.pdf ./indirilenler/

```

**Klasörü Tümüyle Senkronize Etme:**

```bash
aws s3 sync ./yerel-klasor/ s3://sirket-yedek-bucket/yedek/ --delete

```

`--delete` parametresi: Hedefte olup kaynakta olmayan dosyaları siler (gerçek senkronizasyon).

---

### 4. EC2 – Sunucu Yönetimi

**Çalışan Sunucuları Listeleme (tablo formatında):**

```bash
aws ec2 describe-instances \
  --query "Reservations[*].Instances[*].[InstanceId,State.Name,PublicIpAddress,InstanceType]" \
  --output table

```

**Sunucu Başlatma:**

```bash
aws ec2 start-instances --instance-ids i-0abcd1234efgh5678

```

**Sunucu Durdurma:**

```bash
aws ec2 stop-instances --instance-ids i-0abcd1234efgh5678

```

**Yeni EC2 Başlatma (AMI'den):**

```bash
aws ec2 run-instances \
  --image-id ami-0abcdef1234567890 \
  --instance-type t2.micro \
  --key-name anahtar-cifti \
  --security-group-ids sg-12345678 \
  --count 1

```

---

### 5. IAM – Kullanıcı ve Yetki Yönetimi

**Kullanıcıları Listeleme:**

```bash
aws iam list-users --output table

```

**Yeni Kullanıcı Oluşturma:**

```bash
aws iam create-user --user-name yeni-kullanici

```

**Kullanıcıya Grup Ekleme:**

```bash
aws iam add-user-to-group --user-name yeni-kullanici --group-name Developers

```

**Kullanıcının Yetkilerini Görme:**

```bash
aws iam list-attached-user-policies --user-name yeni-kullanici

```

---

### 6. Çıktı Formatları ve `--query` Filtresi

AWS CLI varsayılan olarak JSON döndürür. Üç format vardır: `json`, `table`, `text`.

```bash
# Sadece instance ID ve durumunu getir
aws ec2 describe-instances \
  --query "Reservations[*].Instances[*].[InstanceId,State.Name]" \
  --output table

```

`--query` parametresi **JMESPath** sorgulama dilini kullanır. Büyük JSON çıktılarını filtrelemek için kritik öneme sahiptir.

---

### 7. Python ile AWS Otomasyonu – boto3

Scriptlere entegre etmek için AWS'nin resmi Python kütüphanesi **boto3** kullanılır. CLI komutlarının aksine, boto3 Python nesneleri döndürür — metin ayrıştırma gerekmez.

```bash
pip install boto3

```

**S3'e Dosya Yükleme:**

```python
import boto3

s3 = boto3.client("s3")

s3.upload_file(
    Filename="rapor.pdf",
    Bucket="sirket-yedek-bucket",
    Key="raporlar/rapor.pdf"
)

print("Dosya yüklendi.")

```

**EC2 Sunucu Listesi:**

```python
import boto3

ec2 = boto3.client("ec2", region_name="eu-central-1")

yanit = ec2.describe_instances()

for rezervasyon in yanit["Reservations"]:
    for instance in rezervasyon["Instances"]:
        print(instance["InstanceId"], "-", instance["State"]["Name"])

```

**Otomatik Yedekleme Scripti:**

```python
import boto3
import os
from datetime import datetime

BUCKET = "sirket-yedek-bucket"
KLASOR = "./yedeklenecek-klasor"

s3 = boto3.client("s3")
tarih = datetime.now().strftime("%Y-%m-%d")

for dosya_adi in os.listdir(KLASOR):
    tam_yol = os.path.join(KLASOR, dosya_adi)
    if os.path.isfile(tam_yol):
        s3_yolu = f"yedekler/{tarih}/{dosya_adi}"
        s3.upload_file(tam_yol, BUCKET, s3_yolu)
        print(f"Yüklendi: {dosya_adi} → s3://{BUCKET}/{s3_yolu}")

print("Yedekleme tamamlandı.")

```

---

### 8. CLI vs boto3 – Hangisini Kullanmalıyım?

| Durum | Tavsiye |
|---|---|
| Hızlı tek seferlik işlem | `aws` CLI komutu |
| Bash / shell scripti | `aws` CLI komutu |
| Python scripti, döngü, koşul | `boto3` |
| CI/CD pipeline, otomasyon | `boto3` |
| Karmaşık hata yönetimi | `boto3` |

---

### 9. Sık Kullanılan Komutlar – Hızlı Referans

```bash
# Hangi hesapla bağlısın?
aws sts get-caller-identity

# Tüm S3 bucket'larını listele
aws s3 ls

# Belirli bir region'daki EC2 listesi
aws ec2 describe-instances --region us-east-1 --output table

# CloudFormation stack'lerini listele
aws cloudformation list-stacks --output table

# Lambda fonksiyonlarını listele
aws lambda list-functions --output table

# Aktif profili kontrol et
aws configure list

```

---

### 10. Resmi Dokümantasyon

Tüm AWS CLI komutlarının tam listesi ve parametreleri için:

- [AWS CLI Komut Referansı](https://docs.aws.amazon.com/cli/latest/) – Tüm servisler ve komutlar
- [boto3 Dokümantasyonu](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html) – Python SDK referansı
