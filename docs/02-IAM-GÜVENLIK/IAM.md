# Bölüm 02: IAM (Identity and Access Management)

**IAM**, AWS üzerindeki kaynaklarınıza kimlerin erişebileceğini ve bu kişilerin neler yapabileceğini kontrol eden "nizamiye" merkezidir. **Cloud** dünyasında her şey güvenlik ile başlar.

---

### 1. Root User: Büyük Güç, Büyük Sorumluluk

AWS hesabı oluşturduğunuz e-posta adresi **Root User**'dır.
* **Yetkisi:** Sınırsızdır. Faturayı öder, hesabı kapatır, her şeyi siler.
* **Tehlikesi:** Şifresi çalınırsa tüm şirketiniz (veya projeniz) yok olabilir.
* **Profesyonel Yaklaşım:** Root kullanıcısını sadece hesabı kurarken kullanın. Hemen bir **MFA** (Multi-Factor Authentication) ekleyin ve şifresini bir kasaya kilitleyip günlük işler için **IAM User** oluşturun.

---

### 2. IAM’in 4 Ana Bileşeni (Derin Bakış)

Bir Cloud mimarı, bu dört yapıyı birbirinden ayırabilmelidir:

#### A. Users (Kullanıcılar)
AWS sistemine giriş yapacak gerçek kişilerdir. Her birinin kendine ait kullanıcı adı, şifresi veya **Access Key**'leri vardır.
> **Not:** Bir kişiye asla başkasının şifresini vermeyin. Herkesin kendi IAM User'ı olmalı.

#### B. Groups (Gruplar)
Kullanıcıları mantıksal olarak topladığımız yerdir.
* **Neden Kullanılır?** Şirkete 50 tane yeni yazılımcı geldiğini düşünün. Hepsine tek tek yetki vermek yerine, bir "Developers" grubu oluşturup yetkiyi gruba verirsiniz. Kullanıcıları gruba eklediğiniz an otomatik olarak yetkilenirler.

#### C. Policies (Politikalar) - "İzin Belgeleri"
Yetkilerin tanımlandığı **JSON** formatındaki belgelerdir. IAM'in beynidir.
* **Örnek:** "Sadece S3'teki resimleri okuyabilir ama silemez."
* **Mantık:** Açıkça "İzin Ver" (Allow) denilmeyen her şey "Yasak" (Deny) kabul edilir.



#### D. Roles (Roller) - "Geçici Kimlikler"
IAM'in en karıştırılan ama en güçlü kısmıdır. Roller kişiler için değil, **servisler** veya **uygulamalar** içindir.
* **Senaryo:** Bir EC2 sunucunuz var ve S3'e dosya yüklemesi gerekiyor. Sunucunun içine kullanıcı adı/şifre yazamazsınız (Güvenlik riski!). Bunun yerine bir **Role** oluşturur ve sunucuya bu rolü takarsınız. Sunucu, sanki o yetkiye sahipmiş gibi geçici olarak işlem yapar.



---

### 3. IAM’in Altın Kuralları (Best Practices)

Bir öğrenci bu kuralları bilmeden AWS hesabı yönetmemelidir:

1. **Least Privilege (En Az Yetki):** Bir stajyere tüm veritabanını silme yetkisi vermeyin. Sadece ihtiyacı olanı verin.
2. **MFA Zorunluluğu:** Sadece Root için değil, tüm önemli IAM kullanıcıları için iki aşamalı doğrulamayı (Google Authenticator vb.) zorunlu tutun.
3. **Access Key Yönetimi:** Kodunuzun içine (özellikle GitHub'a) asla **Access Key ID** ve **Secret Access Key** yazmayın! Bunlar çalınırsa saniyeler içinde binlerce dolarlık sunucu açılıp faturanız patlatılabilir.
4. **Password Policy:** Karmaşık şifreleri ve periyodik şifre değişimini zorunlu kılın.

---

### 4. IAM Policy Nasıl Okunur? (Teknik Detay)

Bir Policy dosyasına baktığınızda 3 ana bölümü görmelisiniz:
* **Effect:** İzin mi veriliyor (Allow), yoksa yasaklanıyor mu (Deny)?
* **Action:** Hangi işlem yapılıyor? (Örn: `s3:ListBucket`)
* **Resource:** Bu işlem hangi kaynak üzerinde yapılıyor? (Örn: `arn:aws:s3:::benim-ozel-verilerim`)

---

<details>
<summary>SENARYO: Bir çalışan işten ayrıldı. Ne yapmalısınız?</summary>
<div class="answer-content">

1. IAM User hesabını hemen pasif hale getirin veya silin.
2. Oluşturduğu **Access Key**'leri iptal edin.
3. Eğer özel bir **Role** kullanıyorsa, o rolün güvenliğini gözden geçirin.

</div>
</details>