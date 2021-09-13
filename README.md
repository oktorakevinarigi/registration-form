# Registration Form

Registration form aplikasi sederhana untuk input data diri.

## Installation
Sebelum dijalankan install depedency dengan perintah:


```bash
yarn
```
or
```bash
npm install
```

## Running
Menjalankan aplikasi dapat dilakukan dengan perintah:

```bash
yarn start
```

## Component or Package Used
Aplikasi ini menggunakan beberapa library utama seperti ANTD untuk base dari component input dan validasi yang digunakan. Mbox State Tree salah satu state management yang digunakan untuk proses penyimpanan data sementara atau sebagai jembatan untuk komunikasi api dan beberapa package tambahan seperti sweetalert, apisauce, dan yang lainnya.

## Description Code

Struktur folder dari aplikasi ini terdiri dari:

Sorce code yang ada dalam aplikasi ini disimpan dalam folder src. Dalam folder src terdapat beberapa folder yang dibagi berdasarkan funsingya.

1. Component -- semua komponent yang dapat digunakan kembali atau reusable, bisa dibuat dalam folder component
2. Models -- Berisi definisi state awal untuk state management dari mobx
3. Pages -- Semua yang berkaitan page didaftarkan dalam folder ini
4. Services -- Bersisi file yang berhubungan dengan api atau proses dalam komunikasi data keluar masuk
5. Utils -- Berisi function global yang sering digunakan

