# Giải quyết các vấn đề lập trình với quy trình PEDAC
Bài viết này phác thảo cách giải quyết các vấn đề lập trình bằng cách sử dụng quy trình **PEDAC** của Launch School. Trong thực tế, có rất nhiều cách khác nhau để giải quyết các vấn đề lập trình, và PEDAC chỉ là một trong số đó. Mục đích của bài viết này không phải là để khẳng định rằng PEDAC là cách tiếp cận tốt nhất hoặc duy nhất, mà là muốn cung cấp nó như một trong những công cụ bạn có thể nghĩ đến khi bắt đầu xử lý một vấn đề nào đó. Tất nhiên bạn có thể không cần PEDAC để giải quyết mọi vấn đề, nhưng rồi bạn sẽ thấy lợi ích của việc sử dụng một số quy trình khi làm việc với các vấn đề phức tạp hơn. Vấn đề lập trình càng phức tạp, bạn lại càng cần đến một quy trình nghiêm ngặt như PEDAC. Cách tiếp cận này đặc biệt hữu ích cho người mới bắt đầu học viết code bởi vì có thể chưa từng bị buộc phải sử dụng đến một hệ thống tư duy trước đây.

## Vậy, PEDAC là gì?
PEDAC là viết tắt của từ "[Understand the] Problem, Examples / Test Cases, Data Structure, Algorithm, và Code.". PEDAC có hai mục tiêu chính: xử lý vấn đề *(PEDA)* và code theo ý định *(C)*.

<table border="1">
  <thead>
    <tr>
      <th>Mục tiêu</th>
      <th>Bước</th>
      <th>Mô tả</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Xử lý vấn đề</td>
      <td>Hiểu vấn đề</td>
      <td><ul>
        <li>Xác định đầu vào và đầu ra dự kiến</li>
        <li>Làm rõ các yêu cầu</li>
        <li>Xác định các quy tắc</li>
        <li>Mường tượng ra mô hình của vấn đề (tùy chọn)</li>
      </ul></td>
    </tr>
    <tr>
      <td>Ví dụ / Test case</td>
      <td>Xác thực việc hiểu rõ vấn đề</td>
    </tr>
    <tr>
      <td>Cấu trúc dữ liệu</td>
      <td>Cách biểu thị dữ liệu mà chúng ta sẽ làm việc khi chuyển đổi đầu vào thành đầu ra.</td>
    </tr>
    <tr>
      <td>Giải thuật</td>
      <td>Các bước để chuyển đổi đầu vào thành đầu ra</td>
    </tr>
    <tr>
      <td>Code theo ý định</td>
      <td>Code</td>
      <td>Triển khai giải thuật ở trên</td>
    </tr>
  </tbody>
</table>

Việc xử lý vấn đề bao gồm 4 bước dẫn bạn từ vấn đề ban đầu đến sự hiểu biết chắc chắn về những gì được yêu cầu. Kết quả thu được là thuật toán mà bạn sẽ sử dụng để triển khai giải pháp.

Khi bạn đã hiểu vấn đề, chọn cấu trúc dữ liệu phù hợp và có thuật toán để tiếp cận vấn đề, tất cả những gì bạn cần làm là chuyển đổi thuật toán thành ngôn ngữ lập trình bạn chọn. Đây chính là bước cuối cùng được gọi là *Code với ý định* và kết quả thu được cuối cùng là việc triển khai.

## Tại sao nên sử dụng PEDAC?
Đối với các vấn đề có độ tinh vi nhất định, PEDAC sẽ giúp tiết kiệm thời gian. Có vẻ như hơi nghịch lý khi nói rằng một quy trình tốn nhiều công sức như PEDAC có thể giúp chúng ta tiết kiệm thời gian, nhưng đó chính xác là những gì nó mang lại khi phải đối mặt với những vấn đề phức tạp. Điều đó không có nghĩa là đi thẳng vào việc coding luôn chậm hơn, trong thực tế, đôi khi nó sẽ nhanh hơn với các vấn đề đơn giản. Tuy nhiên, vấn đề càng phức tạp, càng có nhiều khả năng đi thẳng vào coding sẽ dẫn đến việc được viết code mà không có ý định hoặc ngữ cảnh nhất định. Và thường không đáp ứng các yêu cầu và sẽ bỏ sót xử lý các "edge case", cũng như tạo ra các chương trình khó hiểu, khó duy trì và mở rộng quy mô. Một cách tiếp cận nghiêm ngặt, chẳng hạn như PEDAC, giúp bạn xác định và tránh những cái bẫy mà bạn có thể gặp phải khi bạn viết code mà không có ý định cụ thể như:

