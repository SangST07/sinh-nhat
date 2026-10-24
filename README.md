# Thiệp sinh nhật Hạ Vy — source và tài nguyên

## Nội dung thư mục

- `thiep-sinh-nhat-ha-vy.html`: bản HTML đơn đã điền Project URL và publishable key Supabase.
- `index.html`: bản source có cấu trúc tách CSS/JavaScript.
- `src/css/style.css`: giao diện và hiệu ứng.
- `src/js/app.js`: bộ đếm, bánh 3D, hộp quà và lời chúc Supabase.
- `database/supabase-loi-chuc.sql`: câu lệnh đầy đủ tạo bảng, chính sách đọc/thêm lời chúc và làm mới schema cache.
- `assets/`: ảnh và nhạc được gửi kèm.
- `CHAY-THU-LINUX-MAC.sh`, `CHAY-THU-WINDOWS.bat`: lệnh chạy máy chủ tĩnh thử nghiệm.

## Bật lời chúc dùng chung

1. Mở Supabase Dashboard, chọn dự án, vào **SQL Editor → New query**.
2. Sao chép toàn bộ `database/supabase-loi-chuc.sql` vào SQL Editor rồi bấm **Run**.
3. Chờ lệnh chạy thành công, sau đó tải lại trang thiệp. URL và publishable key đã được điền trong cả hai bản code.
4. Đưa trang lên hosting để khách cùng mở một URL. Nếu dùng source tách file, hãy tải lên cả thư mục, không chỉ riêng `index.html`.

Không đưa `service_role` key vào HTML. SQL cấp quyền công khai chỉ đọc và thêm lời chúc; không cấp sửa/xóa.

## Chạy thử trên máy

Chạy `CHAY-THU-LINUX-MAC.sh` hoặc `CHAY-THU-WINDOWS.bat` trong thư mục. Mở `http://localhost:8000`. Có thể mở bản HTML đơn trực tiếp, nhưng Supabase cần có bảng được tạo trước.

Ảnh và MP3 được đóng gói trong `assets`; trang hiện chưa tự dùng các tài nguyên đó trong giao diện.

## Xóa lời chúc cũ để bắt đầu lại

Nếu muốn danh sách lời chúc trống hoàn toàn, mở Supabase → SQL Editor → New query, dán nội dung `database/xoa-loi-chuc-cu.sql` rồi bấm Run. Lệnh `TRUNCATE` xóa vĩnh viễn tất cả lời chúc hiện tại và đặt lại ID; các lời chúc mới sau đó sẽ tiếp tục được lưu và hiển thị cho khách truy cập. Không chạy lệnh này nếu cần giữ lại lời chúc cũ.
