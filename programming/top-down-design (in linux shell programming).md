Khi các chương trình ngày dần trở nên lớn hơn và phức tạp hơn, chúng sẽ trở nên khó khăn hơn để thiết kế, viết mã và bảo trì. Như trong bất kỳ dự án lớn nào, thường thì nên chia các nhiệm vụ lớn, phức tạp thành một loạt các nhiệm vụ nhỏ, đơn giản hơn. Thử tưởng tượng rằng bạn đang cố gắng mô tả một công việc bình thường phổ biến hàng ngày, là đi chợ để mua thức ăn, cho một người đến từ sao Hỏa. Chúng ta có thể mô tả quá trình tổng thể theo một loạt các bước sau:
1. Lên xe.
2. Lái xe đến chợ.
3. Đỗ xe.
4. Vào chợ.
5. Mua thực phẩm.
6. Quay trở lại xe.
7. Lái xe về nhà.
8. Đỗ xe.
9. Vào nhà.

Tuy nhiên, với một người từ sao Hỏa thì có thể sẽ cần nhiều chi tiết hơn nữa. Và chúng ta có thể chia nhỏ hơn nữa việc "Đỗ xe" thành một loạt các bước:
1. Tìm chỗ đỗ xe.
2. Lái xe vào chỗ.
3. Tắt động cơ.
4. Đặt phanh đỗ xe.
5. Ra khỏi xe.
6. Khóa xe.

Và việc "Tắt động cơ" cũng có thể chia nhỏ ra thành các công việc nhỏ hơn nữa như: "Tắt nguồn", "Rút chìa khoá",... cho đến khi mọi bước của toàn bộ quá trình đi chợ đã được xác định đầy đủ.

Quá trình xác định các bước cấp cao nhất và phát triển thêm cái nhìn chi tiết hơn về các bước đó được gọi là top-down design (thiết kế từ trên xuống). Kỹ thuật này cho phép chúng ta chia các nhiệm vụ phức tạp lớn thành nhiều nhiệm vụ nhỏ, đơn giản hơn. Thiết kế từ trên xuống là một phương pháp phổ biến để thiết kế các chương trình và là một phương pháp rất phù hợp với lập trình shell nói riêng. Trong chương này, chúng tôi sẽ sử dụng thiết kế từ trên xuống để phát triển đoạn script tạo report nhé.

## Shell functions
Tập lệnh của chúng ta hiện đang thực hiện các bước sau để tạo tài liệu HTML:
1. Mở trang.
2. Mở header trang.
3. Đặt tiêu đề trang.
4. Đóng header trang.
5. Mở thân trang.
6. XUất ra tiêu đề trang.
7. Xuất ra thời gian report.
8. Đóng thân trang.
9. Đóng trang.

Đối với giai đoạn phát triển tiếp theo, chúng ta sẽ thêm một số nhiệm vụ giữa các bước 7 và 8. Chúng sẽ bao gồm:
- Thời gian hoạt động và tải hệ thống. Đây là lượng thời gian kể từ lần cuối cùng tắt hoặc khởi động lại và số lượng tác vụ trung bình hiện đang chạy trên bộ xử lý trong nhiều khoảng thời gian.
- Dung lượng ổ cứng. Việc sử dụng tổng thể bộ nhớ trên thiết bị lưu trữ của hệ thống
- Dung lượng vùng `home`. Lượng không gian lưu trữ đang được sử dụng bởi mỗi người dùng.

Nếu chúng ta đã có sẵn một lệnh cho mỗi tác vụ này, chúng ta có thể thêm chúng vào tập lệnh của mình chỉ bằng cách thay thế lệnh:
```sh
#!/bin/bash
# Program to output a system information page
TITLE="System Information Report For $HOSTNAME"
CURRENT_TIME=$(date +"%x %r %Z")
TIMESTAMP="Generated $CURRENT_TIME, by $USER"
cat << _EOF_
<HTML>
 <HEAD> 
   <TITLE>$TITLE</TITLE>
 </HEAD>
 <BODY>
   <H1>$TITLE</H1>
   <P>$TIMESTAMP</P>
   $(report_uptime)
   $(report_disk_space)
   $(report_home_space)
 </BODY>
</HTML>
_EOF_
```

