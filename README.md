# Sinh nhật Hạ Vy — một thư mục gồm source và tài nguyên

`index.html` là trang chính; `src/` chứa CSS/JavaScript; `assets/` chứa ảnh, nhạc và biểu tượng; `thiep-sinh-nhat-ha-vy.html` là bản HTML đã gộp CSS/JavaScript (vẫn giữ `assets/` cùng thư mục).

## Tối ưu điện thoại

Không dùng plugin bên thứ ba để tránh tăng tải. Trang tự nhận diện điện thoại/cấu hình thấp, giảm khoảng 52% số hạt bánh (khoảng 5.800 xuống 2.800), giới hạn canvas ở DPR 1.2 và hoạt ảnh khoảng 30 FPS; giảm bụi nền, pháo giấy, blur và tránh vẽ khi tab bị ẩn. Trên máy khỏe/desktop giữ mức chi tiết cao hơn. Xoay bánh, mở quà và bấm lời chúc vẫn hoạt động.

## Tỉ lệ màn hình

- Desktop: 16:9.
- iPhone/Android dọc: toàn màn hình và tính safe-area.
- Điện thoại ngang: dùng trọn khung nhìn, thu bánh để tránh cắt đế.
- iPad dọc: gần 3:4; iPad ngang: gần 4:3.

## Tính năng

- Đếm ngược 3–2–1 rồi mở thiệp; bánh kem hạt sáng 3D tự xoay và có thể kéo/vuốt.
- Lời chúc Supabase bay quanh bánh, bấm thẻ để đọc; danh sách khách gửi được lưu chia sẻ.
- Nhạc sinh nhật thử tự phát khi thiệp mở; trình duyệt có thể chặn autoplay đến khi khách chạm màn hình.
- Trên website Manus HTTPS: Android Chrome → ⋮ → Cài đặt ứng dụng/Thêm vào màn hình chính; iPhone/iPad Safari → Chia sẻ → Thêm vào Màn hình chính.

## Chạy thử

Chạy `CHAY-THU-LINUX-MAC.sh` hoặc `CHAY-THU-WINDOWS.bat`, rồi mở `http://localhost:8000`. Khi tải lên hosting, dùng toàn bộ thư mục.

## Supabase và dữ liệu

Project URL và publishable key được cấu hình trong `src/js/app.js`; tuyệt đối không dùng `service_role` trên trình duyệt. Nếu dùng dự án Supabase khác, chạy `database/supabase-loi-chuc.sql` trong SQL Editor. Tệp `database/xoa-loi-chuc-cu.sql` có lệnh xóa vĩnh viễn tất cả lời chúc; chỉ chạy khi thực sự muốn xóa.

## Website

https://birthdayhy-dgtj74ae.manus.space
