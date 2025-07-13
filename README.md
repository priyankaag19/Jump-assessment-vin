# Jump-assessment-vin
**VIN Lookup App**

### 📁 Folder Structure:

```
vin-lookup/
├── node_modules/
├── vin-lookup-react/         ← React + Vite + MUI frontend
├── package.json              ← For Node.js backend
├── package-lock.json
├── server.js                 ← Node.js + Express backend
└── README.md                 ← ✅ You're here!
```

---

## 🚗 VIN Lookup App (Node.js + React + MySQL)

This is a full-stack application to look up vehicle details from a VIN number using the [NHTSA VIN Decoder API](https://vpic.nhtsa.dot.gov/api/). It allows:

* Entering a VIN number in a web form
* Fetching Make/Model/Year using the API
* Storing it in a MySQL database
* Displaying lookup history in a Material UI table

---

## 🛠️ Tech Stack

| Layer    | Stack                                                                                 |
| -------- | ------------------------------------------------------------------------------------- |
| Frontend | React + Vite + MUI                                                                    |
| Backend  | Node.js + Express                                                                     |
| Database | MySQL 8.0                                                                             |
| API      | [NHTSA VIN Decoder](https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesExtended/) |

---

## 📦 Backend Setup (Node.js + Express)

### 1. Go to root folder

```bash
cd vin-lookup
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create MySQL database

Log into MySQL:

```bash
mysql -u root -p
```

Then run:

```sql
CREATE DATABASE vin_lookup;

USE vin_lookup;

CREATE TABLE vin_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vin VARCHAR(20),
  make VARCHAR(255),
  model VARCHAR(255),
  year INT
);
```

### 4. Update MySQL config (if needed)

In `server.js`:

```js
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // 👈 Add your MySQL password here
  database: 'vin_lookup'
});
```

### 5. Start the backend server

```bash
node server.js
```

Server runs at:
👉 `http://localhost:3000`

---

## 💻 Frontend Setup (React + Vite + MUI)

### 1. Go to frontend folder

```bash
cd vin-lookup-react
```

### 2. Install dependencies

```bash
npm install
```

### 3. Vite Proxy Setup (already done)

In `vite.config.js`:

```js
server: {
  proxy: {
    '/lookup': 'http://localhost:3000',
    '/history': 'http://localhost:3000'
  }
}
```

This forwards frontend API calls to your backend.

### 4. Start frontend server

```bash
npm run dev
```

Open in browser:
👉 `http://localhost:5173`

---

## 🔍 Test VINs

Try these VINs in the input box:

* `JTEBU5JR6C5089356`
* `JF1SF65681G740613`

They will fetch vehicle details and store them in your MySQL table.

---

## 📌 Features

* ✅ VIN form with validation
* ✅ Real-time lookup via NHTSA API
* ✅ MySQL storage and history
* ✅ Material UI layout and styling

---

## 🧪 Sample API Used

```
GET https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesExtended/{VIN}?format=json
```

Example:

```bash
https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVINValuesExtended/JTEBU5JR6C5089356?format=json
```

---