Chúng ta có thể tạo ra những lệnh bổ sung này bằng 2 cách:
- Viết thành các script riêng lẻ và đặt vào một thư mục được liệt kê trong `$PATH`
- Nhúng các script ngay trong chương trình của chúng ta dưới dạng các `shell function`

Như chúng ta đã đề cập trước đó, shell function là các `chương trình con` được đặt bên trong các chương trình khác và có thể hoạt động như các chương trình tự trị. Shell function có 2 dạng cú pháp:
```sh
function name {
  commands
  return
}
```
và
```sh
name () {
  commands
  return
}
```

trong đó, `name` là tên functions và `commands` là chuỗi các câu lệnh được chứa bên trong function. Cả 2 dạng đều tương đương nhau và có thể dùng thay thế nhau được. Sau đây, chúng ta sẽ xem một script demo cách dùng của shell function:
```sh
#!/bin/bash

# Shell function demo

function funct {
  echo "Step 2"
  return
}
# Main program starts here

echo "Step 1"
funct
echo "Step 3"
```

Khi shell đọc script, nó sẽ bỏ qua dòng 1 đến dòng 11 vì những dòng đó chỉ chứa comments và định nghĩa function. Việc thực thi bắt đầu từ dòng 12, với lệnh `echo`, dòng 13 gọi đến hàm `funct`, khi đó shell sẽ thực thi hàm cũng giống như những câu lệnh khác. Điều khiển chương trình sẽ di chuyển đến dòng 6, lệnh `echo` thứ 2 sẽ được thực thi. Dòng 7 được chạy tiếp theo. Lệnh `return` sẽ dừng hàm và quay trở lại chương trình chính ở dòng tiếp theo lệnh gọi hàm (dòng 14) và thực thi câu lệnh `echo` cuối cùng. Lưu ý rằng để các lệnh gọi hàm được nhận biết là các hàm shell và không bị hiểu nhầm là tên của các chương trình bên ngoài, các định nghĩa hàm shell phải xuất hiện trong tập lệnh trước khi chúng được gọi.

Bây giờ chúng ta sẽ thêm các định nghĩa hàm shell tối giản vào tập lệnh của mình nhé:
```sh
#!/bin/bash
# Program to output a system information page
TITLE="System Information Report For $HOSTNAME"
CURRENT_TIME=$(date +"%x %r %Z")
TIMESTAMP="Generated $CURRENT_TIME, by $USER"
report_uptime () {
  return
}
report_disk_space () {
  return
}
report_home_space () {
  return
}
cat << _EOF_
<HTML>
  <HEAD>
    <TITLE>$TITLE</TITLE>
  </HEAD>
  <BODY>
    <H1>$TITLE</H1>
    <P>$TIMESTAMP</P>
    $(report_uptime)
    $(report_disk_space)
    $(report_home_space) 
  </BODY>
</HTML>
_EOF_ 
```

Tên hàm shell tuân theo các quy tắc giống như các biến. Một hàm phải chứa ít nhất một lệnh. Lệnh return (là tùy chọn) cũng thỏa mãn yêu cầu trên.

## Biến cục bộ (local variables)
Trong các tập lệnh chúng ta đã viết cho đến hiện tại, tất cả các biến (bao gồm cả hằng số) là các biến toàn cục. Biến toàn cục duy trì sự tồn tại của chúng trong suốt chương trình. Điều này có thể có ích cho nhiều thứ, nhưng đôi khi nó có thể làm phức tạp việc sử dụng các hàm shell. Bên trong các hàm shell, thường có các biến cục bộ. Các biến cục bộ chỉ có thể truy cập được trong hàm shell trong đó chúng được xác định và ngừng tồn tại sau khi hàm shell kết thúc.

Cú pháp sẽ là: `local name`

Việc có các biến cục bộ cho phép lập trình viên sử dụng các biến có tên có thể đã tồn tại, kể cả trong tập lệnh trên toàn cục hoặc trong các hàm shell khác, mà không phải lo lắng về khả năng bị xung đột tên.

Tính năng này cho phép các hàm shell được viết sao cho chúng vẫn độc lập với nhau và với tập lệnh mà chúng xuất hiện trong đó. Điều này rất có giá trị, vì nó giúp ngăn chặn một phần của chương trình can thiệp vào phần khác. Nó cũng cho phép các hàm shell được viết để chúng có thể di động. Đó là chúng có thể được cắt và dán từ script này sang script khác khi cần thiết.

