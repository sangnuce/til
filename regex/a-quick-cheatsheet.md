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
| `\D` | khớp với một ký tự không phải là một chữ số |
| `\W` | khớp với một ký tự không phải là từ (ký tự chữ và số cộng với dấu gạch dưới _) |
| `\S` | khớp với một ký tự không phải là khoảng trắng (các tab và ký tự ngắt dòng) |
| `.` | khớp với một ký tự bất kì |

Để được thực hiện theo nghĩa đen, bạn phải escape các ký tự `^.[$()|*+?{\` với dấu gạch chéo ngược `\` bởi vì những ký tự này có ý nghĩa đặc biệt trong Regexp.

| Ví dụ | Giải thích |
| --- | --- |
| `\$\d` | khớp với chuỗi mà có ký tự `$` đứng ngay trước một chữ số |

Lưu ý nhỏ rằng bạn cũng có thể tìm trùng khớp các ký tự không in được như tab `\t`, dòng mới `\n`, quay về đầu dòng `\r`.

### Flags

Chúng ta đang học cách xây dựng một công thức regex nhưng lại dễ quên mất một khái niệm cơ bản: `flags`

Một regex thường xuất hiện trong dạng này: `/abc/`, trong đó mẫu tìm kiếm được phân cách bằng hai ký tự gạch chéo `/`. Cuối cùng, chúng ta có thể chỉ định một cờ với các giá trị này (và hoàn toàn cũng có thể kết hợp chúng với nhau):

- **g** (global) không dừng lại ở ngay kết quả đầu tiên mà sẽ khởi động lại các tìm kiếm chuỗi con tiếp theo từ cuối vị trí trùng khớp trước đó.
- **m** (multi-line) khi được chỉ định thì `^` và `$` sẽ khớp với điểm bắt đầu và kết thúc của một dòng, thay vì toàn bộ chuỗi
- **i** (insensitive) làm cho toàn bộ biểu thức không phân biệt chữ hoa chữ thường (ví dụ `/aBc/i` sẽ khớp với `AbC`)

## Intermediate topics

### Gom nhóm và capturing — `()`

| Ví dụ | Giải thích |
| --- | --- |
| `a(bc)` | dấu ngoặc đơn tạo một nhóm được capture với giá trị `bc` |
| `a(?:bc)*` | bằng cách sử dụng `?:`, chúng ta sẽ vô hiệu hóa việc capturing một nhóm |
| `a(?<foo>bc)` | bằng cách sử dụng `?<foo>`, chúng ta đã đặt tên cho nhóm bắt được |

Toán tử này rất hữu ích khi bạn cần trích xuất thông tin từ chuỗi hoặc dữ liệu bằng ngôn ngữ lập trình ưa thích của mình. Bất kỳ sự xuất hiện nào được ghi lại bởi một số nhóm sẽ được hiển thị dưới dạng một mảng: chúng ta sẽ truy cập các giá trị của chúng bằng cách sử dụng một chỉ mục trên kết quả của các trùng khớp.

Nếu chúng ta chọn đặt tên cho các nhóm (sử dụng `(?<foo>...)`), chúng ta sẽ có thể truy xuất các giá trị nhóm bằng kết quả trùng khớp như một dạng từ điển trong đó các khóa sẽ là tên của mỗi nhóm.

### Biểu thức ngoặc vuông — `[]`

| Ví dụ | Giải thích |
| --- | --- |
| `[abc]` | khớp với một chuỗi có `a` hoặc `b` hoặc `c` -> giống với `a|b|c` |
| `[a-c]` | khớp với một chuỗi có kí tự trong đoạn từ `a` đến `c`, kết quả tương tự trên |
| `[a-fA-F0-9]` | chuỗi đại diện cho một chữ số thập lục phân duy nhất, trường hợp case-insensitive (không phân biệt hoa thường) |
| `[0-9]%` | một chuỗi có ký tự từ `0` đến `9` đứng trước dấu `%` |
| `[^a-zA-Z]` | một chuỗi không có chữ cái từ `a` đến `z` hoặc từ `A` đến `Z`. Trong trường hợp này, `^` được sử dụng làm phủ định của biểu thức |

Một lưu ý nhỏ rằng bên trong các biểu thức ngoặc vuông này, tất cả các ký tự đặc biệt (bao gồm cả dấu gạch chéo ngược `\`) sẽ mất các quyền hạn đặc biệt của chúng, do đó chúng ta sẽ không cần phải áp dụng "escape rule" nhé.

### Trùng khớp `tham lam` (greedy) hoặc `lười biếng` (lazy)

Các bộ định lượng (`*`, `+`, `{}`) là các toán tử tham lam, vì vậy chúng mở rộng kết quả khớp đến mức dài nhất có thể thông qua văn bản được cung cấp.

Ví dụ: `<.+>` Khớp với `<div>simple div</div>` trong "This is a <div>simple div</div> test". Để chỉ bắt được thẻ `div`, chúng ta có thể sử dụng dấu `?` để làm cho nó trở nên lười biếng hơn:

| Ví dụ | Giải thích |
| --- | --- |
| `<.+?>` | khớp với bất kỳ kí tự nào lặp lại một hoặc nhiều lần mà được bao gồm trong `<` và `>` | 

Một giải pháp tốt hơn là tránh sử dụng `.` sẽ cho ta một regex nghiêm ngặt hơn:

| Ví dụ | Giải thích |
| --- | --- |
| `<[^<>]+>` | khớp với bất kỳ ký tự nào ngoại trừ `<` hoặc `>` lặp lại một hoặc nhiều lần mà được bao gồm trong `<` và `>` | 

## Advanced topics

### Ranh giới (Boundaries) — `\b` và `\B`

| Ví dụ | Giải thích |
| --- | --- |
| `\babc\b` | thực hiện tìm kiếm "toàn bộ từ" mà trùng khớp luôn với giá trị `abc` |

`\b` đại diện cho một vị trí neo giống như dấu mũ (tương tự `$` và `^`) khớp với các vị trí trong đó một bên là ký tự từ (`\w`) và bên kia không phải là ký tự từ (ví dụ: nó có thể là đầu chuỗi hoặc một kí tự khoảng cách, hoặc là một kí tự ở cuối chuỗi).

Và đối ngược của nó chính là `\B`. Nó sẽ khớp với tất cả các vị trí mà `\b` không khớp, có thể là nếu chúng ta muốn tìm một mẫu tìm kiếm được bao quanh hoàn toàn bởi các ký tự từ (`\w`)

| Ví dụ | Giải thích |
| --- | --- |
| `\Babc\B` | chỉ khớp nếu mẫu `abc` được bao quanh hoàn toàn bởi các ký tự từ |

### Tham chiếu ngược (Back-references) — `\1`

| Ví dụ | Giải thích |
| --- | --- |
| `([abc])\1` | bằng cách sử dụng `\1`, nó sẽ khớp với cùng một văn bản bắt được khớp bởi nhóm (group) đầu tiên |
| `([abc])([de])\2\1` | chúng ta có thể sử dụng `\2` (`\3`, `\4`, v.v.) để xác định cùng một văn bản bắt được khớp với nhóm thứ hai (thứ ba, thứ tư, v.v.) |
| `(?<foo>[abc])\k<foo>` | chúng ta đặt tên `foo` cho nhóm và sẽ tham chiếu nó sau (`\k<foo>`). Kết quả sẽ giống với cái regex đầu tiên bên trên |

### Tìm phía trước và phía sau — `(?=)` và `(?<=)`

| Ví dụ | Giải thích |
| --- | --- |
| `d(?=r)` | chỉ khớp với một ký tự `d` nếu được theo sau bởi ký tự `r`, nhưng `r` sẽ không phải là một phần của kết quả regex tổng thể |
| `(?<=r)d` | chỉ khớp với một ký tự `d` nếu đứng trước nó là ký tự `r`, nhưng `r` sẽ không phải là một phần của kết quả regex tổng thể |

Và bạn cũng có thể sử dụng toán tử phủ định `!` như sau:

| Ví dụ | Giải thích |
| --- | --- |
| `d(?!r)` | chỉ khớp với một ký tự `d` nếu không được theo sau bởi ký tự `r`, và tất nhiên, `r` sẽ không phải là một phần của kết quả regex tổng thể |
| `(?<=r)d` | chỉ khớp với một ký tự `d` nếu đứng trước nó không phải là ký tự `r`, và `r` sẽ không phải là một phần của kết quả regex tổng thể |

## Tổng kết

Như bạn thấy ở trên, các lĩnh vực ứng dụng của regex có thể rất là nhiều và mình cũng chắc chắn rằng bạn đã nhận ra ít nhất một trong số các tác vụ dưới đây trong số những tác vụ được thấy trong quãng đường lập trình của bạn:
- xác thực dữ liệu (ví dụ kiểm tra xem chuỗi thời gian có được định dạng tốt không)
- quét dữ liệu (đặc biệt là quét 1 website, tìm tất cả các trang có chứa một bộ từ nhất định theo thứ tự cụ thể)
- sắp xếp dữ liệu (chuyển đổi dữ liệu từ định dạng thô thành định dạng khác)
- phân tích chuỗi (ví dụ: lấy tất cả các tham số URL GET, bắt các văn bản bên trong một bộ dấu ngoặc đơn)
- thay thế chuỗi (ví dụ, ngay cả trong việc sử dụng IDE/text editor thông thường để tìm kiếm và thay thế chuỗi ở nhiều vị trí cùng một lúc, v.v.)
- Hightlight cú pháp, đổi tên tệp, ... và nhiều ứng dụng khác liên quan đến chuỗi

## Tham khảo
Bài viết được tham khảo dịch từ [Regex tutorial — A quick cheatsheet by examples](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)
