---

# **Document Management System (DMS)**

The **Document Management System (DMS)** is a robust API-based system designed to manage folders and files efficiently. Users can create folders, set restrictions (like file type and maximum file limit), upload files with metadata, and perform CRUD operations on files and folders. The system uses **Cloudinary** for file storage, **Supabase PostgreSQL** for the database, and **Multer** for handling file uploads.

---

## **Features**
- **Folder Management**:
  - Create, update, and delete folders.
  - Set folder-specific restrictions (file type and maximum file limit).
- **File Management**:
  - Upload files with metadata (name, description, type, size).
  - Update file descriptions.
  - Delete files.
- **Advanced File Operations**:
  - Sort files by size or upload date.
  - Retrieve files by type across folders.
  - Get file metadata.
- **Cloud Storage**:
  - Files are stored securely in **Cloudinary**.
- **Database**:
  - Uses **Supabase PostgreSQL** for storing folder and file information.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: Supabase PostgreSQL
- **ORM**: Sequelize
- **File Storage**: Cloudinary
- **File Upload**: Multer
- **Environment Management**: Dotenv
- **API Testing**: Postman

---

## **Getting Started**

### **Prerequisites**
- Node.js (v16 or higher)
- npm (Node Package Manager)
- Supabase PostgreSQL database
- Cloudinary account (for file storage)
- Postman or any API testing tool

---

### **Setup Instructions**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/KarunasriG/DMS.git
   cd DMS
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   DATABASE_URL=your_supabase_postgres_url
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Database Setup**:
   - Run the Sequelize migrations to create the database tables:
     ```bash
     npx sequelize-cli db:migrate
     ```

5. **Start the Server**:
   ```bash
   npm start
   ```
   The server will start at `http://localhost:3000`.

---

## **API Endpoints**

### **Folder Endpoints**
| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/folder/create`      | Create a new folder.                 |
| PUT    | `/api/folders/:folderId`  | Update folder name or max file limit.|
| DELETE | `/api/folders/:folderId`  | Delete a folder and its files.       |
| GET    | `/api/folders/:folderId`  | Get details of a specific folder.    |
| GET    | `/api/folders`            | Get all folders.                     |

### **File Endpoints**
| Method | Endpoint                              | Description                          |
|--------|---------------------------------------|--------------------------------------|
| POST   | `/api/folders/:folderId/files`        | Upload a file to a folder.           |
| PUT    | `/api/folders/:folderId/files/:fileId`| Update file description.             |
| DELETE | `/api/folders/:folderId/files/:fileId`| Delete a file.                       |
| GET    | `/api/folders/:folderId/files`        | Get all files in a folder.           |
| GET    | `/api/folders/:folderId/filesBySort`  | Sort files by size or upload date.   |
| GET    | `/api/files`                          | Get files by type across folders.    |
| GET    | `/api/folders/:folderId/files/metadata`| Get file metadata.                  |

---

## **Example Requests**

### **Create a Folder**
```bash
POST /api/folder/create
Content-Type: application/json

{
  "name": "Project Docs",
  "type": "pdf",
  "maxFileLimit": 10
}
```

### **Upload a File**
```bash
POST /api/folders/:folderId/files
Content-Type: multipart/form-data

{
  "file": "file_to_upload.pdf",
  "description": "Project Proposal"
}
```

### **Sort Files by Size**
```bash
GET /api/folders/:folderId/filesBySort?sort=size
```
## **API Response examples**

For detailed API response examples, refer to the [Google Doc](https://docs.google.com/document/d/19zYRPzV9o1A3KQj0ks32lYOm8V2N06qr61yqIpQ47QU/edit?usp=sharing).

---

## **Contributing**
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- Thanks to **Cloudinary** for providing file storage.
- Thanks to **Supabase** for the PostgreSQL database.
- Inspired by modern document management systems.

---
