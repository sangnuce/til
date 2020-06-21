## Tự động hoá tác vụ quản trị hệ thống bằng lập lịch công việc
### 1. cron
- Hệ thống lập lịch công việc chính trong Linux
- Các công việc được cấu hình để chạy theo một lịch trình cố định (một lần hoặc nhiều lần nếu cần)
- crond
  - Service chịu trách nhiệm đảm bảo các công việc định kỳ được chạy
- /etc/cron.*
  - cron.d: Thư mục cấu hình lịch trình công việc tùy chỉnh (các tác vụ lịch của hệ thống)
  - cron.hourly: Các công việc chạy hàng giờ
  - cron.daily: Các công việc chạy hàng ngày
  - cron.weekly: Các công việc chạy hàng tuần
  - cron.monthly: Các công việc chạy hàng tháng
  - **Lưu ý**: Trừ cron.d ra thì các thư mục trên chỉ chứa các tập lệnh, không có thông tin lập lịch nào khác được bao gồm trong đó và chúng sẽ không luôn luôn chạy cùng một lúc, mà sẽ chạy trong "khung" thời gian đã chỉ định

### 2. crontab
- Tiện ích cho phép tạo công việc (cụ thể cho người dùng đang chạy lệnh)
- `-l`: Liệt kê tất cả các công việc định kỳ của người dùng đang đăng nhập
- `-e`: Chỉnh sửa các công việc định kỳ của người dùng đang đăng nhập
- `-u [username]`: Áp dụng tùy chọn cho người dùng được chỉ định

### 3. Định dạng của một công việc định kỳ
- [Phút 0-59] [Giờ 0-23] [Ngày trong tháng 1-31] [Tháng 1-12] [Ngày trong tuần 0-7] [CMD]
  - Lưu ý: Nếu một công việc lịch hệ thống nằm trong /etc/cron.d, sẽ có thêm trường thứ sáu chỉ định USER sẽ chạy cron đó (xem ví dụ /etc/cron.d/raid-check)
  - Note: Với trường "ngày trong tuần", cả số 0 và 7 đều chỉ ngày chủ nhật
  - Note: Trong thời gian thì 0 là nửa đêm
- Mỗi cột phải có một giá trị, ngay cả khi giá trị là * có nghĩa là nó áp dụng cho tất cả các giá trị có thể của trường
  - Ví dụ: 30 23 * 2 7
    - Công việc này sẽ được lên kế hoạch vào phút thứ 30 của giờ thứ 23 trong ngày (11:30 PM), vào bất kỳ ngày nào trong tháng của tháng hai mà là Chủ nhật
    - Note: Sử dụng viết tắt ba chữ cái, bạn có thể thay thế tên của tháng cho trường thứ tư cũng như tên của ngày cho trường thứ năm
    - Ví dụ: 30 23 * feb sun
      - Tương đương với ví dụ trước
- Phạm vi
  - Một phạm vi có thể được xử lý với dấu gạch ngang giữa hai giá trị
    - Ví dụ: 30 23 * 2-4 7
      - Công việc này sẽ được lên kế hoạch vào phút 30, giờ thứ 23 trong ngày (11:30 PM), vào bất kỳ ngày nào trong tháng từ tháng Hai đến tháng Tư, mà là Chủ Nhật
  - Cũng có thể được chỉ định bởi một danh sách được phân tách bằng dấu phẩy
    - Ví dụ: 30 23 * 2,3,12 1,3
      - Công việc này sẽ được lên kế hoạch vào phút 30 của giờ thứ 23 trong ngày (11:30 PM), vào bất kỳ ngày nào trong các tháng của tháng hai, tháng ba và tháng mười hai mà là thứ hai hoặc thứ tư
  - Các giá trị cũng có thể được chỉ định theo định dạng "bước"
    - Ví dụ: 0 */4 * 2,3,12 1,3
      - Công việc này sẽ được lên kế hoạch vào đầu giờ, mỗi bốn giờ, vào bất kỳ ngày nào trong tháng hai, tháng ba và tháng mười hai mà là thứ hai hoặc thứ tư
- Công việc / lệnh để chạy
  - Bất kỳ lệnh shell, ứng dụng hoặc tập lệnh hợp lệ
  - Note: Công việc cron cho 1 người dùng sẽ có một môi trường rất tối thiểu (.bash_profile, .bashrc, .bash_login, v.v.) không chạy, do đó, hãy cung cấp một đường dẫn đầy đủ đến các lệnh và hoặc các biến cần được đưa vào tập lệnh nếu không, bạn có thể gặp lỗi hoặc kết quả không mong muốn (ví dụ PATH sẽ chỉ có /usr/bin và /bin)
  - Note: Bạn có thể đặt một số biến môi trường đặc biệt trên công việc của bạn
  - MAILTO: Đầu ra từ công việc sẽ được gửi qua email đến địa chỉ được chỉ định
  - SHELL: Chạy job với shell được chỉ định
  - CRON_TZ: Sử dụng múi giờ được chỉ định cho crontab
- Chuyển hướng công việc
  - Khác với biến MAILTO đã nói ở trên, bạn có thể chuyển đầu ra sang `/dev/null` hoặc tệp khác
    - Ví dụ: 0 */4 * 2,3,12 1,3 /path/application/script.sh > /dev/null
      - CÓ tác dụng là sẽ "vứt bỏ" tất cả đầu ra (/dev/null)
    - Ví dụ: 0 */4 * 2,3,12 1,3 /path/application/script.sh 2>&1 > /root/some.log
      - Sẽ lấy tất cả đầu ra tiêu chuẩn và lỗi và chuyển hướng nó đến tệp /root/some.log

### 4. /var/spool/cron
- Tất cả các crons người dùng được tạo/chỉnh sửa bằng crontab sẽ được đặt ở đây

### 5. /etc/cron.allow
- Whitelist những người dùng có thể chạy các công việc định kỳ
- Nếu tệp này tồn tại và không có nội dung, chỉ root mới có thể truy cập crontabs

### 6. /etc/cron.deny
- Blacklist những người dùng không thể chạy các công việc định kỳ
- Nếu tệp này tồn tại và trống, tất cả người dùng có thể truy cập crontabs của họ và chạy công việc
- Note: Thứ tự ưu tiên sẽ áp dụng cron.allow và bỏ qua cron.deny nếu nó tồn tại
