# Sinh nhật Hạ Vy — mã nguồn và tài nguyên

Gói này được tạo lại từ source WebDev mới nhất. Thư mục gốc có `index.html` để tải lên hosting tĩnh; `src/` chứa CSS/JavaScript; `assets/` chứa ảnh, MP3, biểu tượng iOS và biểu tượng bánh. `thiep-sinh-nhat-ha-vy.html` là bản HTML đơn đã gộp CSS/JavaScript (vẫn cần giữ thư mục `assets/` cạnh file).

## Tính năng

- Màn hình đếm 3–2–1 rồi mở thiệp sinh nhật nền đen tím.
- Bánh kem 3D bằng hạt sáng tự xoay; kéo/vuốt để xoay bánh.
- Những lời chúc thật lấy từ Supabase bay quanh bánh; bấm thẻ để đọc lời nhắn đầy đủ. Khi chưa có dữ liệu, hiện nút gửi lời chúc đầu tiên, không tạo nội dung giả.
- Nhạc thử tự phát khi mở thiệp; một số trình duyệt chặn autoplay cho đến khi có thao tác.
- PWA trên website Manus dùng manifest nền tảng; có biểu tượng Apple Touch cho iOS. Android: Chrome → ⋮ → Cài đặt ứng dụng/Thêm vào màn hình chính. iPhone/iPad: Safari → Chia sẻ → Thêm vào Màn hình chính.

## Chạy thử

Chạy `CHAY-THU-LINUX-MAC.sh` hoặc `CHAY-THU-WINDOWS.bat`, rồi mở `http://localhost:8000`. Để chạy trên hosting, tải lên toàn bộ thư mục, không chỉ riêng `index.html`.

## Supabase

Trang dùng `birthday_wishes` với Project URL và publishable key đã được cấu hình trong `src/js/app.js`. Publishable key được thiết kế để dùng ở trình duyệt; không bao giờ thay bằng `service_role`. Nếu khởi tạo một Supabase project khác, chạy `database/supabase-loi-chuc.sql` trong SQL Editor.

Supabase đang dùng cho thiệp hiện không có bản ghi lời chúc cũ (danh sách đã trống khi kiểm tra). Archive chỉ chứa source, tài nguyên và SQL mẫu, **không chứa dữ liệu lời chúc cá nhân**. `database/xoa-loi-chuc-cu.sql` có lệnh TRUNCATE xóa vĩnh viễn toàn bộ lời chúc; chỉ chạy khi chủ động muốn xóa sạch lần nữa.

Website đang dùng cùng URL cố định: https://birthdayhy-dgtj74ae.manus.space
