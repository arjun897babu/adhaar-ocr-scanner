# Aadhaar OCR Scanner

AadhaarScan simplifies data extraction from your Aadhaar card.Just upload the front and back images, and our app
uses OCR technology to accurately capture and generate key data from your Aadhaar card in seconds build with 
**MERN**- [Tesseract.js](https://tesseract.projectnaptha.com/)

### Live Link : [https://adhaar-ocr-frontend.vercel.app/](https://adhaar-ocr-frontend.vercel.app/)

### Prerequisites

- Node.js (v20.12.2)

### Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/arjun897babu/adhaar-ocr-scanner.git
   ```

2. **Environment Configuration**

   Create a `.env` file in the /back-end directory 

   ```env
   port=3001
   origin=http://localhost:3000
   host=localhost
   ```

   Create a `.env` file in the /front-end directory 

   ```env
   VITE_API_URI=http://localhost:3001
   ```

3. **Setup Backend**  

   ```bash
   cd .\back-end\

   npm install

   npm run dev
   ```



5. **Setup Frontend**
   ```bash
   cd .\front-end\

   npm install

   npm run dev
   ```

##  Contributing


1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##
