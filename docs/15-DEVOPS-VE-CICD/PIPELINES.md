# Bölüm 15: DevOps, CI/CD ve Modern Operasyonlar

AWS dünyasında artık manuel kod yükleme devri bitti. Yazılımcı kodunu gönderdiği an, sistemin bunu otomatik olarak test edip canlıya alması (CI/CD) ve sistemin içindeki en ufak hatayı bile anında görmemiz (Observability) gerekiyor.

---

### 1. CI/CD Boru Hattı (The Deployment Pipeline)

AWS, yazılımın mutfaktan masaya (canlıya) gidiş sürecini şu servislerle yönetir:

* **AWS CodeCommit:** Güvenli ve ölçeklenebilir bir **Git** servisidir. Kodların saklandığı yerdir (AWS'in GitHub'ı).
* **AWS CodeBuild:** Kodunuzu derler (compile), testlerinizi çalıştırır ve yayına hazır paketler oluşturur.
* **AWS CodeDeploy:** Hazır olan paketi EC2, Lambda veya ECS gibi servislere otomatik olarak yükler.
* **AWS CodePipeline:** Tüm bu adımları (Source -> Build -> Deploy) birbirine bağlayan ana otomasyon sistemidir.

---

### 2. Dağıtım Stratejileri (Deployment Strategies)

Hatalı bir kodu canlıya aldığımızda kullanıcıların bunu fark etmemesi için şu yöntemler kullanılır:

* **In-Place:** Mevcut sunucudaki eski kodu siler, yenisini yükler. Kısa bir kesinti yaşanabilir.
* **Blue/Green:** Mevcut sistem (Blue) çalışırken, yanına yeni sürümün yüklü olduğu bir sistem (Green) kurulur. Her şey sağlamsa trafik yeni sisteme yönlendirilir. Hata varsa saniyeler içinde eskiye dönülür.
* **Canary Deployment:** Yeni sürüm önce kullanıcıların sadece %10'una açılır. Sorun yoksa kademeli olarak herkese yayılır.

---

### 3. Gözlemlenebilirlik (Observability vs. Monitoring)

Sadece "sistem açık mı?" diye bakmak (Monitoring) yetmez. İçeride ne olduğunu anlamalıyız (Observability):

* **AWS X-Ray:** Bir kullanıcının isteği sistemde neden yavaşladı? Hangi servis hata verdi? X-Ray bu isteğin tüm yolculuğunu bir film şeridi gibi haritalandırır (Tracing).
* **CloudWatch Synthetics:** Sitenize 7/24 gerçek bir kullanıcıymış gibi otomatik tıklayan botlar (Canaries) gönderir. Site çökmeden veya yavaşlamadan önce size haber verir.

---

### 4. Felaket Kurtarma (Disaster Recovery - DR)

Hocanın istediği o kritik "Multi-Region" ve yedekleme stratejileri:

* **RTO (Recovery Time Objective):** Bir felaket anında sistemin ne kadar sürede ayağa kalkması gerekiyor? (Zaman hedefi).
* **RPO (Recovery Point Objective):** En fazla ne kadarlık veri kaybını (saat/dakika) göze alabiliriz? (Veri hedefi).
* **Backup & Restore:** En ucuz yöntemdir. Verileri yedeklersiniz, felaket anında yeni sistem kurup yedekleri yüklersiniz.
* **Multi-Region (Active-Active):** Uygulamanız aynı anda iki farklı ülkede (örn: Frankfurt ve İrlanda) çalışır. Biri tamamen kapansa bile kullanıcılar hiçbir şey fark etmez.

* **RTO (Recovery Time Objective):** Bir felaket anında sistemin ne kadar sürede ayağa kalkması gerekiyor? (Zaman hedefi).
* **RPO (Recovery Point Objective):** En fazla ne kadarlık veri kaybını (saat/dakika) göze alabiliriz? (Veri hedefi).
* **Backup & Restore:** En ucuz yöntemdir. Verileri yedeklersiniz, felaket anında yeni sistem kurup yedekleri yüklersiniz.
* **Multi-Region (Active-Active):** Uygulamanız aynı anda iki farklı ülkede (örn: Frankfurt ve İrlanda) çalışır. Biri tamamen kapansa bile kullanıcılar hiçbir şey fark etmez.

---

### 5. Örnek CI/CD Yapılandırması (CodeBuild - buildspec.yml)

Aşağıdaki dosya, AWS CodeBuild'e kodun nasıl test edileceğini söyler:

```yaml
version: 0.2

phases:
  install:
    commands:
      - echo Installing dependencies...
      - npm install
  pre_build:
    commands:
      - echo Running unit tests...
      - npm test
  build:
    commands:
      - echo Building the application...
      - npm run build
artifacts:
  files:
    - '**/*'

```

---

<details>
<summary>SORU: Neden CloudWatch varken X-Ray kullanmalıyız?</summary>
<div class="answer-content">

**CloudWatch** size işlemcinin % kaç kullanıldığını (sayılar) ve uygulama hatalarını (loglar) söyler. **X-Ray** ise bir isteğin mikroservisler arasındaki yolculuğunu gösterir. Eğer 5 farklı servis birbirine bağlıysa ve biri yavaşsa, suçlunun kim olduğunu ancak X-Ray ile bulabilirsiniz.

</div>
</details>