## Giữ script hoạt động
Trong khi phát triển chương trình của chúng ta, sẽ rất hữu ích khi giữ chương trình ở trạng thái có thể chạy được. Bằng cách này, và kiểm tra thường xuyên, chúng ta có thể phát hiện sớm các lỗi trong quá trình phát triển. Điều này sẽ làm cho vấn đề gỡ lỗi dễ dàng hơn nhiều. Ví dụ: nếu chúng ta chạy chương trình, thực hiện một thay đổi nhỏ, sau đó chạy lại chương trình và tìm ra sự cố, thì rất có thể rằng thay đổi gần đây nhất là nguồn gốc của vấn đề. Bằng cách thêm các hàm trống, được gọi là `stubs` theo cách nói của lập trình viên, chúng ta có thể xác minh luồng logic của chương trình ở giai đoạn đầu. Khi xây dựng một stub, việc bao gồm một cái gì đó cung cấp phản hồi cho lập trình viên sẽ là một ý tưởng tốt, điều này cho thấy luồng logic đang được thực hiện. Nếu chúng ta nhìn vào đầu ra của tập lệnh bây giờ:
```
[me@linuxbox ~]$ sys_info_page
<HTML>
  <HEAD>
    <TITLE>System Information Report For twin2</TITLE> 
  </HEAD>
  <BODY>
    <H1>System Information Report For linuxbox</H1>
    <P>Generated 03/19/2009 04:02:10 PM EDT, by me</P>



  </BODY>
</HTML>
```

chúng ta thấy rằng có một số dòng trống trong đầu ra ở sau mốc thời gian, nhưng chúng ta có thể chắc chắn về nguyên nhân. Nếu thay đổi các chức năng để bao gồm một số phản hồi:
```sh
report_uptime () {
  echo "Function report_uptime executed."
  return
}
report_disk_space () {
  echo "Function report_disk_space executed."
  return
}
report_home_space () {
  echo "Function report_home_space executed."
  return
}
```

và thực thi script lần nữa:
```
[me@linuxbox ~]$ sys_info_page
<HTML>
  <HEAD>
    <TITLE>System Information Report For linuxbox</TITLE>
  </HEAD>
  <BODY>
    <H1>System Information Report For linuxbox</H1>
    <P>Generated 03/20/2009 05:17:26 AM EDT, by me</P>
    Function report_uptime executed.
    Function report_disk_space executed.
    Function report_home_space executed.
  </BODY>
</HTML>
```
Bây giờ chúng ta thấy rằng, trên thực tế, ba function của chúng ta đang được thực thi.

Với khung chức năng của chúng ta đang hoạt động, đã đến lúc phải bổ sung một số mã chức năng:
```sh
report_uptime () {
  cat <<- _EOF_
    <H2>System Uptime</H2>
    <PRE>$(uptime)</PRE>
    _EOF_
  return
}

report_disk_space () {
  cat <<- _EOF_
    <H2>Disk Space Utilization</H2>
    <PRE>$(df -h)</PRE>
    _EOF_
  return
}

report_home_space () {
  cat <<- _EOF_
    <H2>Home Space Utilization</H2>
    <PRE>$(du -sh /home/*)</PRE>
    _EOF_
  return
}
```
Như thế là ta đã bổ sung hoàn chỉnh các chức năng của script.

## Tổng kết
Trong bài viết, chúng ta đã làm quen với một phương pháp phổ biến trong thiết kế chương trình được gọi là thiết kế top-down và chúng ta đã thấy các hàm shell được sử dụng như thế nào để xây dựng sự tinh chỉnh từng bước mà nó yêu cầu. Chúng ta cũng đã thấy làm thế nào các biến cục bộ có thể được sử dụng để làm cho các hàm shell độc lập với nhau và với chương trình mà chúng được đặt. Điều này giúp các hàm shell có thể được viết theo cách di động và có thể tái sử dụng bằng cách cho phép chúng được đặt trong nhiều chương trình, chính việc này cũng giúp tiết kiệm thời gian một cách tuyệt vời.
