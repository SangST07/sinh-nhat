# Sinh nhật Hạ Vy — source và tài nguyên

Gói này được đồng bộ từ checkpoint responsive mới nhất. `index.html` là trang gốc; `src/` chứa CSS/JavaScript; `assets/` chứa ảnh, nhạc và biểu tượng; `thiep-sinh-nhat-ha-vy.html` là bản HTML đơn đã gộp CSS/JavaScript (vẫn cần giữ thư mục `assets/` cạnh file).

## Tỉ lệ màn hình

- Desktop: khung thiệp 16:9.
- iPhone và Android dọc: dùng toàn bộ chiều cao hiển thị, có khoảng đệm cho notch và thanh home.
- Điện thoại ngang: dùng khung nhìn ngang, thu nhỏ bánh để không cắt đế.
- iPad dọc: khung gần 3:4; iPad ngang: tận dụng toàn bộ khung gần 4:3.

## Tính năng

- Đếm ngược 3–2–1 rồi tự mở thiệp.
- Bánh kem hạt sáng 3D tự xoay và có thể kéo/vuốt để xoay góc.
- Lời chúc thật từ Supabase bay quanh bánh; bấm thẻ để đọc đầy đủ. Khi chưa có lời chúc, hiện nút gửi lời chúc đầu tiên, không hiển thị nội dung giả.
- Nhạc sinh nhật thử tự phát khi thiệp mở; trình duyệt có thể chặn autoplay cho đến khi khách chạm màn hình.
- Trên website Manus HTTPS, manifest PWA do nền tảng cung cấp. Android: Chrome → ⋮ → Cài đặt ứng dụng/Thêm vào màn hình chính. iPhone/iPad: Safari → Chia sẻ → Thêm vào Màn hình chính.

## Chạy thử

Chạy `CHAY-THU-LINUX-MAC.sh` hoặc `CHAY-THU-WINDOWS.bat`, rồi mở `http://localhost:8000`. Khi đưa lên hosting, tải lên toàn bộ thư mục để các tài nguyên tương đối hoạt động.

## Supabase và dữ liệu

`src/js/app.js` đã cấu hình Project URL và publishable key dùng ở trình duyệt; tuyệt đối không thay bằng `service_role`. Nếu khởi tạo project Supabase khác, chạy `database/supabase-loi-chuc.sql` trong SQL Editor.

Supabase của thiệp đang dùng hiện không có bản ghi lời chúc cũ (danh sách trống khi kiểm tra gần nhất). Archive chỉ có source/tài nguyên/SQL mẫu, không chứa tin nhắn cá nhân. `database/xoa-loi-chuc-cu.sql` có lệnh TRUNCATE xóa vĩnh viễn tất cả lời chúc; chỉ chạy khi chủ động muốn xóa sạch lần nữa.

Website: https://birthdayhy-dgtj74ae.manus.space