- Làm thiếu yêu cầu
- Bỏ sót cát "edge case"
- Code đọc khó hiểu
- Code khó bảo trì
- ...

## Vấn đề mẫu
Hãy cùng áp dụng PEDAC thông qua một ví dụ nhé:
```
Giả sử bạn có một số tự nhiên tùy ý (mục tiêu) và một bộ gồm một hoặc nhiều số tự nhiên bổ sung (các nhân tố). Viết chương trình tính tổng của tất cả các số từ 1 đến số mục tiêu mà là bội số của một trong các nhân tố.
Chẳng hạn, nếu mục tiêu là 20 và các nhân tố là 3 và 5, như vậy chúng ta có danh sách các bội số là 3, 5, 6, 9, 10, 12, 15, 18. Tổng của các bội số này là 78.
Nếu các nhân tố không được cung cấp thì mặc định sẽ là 3 và 5.
```

### Hiểu vấn đề
OK, việc nhảy vào code luôn thì rất là hấp dẫn. Trước tiên, hãy vượt qua sự cám dỗ này nhé :D

Bước quan trọng đầu tiên của PEDAC là phân tích vấn đề để có được sự hiểu biết toàn diện về những gì vấn đề đang hỏi. Đừng vội vàng, hãy đọc kỹ vấn đề, đừng bỏ lỡ bất kỳ chi tiết nào nhé. Trong hầu hết các vấn đề, không có từ nào là lãng phí cả, vì vậy đừng đọc qua loa kiểu giống như đang đọc một bài tạp chí nha. Mỗi từ và mọi chi tiết đều quan trọng. Bộ não của bạn có xu hướng lấp đầy các khoảng trống nếu bạn bỏ qua bất kỳ chi tiết nào, nhưng nó có thể sẽ không thực hiện chính xác, như được minh họa ỏ hình ảnh sau:

![](https://miro.medium.com/max/1400/1*593JZqamxxb-k0BT3OHPFg.gif)
Hãy thử lấp đầy khoảng trống xem hình ảnh đầy đủ là gì nhé ;)

Trước tiên, hãy xác định đầu vào và đầu ra cho vấn đề của chúng ta. Đọc vấn đề, chúng ta có thể thấy rằng có hai đầu vào và một đầu ra:
```
đầu vào:
  - con số mục tiêu
  - tập hợp các nhân tố
đầu ra:
  - tổng các bội
```

Trừ khi bạn đã quá quen thuộc với lĩnh vực của vấn đề, thì sẽ có một khái niệm ngầm ẩn được nêu trong vấn đề: *bội số*.

Để làm cho các yêu cầu / điều kiện được rõ ràng, chúng ta phải hiểu các thuật ngữ khi chúng áp dụng trong lĩnh vực vấn đề.

Quay trở lại với thuật ngữ "bội số", giả sử rằng đây là một "thuật ngữ toán học" có nghĩa "một số có thể chia hết cho một số khác mà không có số dư". (Thông thường, bạn sẽ không muốn thừa nhận điều gì đó nếu bạn không quen thuộc với lĩnh vực vấn đề mà sẽ tìm cách làm rõ trước. Ở đây, chúng ta là người đưa ra vấn đề, vì vậy chúng ta sẽ xác nhận rằng định nghĩa giả định này là chính xác.) Sử dụng ví dụ trong đoạn thứ hai, chúng ta có thể xác nhận điều này:

```
số mục tiêu:
20
bội số của 3:
3, 6, 9, 12, 15, 18 (tất cả đều chia hết cho 3)
bội số của 5:
5, 10, 15 (tất cả đều chia hết cho 5)
```

### Yêu cầu tiềm ẩn
Dữ kiện vấn đề này cũng cung cấp một vài quy tắc mà chúng ta phải ghi nhớ:

