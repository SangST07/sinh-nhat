-- CẢNH BÁO: lệnh này xóa vĩnh viễn toàn bộ lời chúc hiện có.
-- Chỉ chạy trong Supabase SQL Editor nếu bạn thực sự muốn bắt đầu danh sách trống.
truncate table public.birthday_wishes restart identity;
notify pgrst, 'reload schema';
