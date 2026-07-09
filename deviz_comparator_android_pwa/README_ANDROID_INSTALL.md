# Deviz Comparator Mobil - Android installer PWA

Acest pachet este o aplicație web progresivă (PWA) pregătită pentru instalare pe Android din Chrome / Edge.

## Instalare rapidă pe Android

1. Încarcă conținutul folderului pe un hosting HTTPS, de exemplu Netlify, Vercel, GitHub Pages sau serverul tău.
2. Deschide URL-ul pe telefonul Android în Chrome.
3. Apasă butonul **Instalează aplicația pe Android** sau meniul Chrome > **Add to Home screen / Install app**.
4. Aplicația se va instala ca aplicație standalone și va funcționa offline după prima încărcare.

## Ce include

- Dashboard deviz estimat vs preț real.
- Notificări pentru depășiri de buget.
- Notificări pentru modificări de preț.
- Istoric modificări preț.
- Export CSV.
- Salvare locală în telefon prin localStorage.
- Service worker pentru funcționare offline.

## APK nativ

Pentru APK semnat, acest PWA poate fi convertit cu PWABuilder sau Bubblewrap după publicarea pe HTTPS.
Recomandare: publică PWA-ul, apoi folosește https://www.pwabuilder.com/ pentru generarea pachetului Android.

## Observații

- Android cere HTTPS pentru instalarea completă PWA.
- Notificările browser cer permisiunea utilizatorului.
- Datele sunt locale pe dispozitiv; pentru sincronizare multi-device trebuie backend sau conectare la SharePoint/Excel.