1. Các bội số được tính tổng phải là duy nhất. Số 15 là bội số của cả 3 và 5, nhưng chúng ta chỉ thêm một lần khi tính tổng (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 = 78). Lưu ý rằng chúng ta ngầm rút ra được điều này từ ví dụ: yêu cầu "các bội số là duy nhất" không được nêu rõ ràng.
2. Giá trị đích là giới hạn, nhưng nó lại không được coi là bội số. Trong ví dụ, số mục tiêu là 20, không được bao gồm trong tổng số mặc dù nó là bội số của 5. Như vậy, cũng giống với quy tắc đầu tiên, yêu cầu này là yêu cầu ẩn.
3. Tất cả các số là số tự nhiên: chúng là tập hợp các số nguyên lớn hơn hoặc bằng 0 hoặc 1 (xem định nghĩa này từ http://mathworld.wolfram.com). Vì việc thêm 0 vào bất kỳ số nào cũng không làm thay đổi nó, bất kể ta sử dụng định nghĩa nào. Do đó, để đơn giản, chúng ta sẽ giả sử rằng các số tự nhiên bắt đầu từ 1.

Bây giờ sau khi chúng ta đã xử lý vấn đề, chúng ta có thể xác định liệu có thêm bất cứ điều gì cần làm rõ hay không.

### Làm rõ câu hỏi

1. **Các giá trị có thể cho số mục tiêu là gì? Số âm có được phép không?** Bất kỳ số tự nhiên nào lớn hơn 0. Sẽ luôn có thể là một giá trị đích.
2. **Các nhân tố sẽ được cung cấp cho chương trình như thế nào?** Bằng một mảng.
3. **Điều gì xảy ra nếu chỉ 3 hoặc 5 được cung cấp như là một nhân tố? Chương trình vẫn nên mặc định cho cả hai nhân tố là 3 và 5 không?** Không. Mặc định là 3 và 5 chỉ khi không có nhân tố nào được cung cấp.

### Ví dụ / Test case
Ở trên cũng đã phân tích hơi nhiều rồi nhỉ. Nhưng đó mới chỉ là bước đầu tiên - "P" trong PEDAC. Bây giờ chúng ta đã sẵn sàng để chuyển sang step "E", viết tắt của các ví dụ hoặc các trường hợp thử nghiệm. Trong bước này, mục tiêu của chúng ta là đưa ra các ví dụ xác nhận sự hiểu biết về vấn đề và xác nhận rằng chúng ta đang làm việc đúng hướng. Xác nhận thường sẽ đến từ một người hoặc tài liệu của một quy trình: chúng ta có thể yêu cầu người đó xác nhận đầu ra được cung cấp đầu vào hoặc có thể theo dõi quy trình để kiểm tra đầu ra được cung cấp đầu vào.

Quay trở lại vấn đề ví dụ, hãy để lên một số ví dụ. Các ví dụ của chúng ta sẽ ở dạng thử nghiệm cho thấy các đầu ra dự kiến ​​được đưa ra một số đầu vào nhất định:

**Ví dụ 1**

Inputs:
- Số mục tiêu: 20
- Nhân tố: [3, 5]

Output: 78

**Ví dụ 2**

Inputs:
- Số mục tiêu: 20
- Nhân tố: [3]

Output: 63

**Ví dụ 3**

Inputs:
- Số mục tiêu: 20
- Nhân tố: [5]

Output: 30

**Ví dụ 4**

Inputs:
- Số mục tiêu: 20
- Nhân tố: []

Output: 78

**Ví dụ 5**

Inputs:
- Số mục tiêu: 1
- Nhân tố: []

Output: 0

Lưu ý rằng chúng ta đã lấy ví dụ từ các quy tắc đã rút ra được. Đó thường là một nơi tuyệt vời để tìm các trường hợp thử nghiệm.

Vấn đề ví dụ này có một trường hợp cạnh đáng chú ý: điều gì xảy ra ở số cuối cùng trước giá trị đích là bội số của một hoặc nhiều nhân tố?

Trong mỗi trường hợp thử nghiệm của chúng ta ở trên, số cuối cùng được thêm vào tổng là 18 hoặc 15. Điều đó khiến 19 (giá trị cuối cùng được kiểm tra) nằm ngoài tổng, như vậy là đúng. Tuy nhiên, giả sử rằng 19 sẽ được bao gồm trong tổng, chỉ nếu khi 19 là một trong các nhân tố. Vì 19 là con số cuối cùng có thể kiểm tra (được đưa ra mục tiêu là 20), nên nó ở cạnh của phạm vi giá trị được tính tổng. Để chắc chắn chúng ta bao gồm 19 trong tổng số, chúng ta cần cung cấp một trường hợp thử nghiệm xử lý nó.


**Ví dụ 6**

Inputs:
- Số mục tiêu: 20
- Nhân tố: [19]

Output: 19

### Cấu trúc dữ liệu
Bây giờ chúng ta đã sẵn sàng để chuyển sang bước thứ ba trong phương pháp PEDAC, đó là "D". Với các trường hợp thử nghiệm đã sẵn sàng, điều tiếp theo cần làm là xác định cấu trúc dữ liệu nào chúng ta sẽ làm việc để chuyển đổi đầu vào thành đầu ra. Cần xem xét đến ngôn ngữ lập trình dự định và mô hình tư tưởng của chúng ta nữa.

Từ các yêu cầu đã rút ra, ta có thể quy bài toán về mô hình tư tưởng sau:
"Xác định danh sách tất cả các bội số của một tập hợp các nhân tố cho đến một giá trị đích, sau đó lọc danh sách các bội số thành các giá trị duy nhất. Cuối cùng, tính toán và trả về tổng của bội số duy nhất đó."

Chúng ta cần thu thập các giá trị là bội số của các nhân tố và sau đó cộng chúng vào. Một mảng có vẻ như phù hợp với tập bội số này.

Một điều cần lưu ý là cấu trúc dữ liệu sẽ ảnh hưởng đến thuật toán của bạn. Vì lý do này, chúng ta thường ghép các bước "Cấu trúc dữ liệu" và "Thuật toán" với nhau.

### Thuật toán
Mục tiêu chính của chúng ta ở đây là xác định một loạt các lệnh chuyển đổi đầu vào thành đầu ra mong muốn. Thách thức là để có được mức độ chi tiết phù hợp; chúng ta muốn một cái gì đó mà chúng ta có thể dễ dàng chuyển đổi thành code mà chưa cần viết code vội.

Lý do mà tôi không muốn nó được viết ở cấp ngôn ngữ lập trình là bạn sẽ mất sự linh hoạt trong quá trình thực hiện. Ngôn ngữ lập trình thường cung cấp một số cách để đạt được một kết quả nhất định, nhưng mỗi cách tiếp cận đó có thể ảnh hưởng đến các phần khác của chương trình. Nếu bạn đưa ra lựa chọn triển khai quá sớm bằng cách biến nó thành một phần của thuật toán, thì sau đó nếu phát hiện ra bạn cần chọn một thứ khác, bạn có thể sẽ phải quay lại và sửa đổi cả code và thuật toán. Nếu bạn không giải quyết các thay đổi ở cả hai cấp độ, bạn có thể mắc phải những bẫy mà chúng ta đã thảo luận trước đó.

Từ đó cũng suy ra được rằng, không có gì lạ nếu phải thay đổi thuật toán khi bắt đầu code, đừng cảm thấy bị hạn chế rằng phải một mực tuân theo với những gì bạn đã viết ban đầu. Trên thực tế, hai cá nhân làm việc trong cùng một vấn đề thường sẽ đưa ra các thuật toán khác nhau, đặc biệt nếu mỗi cá nhân đã xây dựng các mô hình tư tưởng khác nhau.

Từ mô hình tư tưởng ở trên, ta có thuật toán sau:

1. Tạo một mảng trống gọi là `multiples` sẽ chứa các bội số.
2. Kiểm tra xem danh sách các nhân tố có trống không. Nếu không có nhân tố nào, hãy đặt danh sách thành [3, 5]
3. Đối với mỗi `factor` trong danh sách `factors`:
    1. Đặt `current_multiple` thành `factor` để theo dõi bội số của nó.
    2. Trong khi `current_multiple` < `target`
        1. Thêm `current_multiple` vào `multiples`.
        2. Cộng thêm `factor` vào `current_multiple`.
4. Lọc các số trùng lặp từ `multiples`.
5. Tính và trả về tổng của các số trong `multiples`.

Trước khi thực hiện thuật toán của bạn, bạn nên kiểm tra thủ công với các trường hợp thử nghiệm của mình. Bạn không cần phải kiểm tra tất cả các trường hợp thử nghiệm, chỉ đủ để tự tin rằng thuật toán hoạt động là được.

**Ví dụ 1**

Inputs:
- Số mục tiêu: 20
- Nhân tố: [3, 5]

Output: 78

Thuật toán

1. Tạo một mảng trống được gọi là `multiples` sẽ chứa danh sách bội số

    `multiples = []`
2. Kiểm tra xem danh sách các nhân tố có trống không. Nếu không có nhân tố nào, hãy đặt danh sách thành `[3, 5]`

    `[3, 5]` thu được từ các nhân tố được cung cấp.
3. Đối với mỗi `factor` trong danh sách `factors`: `[3, 5]`
    1. Đặt `current_multiple` thành `factor` để theo dõi bội số của nó.
        ```ruby
        current_multiple = 3
        current_multiple = 5
        ```
    2. Trong khi `current_multiple` < `target`
        1. Thêm `current_multiple` vào `multiples`.
            ```ruby
            multiple = [3]
            multiple = [3, 6]
            multiples = [3]
            multiples = [3, 6]
            multiples = [3, 6, 9]
            ...
            multiples = [3, 6, 9, 12, 15, 18, 5, 10, 15]
            ```
        2. Cộng thêm `factor` vào `current_multiple`.
            ```ruby
            current_multiple = 6
            current_multiple = 9
            ...
            current_multiple = 18
            current_multiple = 21
            current_multiple = 5
            current_multiple = 10
            current_multiple = 15
            current_multiple = 20
            ```
4. Lọc các số trùng lặp từ `multiples`.

    `multiple = [3, 6, 9, 12, 15, 18, 5, 10]`
5. Tính và trả về tổng của các số trong `multiples`.

    78

Sau khi xác minh rằng một vài trường hợp thử nghiệm của chúng ta cung cấp đầu ra như dự kiến, đã đến lúc đưa thuật toán của chúng ta vào coding rồi.

### Code

Đây là bước cuối cùng trong PEDAC - "C", viết tắt của "code theo ý định". Giai đoạn này là về việc thực hiện các giải pháp bằng ngôn ngữ bạn lựa chọn. Lợi ích chính của việc đầu tư thời gian vào các bước trước (PEDA) là nó giảm việc thực hiện thành một bản dịch thuật toán đơn giản sang cú pháp ngôn ngữ lập trình.

Đừng quá lo lắng nếu sau khi thực hiện tất cả các bước trên, bạn vẫn phải quay lại chỉnh sửa bước thuật toán của mình. Điều đó có thể và sẽ xảy ra thường xuyên. Suy cho cùng thì bạn cũng là con người, và bạn có thể đã bỏ lỡ điều gì đó. Tuy nhiên, PEDAC nhằm mục đích giảm thiểu những sai lầm đó, vì vậy bạn không bỏ lỡ các yêu cầu chính và ngay cả khi bạn quay trở lại các bước trước đó, nó chủ yếu là để điều chỉnh cách tiếp cận.

Đây là một triển khai thuật toán Ruby:
```ruby
def sum_of_multiples(target, factors)
  multiples = []
  factors = [3, 5] if factors.length == 0

  factors.each do |factor|
    current_multiple = factor

    while current_multiple < target
      multiples << current_multiple
      current_multiple += factor
    end
  end

  multiples.uniq.inject(0, :+)
end

sum_of_multiples(20, [3, 5])  # returns 78
sum_of_multiples(20, [3])     # returns 63
sum_of_multiples(20, [5])     # returns 30
sum_of_multiples(20, [])      # returns 78
sum_of_multiples(1, [])       # returns 0
sum_of_multiples(20, [19])    # returns 19
```

## Kết luận
Mình hy vọng rằng việc biểu diễn quy trình PEDAC này đã tạo ra một trường hợp để sử dụng nó. Mặc dù nó khá dài dòng cung cấp cho mỗi bước một phạm vi bao quát rộng rãi, nhưng mức độ chi tiết này là luôn luôn cần thiết cho mọi vấn đề. Bạn cũng không cần phải tuân theo trình tự PEDA. Tư tưởng chính là xử lý vấn đề để bạn đưa ra một thuật toán và sau đó viết code theo ý định. Ban đầu có vẻ như phải làm rất nhiều công việc, nhưng một khi bạn đã quen với việc sử dụng nó, bạn sẽ ngạc nhiên khi thấy PEDAC nhanh và hiệu quả trong việc hỗ trợ khả năng giải quyết vấn đề lập trình của bạn đấy.

*Bài viết tham khảo dịch từ https://medium.com/launch-school/solving-coding-problems-with-pedac-29141331f93f*
