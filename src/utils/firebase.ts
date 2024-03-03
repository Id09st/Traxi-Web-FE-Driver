// Nhập các hàm cần thiết từ gói Firebase
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: 'AIzaSyB7V_C6oPK--6uLb9ZcSVmHnwLnAkWFvOU',
  authDomain: 'traxisystem-9caad.firebaseapp.com',
  databaseURL: 'https://traxisystem-9caad-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'traxisystem-9caad',
  storageBucket: 'traxisystem-9caad.appspot.com',
  messagingSenderId: '880838381384',
  appId: '1:880838381384:web:df97c162a7918daf11ed7d',
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Lấy tham chiếu đến cơ sở dữ liệu
const database = getDatabase(app);

export { database };
