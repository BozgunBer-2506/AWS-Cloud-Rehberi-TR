# Bölüm 07: Scalability (ELB ve Auto Scaling)

Cloud mimarisinin en büyük gücü, ihtiyaca göre şekil alabilmesidir. Tek bir sunucunun üzerine binlerce kullanıcı binerse o sunucu çöker. Bizim amacımız, yükü dağıtmak ve gerektiğinde sunucu sayısını otomatik artırmaktır.

---

### 1. Elastic Load Balancing (ELB) - Yük Dengeleyici

**ELB**, kapıdaki bir görevli gibidir. Gelen trafiği karşılar ve arkadaki sağlam sunuculara eşit şekilde dağıtır.

* **Health Checks (Sağlık Kontrolleri):** **ELB**, arkadaki sunucuların "hayatta" olup olmadığını sürekli kontrol eder. Eğer bir sunucu bozulursa, trafiği ona göndermeyi hemen keser.
* **High Availability:** Kullanıcılar tek bir IP/DNS adresine bağlanır, **ELB** trafiği farklı **AZ**'lerdeki sunuculara paylaştırır.

**Üç Ana ELB Tipi:**

1. **Application Load Balancer (ALB):** HTTP/HTTPS trafiği için kullanılır. Akıllıdır; gelen isteğin içeriğine göre (örn: `/api` veya `/mobil`) farklı sunuculara yönlendirme yapabilir.
2. **Network Load Balancer (NLB):** Çok yüksek hız ve TCP/UDP trafiği için kullanılır. Milyonlarca isteği çok düşük gecikme ile karşılar.
3. **Gateway Load Balancer (GWLB):** Üçüncü parti güvenlik cihazlarını (Firewall) yönetmek için kullanılır.

---

### 2. Auto Scaling Group (ASG) - Otomatik Ölçekleme

**ASG**, sunucu sayınızı trafiğe göre otomatik olarak yöneten sistemdir.

* **Scale Out (Genişleme):** Trafik arttığında (Örn: İşlemci kullanımı %70'i geçince) otomatik olarak yeni **EC2** sunucuları açar.
* **Scale In (Daralma):** Gece vakti trafik azaldığında fazla sunucuları kapatır. Böylece boşuna para ödemezsiniz.
* **Self-Healing:** Eğer bir sunucu çökerse, **ASG** bunu anlar, onu siler ve yerine hemen yenisini açar.

---

### 3. Vertical vs Horizontal Scaling (Dikey ve Yatay Ölçekleme)

Öğrencinin mülakatlarda en çok karşılaştığı fark budur:

* **Vertical Scaling (Dikey):** Mevcut sunucunun donanımını (CPU, RAM) yükseltmektir. (Örn: `t2.micro`'dan `t2.large`'a geçmek). Bir sınırı vardır ve sunucuyu kapatıp açmak gerekir.
* **Horizontal Scaling (Yatay):** Aynı sunucudan yanına bir tane daha, bir tane daha eklemektir. Sınırı yoktur ve sistem kapanmadan yapılır. **Cloud'un asıl gücü budur.**

---

### 4. Birlikte Nasıl Çalışırlar?

1. Kullanıcı **ELB** adresine gelir.
2. **ELB**, trafiği o an açık olan **EC2** sunucularına dağıtır.
3. Eğer trafik çok artarsa, **ASG** yeni sunucular açar.
4. Yeni açılan sunucular otomatik olarak **ELB**'ye tanıtılır ve yük onlara da gitmeye başlar.

---

<details>
<summary>SORU: Sunucum çöktüğünde verilerim kaybolur mu?</summary>
<div class="answer-content">

Eğer verilerinizi sunucunun içindeki diskte (**EBS**) tutuyorsanız ve **ASG** o sunucuyu silerse veriler gidebilir. Bu yüzden profesyonel mimaride "Stateless" (Durumsuz) uygulama yapılır; yani veriler sunucuda değil, merkezi bir veritabanında (**RDS**) veya **S3**'te saklanır.

</div>
</details>