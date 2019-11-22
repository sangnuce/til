![](https://miro.medium.com/max/1280/0*qASU92GfMj2HCTMg.jpg)

Biểu thức chính quy (Regular expressions hay viết ngắn gọn là regex hoặc regexp) cực kỳ hữu ích trong việc trích xuất thông tin từ bất kỳ văn bản nào bằng cách tìm kiếm một hoặc nhiều kết quả khớp với một mẫu tìm kiếm cụ thể (ví dụ, một chuỗi ký tự ASCII hoặc Unicode).

Lĩnh vực áp dụng của nó thì trải dài từ việc kiểm tra tính hợp lệ cho đến phân tích / thay thế các chuỗi, biến đổi chuỗi dữ liệu sang các kiểu định dạng khác nhau hay là trích xuất nội dung của một trang web nào đó.

Một trong những điều thú vị nhất là khi bạn đã học được cú pháp rồi thì bạn thực sự có thể sử dụng công cụ này trong (gần như) tất cả các ngôn ngữ lập trình (JavaScript, Java, VB, C #, C / C ++, Python, Perl, Ruby , Delphi, R, Go, ...) với sự khác biệt một chút về sự hỗ trợ của các tính năng và phiên bản cú pháp tiên tiến nhất được hỗ trợ bởi các công cụ.

Cùng bắt đầu bằng cách xem xét một số ví dụ kèm theo giải thích nhé!

## Basic topics

### Anchors (neo) — `^` và `$`

| Ví dụ | Giải thích |
| --- | --- |
| `^The` | Khớp với bất kì chuỗi nào bắt đầu bởi `The` |
| `end$` | Khớp với bất kì chuỗi nào kết thúc với `end` |
| `^The end$` | Khớp với chuỗi chính xác `The end` |
| `roar` | Khớp với bất kì chuỗi nào chứa chuỗi `roar` |

### Quantifiers (định lượng) — `*`, `+`, `?` và `{}`

| Ví dụ | Giải thích |
| --- | --- |
| `abc*` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 0 hoặc nhiều kí tự `c` |
| `abc+` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 1 hoặc nhiều kí tự `c` |
| `abc?` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 0 hoặc 1 kí tự `c` |
| `abc{2}` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 2 kí tự `c` |
| `abc{2,}` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 2 kí tự `c` trở lên |
| `abc{2,5}` | khớp với bất kì chuỗi nào có `ab` mà theo sau bởi 2 đến 5 kí tự `c` |
| `a(bc)*` | khớp với bất kì chuỗi nào có `a` mà theo sau bởi 0 hoặc nhiều cặp kí tự `bc` |
| `a(bc){2,5}` | khớp với bất kì chuỗi nào có `a` mà theo sau bởi 2 đến 5 cặp kí tự `bc` |

### Toán tử OR — `|` hoặc `[]`

| Ví dụ | Giải thích |
| --- | --- |
| `a(b|c)` | khớp với bất kì chuỗi nào có `a` mà theo sau bởi `b` hoặc `c` |
| `a[bc]` | tương tự trên |

### Các lớp ký tự — `\d`, `\w`, `\s` và `.`

| Ví dụ | Giải thích |
| --- | --- |
| `\d` | khớp với một ký tự là một chữ số |
| `\w` | khớp với một ký tự từ (ký tự chữ và số cộng với dấu gạch dưới _) |
| `\s` | khớp với một ký tự khoảng trắng (bao gồm các tab và ký tự ngắt dòng) |
| `.` | khớp với một ký tự bất kì |

## Tham khảo
Bài viết được tham khảo dịch từ [Regex tutorial — A quick cheatsheet by examples](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)
