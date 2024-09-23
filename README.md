# Flight App

## Teknoloji Seti

Bu projede MERN (MongoDB, Express.js, React.js, Node.js) teknoloji seti kullanılarak Amsterdam Schipol Havalimanı'nın API'sinden alınan veriler kullanılarak uçuşlar listelenmektedir.
Responsive arayüzü oluştururken Tailwind, Day.JS, React Icons, React Toast kullanıldı.
Dış kaynak JSON dosyaları ile havaalanı isimleri ve hava yolu şirketi isimleri alındı.

##  Açıklama
Web sayfamızda kullanıcılar tarih, kalkış yeri ve varış yeri seçerek API'den aldığımız uçuşları filtreleyebilir.Daha sonrasında detaylara bakıp uçuşu rezerve edebilir. Uçuşlarım sayfasında uçuşlarını yine tarihe, aktarmasına ve uçuş saatine göre filtreleyebilir. Detaylarını görebilir, uçuşu silebilir.


##  Kullanım

Uçuşların tümüne console üzerinden ulaşabilirsiniz.
Örnek olarak bazı uçuşları bırakıyorum :

- 23/09/2024
AMS - PMI / AMS - FAO / AMS - CFU / LCA - AMS / OPO - AMS 

- 08/18/2024
AMS - SCH / AMS - OPO / AMS - RHO / AMS - OPO / AMS - LCA 


## Ekran Görüntüleri


![Main Page](https://r.resimlink.com/ydlJSN.png)
![Date Select](https://r.resimlink.com/eEFSCxXNb.png)
![Main Details](https://r.resimlink.com/qjCYhp.png)
![Flight Details](https://r.resimlink.com/6myHdIkwo.png)
![Flight Page](https://r.resimlink.com/QagTz103NF.png)
![Flight Details3](https://r.resimlink.com/iQGkZMjU8dpf.png)
![Flight Details4](https://r.resimlink.com/pSzfO-k_.png)


##  Proje Kurulumu ve Çalıştırma

1. **Projeyi İndirme:**
   - Repositoriyi bilgisayarınıza klonlayın:
     ```bash
     git clone https://github.com/kullanici-adiniz/flightapp.git
     ```
   - Proje dizinine girin:
     ```bash
     cd flightapp
     ```

2. **Frontend ve Server Kurulumu:**
   - `frontend` dizinine gidin:
     ```bash
     cd frontend
     ```
   - Gerekli bağımlılıkları yükleyin:
     ```bash
     npm install
     ```
   - `server` dizinine gidin:
     ```bash
     cd ../server
     ```
   - Gerekli bağımlılıkları yükleyin:
     ```bash
     npm install
     ```

3. **Uygulamayı Başlatma:**
   - **Frontend** uygulamasını başlatın:
     ```bash
     cd frontend
     npm start
     ```
     Bu komut, React uygulamanızı geliştirme modunda başlatır ve [http://localhost:3000](http://localhost:3000) adresinde çalışır.

   - **Server** uygulamasını başlatın:
     ```bash
     cd ../server
     node --watch server.js
     ```
     Bu komutla, Node.js uygulamanızı başlatıp değişiklikleri otomatik yapar [http://localhost:4000](http://localhost:4000) portunda çalışır.

---

