Phần mềm khi chạy sẽ sử dụng bộ nhớ máy tính cho các cấu trúc dữ liệu và các hoạt động thực thi. Cách bộ nhớ này được truy cập và quản lý phụ thuộc vào hệ điều hành và ngôn ngữ lập trình được sử dụng. Nhiều ngôn ngữ lập trình hiện đại sẽ quản lý bộ nhớ cho bạn, và Ruby cũng không là ngoại lệ. Ruby quản lý việc sử dụng bộ nhớ bằng cách sử dụng bộ thu gom rác (còn gọi là gc - garbage collection).

## Garbage Collection là gì?

GC là một phương pháp quản lý việc sử dụng bộ nhớ chương trình máy tính. Ý tưởng đằng sau việc thu gom rác và các giải pháp quản lý bộ nhớ khác, như đếm tham chiếu, là thay vì developer phải tự theo dõi các object nào đang được chương trình sử dụng, thì ngôn ngữ lập trình sẽ phụ trách việc đó. Điều này có nghĩa là lập trình viên có thể tập trung vào logic nghiệp vụ hoặc vấn đề khác đang được giải quyết thay vì lo lắng về các vấn đề khó khăn trong việc phân bổ và giải phóng bộ nhớ.

Mặc dù có nhiều thuật toán thu gom rác khác nhau, nhưng tiền đề cơ bản vẫn giống nhau. Vào những thời điểm khác nhau trong quá trình thực thi chương trình, code trong thời gian chạy ngôn ngữ lập trình sẽ quét qua bộ nhớ của chương trình và "tìm ra" đối tượng hoặc cấu trúc dữ liệu nào không còn được sử dụng nữa. Nếu một đối tượng hoặc dữ liệu không còn được sử dụng, nó được coi là rác. Bộ nhớ của nó có thể được giải phóng và sử dụng lại bởi các phần khác của chương trình. Bộ thu gom rác có trách nhiệm giải phóng bộ nhớ đó. Việc quét đối tượng và xác định mức sử dụng xảy ra như thế nào và khi nào sẽ phụ thuộc vào thuật toán thu gom rác và việc triển khai.

## Ai nên đọc bài này?

Là một Ruby developer, có thể bạn sẽ nghĩ rằng bạn có thể bỏ qua việc thu thập rác và để việc đó cho những người phát triển ngôn ngữ lập trình. Rốt cuộc thì đó cũng là mục đích của Ruby’s GC mà? Để giảm bớt việc mà bạn phải lo? Khi bạn xây dựng ứng dụng của mình, bạn thường có thể bỏ qua các phần của thu thập rác. Tuy nhiên, nó sẽ hữu ích cho bạn khi biết một số điều về chủ đề này, vì hành vi của bộ thu gom rác ảnh hưởng đến hoạt động của chương trình trên môi trường production.

Môi trường production và mức sử dụng làm "căng" ứng dụng theo những cách mà bạn không thể thấy được trong quá trình phát triển. Ngoài ra, mọi môi trường triển khai production đều có giới hạn về bộ nhớ. Điều này có nghĩa là đôi khi ứng dụng Ruby của bạn sẽ gặp vấn đề về bộ nhớ trên môi trường production mà lại không xuất hiện trong quá trình phát triển.

Giải pháp thì bạn có thể chuyển sang hệ thống có hiệu suất tốt hơn, nhiều bộ nhớ hơn và tất nhiên là sẽ đắt hơn, hoặc là bạn có thể debug việc sử dụng bộ nhớ của ứng dụng. Cách thứ 2 sẽ dễ dàng hơn nhiều nếu bạn có sự hiểu biết nhất định về Ruby GC.

## Loại Ruby nào đang được đề cập?

Nếu bạn chưa biết thì hiện có rất nhiều loại Ruby khác nhau đang được triển khai: https://github.com/codicoscepticos/ruby-implementations#readme

Ruby được sử dụng phổ biến nhất là CRuby, còn được gọi là Matz' Ruby Interpreter (MRI). CRuby cũng chính là cài đặt Ruby gốc. Các triển khai phổ biến khác bao gồm JRuby và TruffleRuby. Bài đăng này sẽ không đề cập đến quản lý bộ nhớ của thời gian chạy Ruby nào ngoài CRuby.

Garbage collection đã trải qua một số thay đổi kể từ khi Ruby 2 được phát hành vào năm 2013. Chúng bao gồm generational garbage collector (được giới thiệu trong Ruby 2.1), incremental garbage collection (trong 2.2) và compaction (trong 2.7). Bài đăng này tập trung vào phiên bản mới nhất được phát hành của CRuby, là 2.7.

## Garbage Collection hoạt động như thế nào trong Ruby?

Về cơ bản, khi bạn tạo một Ruby object, bộ nhớ sẽ được cấp cho nó. Object sống một thời gian, tràn ngập hy vọng sẽ làm được một số việc có ích. Sau đó, khi object không còn được sử dụng nữa, Ruby đánh dấu phần đó của bộ nhớ là available để các object khác sử dụng trong tương lai.

Nếu bạn muốn bản triển khai đầy đủ mà không bỏ sót gì, bạn có thể đọc [gc.c](https://github.com/ruby/ruby/blob/ruby_2_7/gc.c). Khoảng 12k dòng code trong đó (=.='). Thay vì làm điều đó, chúng ta hãy xem xét các phần quan trọng của bộ thu gom rác Ruby nhé.

Có hai bộ nhớ khác nhau trong Ruby. Đầu tiên là malloc heap. Mọi thứ trong chương trình của bạn đều được đưa vào phần bộ nhớ này. Nó không được giải phóng trở lại hệ điều hành trừ khi bộ nhớ được Ruby xác định là không sử dụng vào cuối quá bộ thu gom rác. Ví dụ về các đối tượng nằm trong heap này bao gồm string buffers và cấu trúc dữ liệu được quản lý bởi C extension.

Thứ hai là Ruby object heap. Đây là một tập con của malloc heap và là nơi tồn tại của hầu hết các Ruby objects. Nếu chúng lớn, chúng có thể trỏ vào malloc heap. Ruby heap là thứ mà bộ thu gom rác Ruby giám sát và dọn dẹp, cũng như là nội dung mà bài đăng này sẽ tập trung vào.

Ruby heap được chia thành các trang. Các trang chứa các vị trí trống hoặc chứa một tham chiếu đối tượng. Các đối tượng dài 40 bytes (có một số ngoại lệ đối với các giá trị ví dụ như number).

## Thuật toán đánh dấu và quét (mark and sweep)

Ruby sử dụng một thuật toán thu gom rác đánh dấu 3 màu và quét. Mỗi đối tượng được đánh dấu là trắng, đen hoặc xám, do đó thuật toán có tên là ba màu.

Bất cứ khi nào bộ thu gom rác được gọi, nó bắt đầu với giai đoạn "đánh dấu". Bộ thu gom rác kiểm tra các đối tượng trên Ruby heap. Nó gắn thẻ mọi thứ bằng một lá cờ trắng. Tại thời điểm này, một lá cờ trắng có nghĩa là đối tượng chưa được xem xét.

Sau đó, bộ thu gom sẽ xem xét tất cả các đối tượng có thể truy cập được. Đây có thể là hằng số hoặc biến trong phạm vi hiện tại. Chúng được đánh dấu bằng một lá cờ màu xám. Điều này có nghĩa là đối tượng không nên được thu gom rác nhưng nó vẫn chưa được kiểm tra đầy đủ.

Đối với mỗi đối tượng được đánh dấu bằng cờ màu xám, tất cả các kết nối của nó sẽ được kiểm tra. Đối với mỗi đối tượng được xem xét, nếu đối tượng đó có cờ trắng, cờ đó sẽ được đổi thành màu xám. Đồng thời, đối tượng này cũng được thêm vào danh sách đối tượng cần rà soát.

Cuối cùng, sau khi tất cả các kết nối của một đối tượng nhất định đã được kiểm tra, đối tượng gốc ban đầu có cờ xám được đánh dấu bằng cờ đen. Cờ đen có nghĩa là "không thu gom rác, đối tượng này đang được sử dụng". Bộ thu gom sau đó bắt đầu kiểm tra một đối tượng khác với một lá cờ màu xám.

Sau khi tất cả các đối tượng có cờ xám đã được kiểm tra, tất cả các đối tượng trong Ruby heap phải có cờ đen hoặc cờ trắng. Các đối tượng được gắn cờ đen không được thu gom rác. Các đối tượng được gắn cờ trắng không được kết nối với bất kỳ đối tượng được gắn cờ đen nào và có thể bị xóa. Giai đoạn ‘đánh dấu’ đã hoàn tất.

Bộ nhớ mà các đối tượng được gắn cờ trắng được cấp phát sau đó được trả lại cho Ruby heap. Đây là giai đoạn ‘quét’. Hầu hết độ phức tạp của thuật toán đánh dấu và quét đều ở giai đoạn ‘đánh dấu’.

Bộ thu gom rác được gọi thủ công hoặc khi Ruby heap bị đầy. Chúng ta sẽ nói thêm về nghĩa của từ 'đầy' sau nhé.


## Generational Garbage Collection

Nhiều đối tượng được sử dụng một thời gian ngắn và sau đó bị loại bỏ. Ruby heap rất là lớn nên thật kém thông minh khi lúc nào cũng theo dõi mọi objects khi mà một số chỉ tồn tại cho một lệnh gọi hàm và những objects khác tồn tại trong thời gian chương trình chạy. Ruby giải quyết vấn đề này bằng cách làm cho giai đoạn đánh dấu thông minh hơn, sử dụng một bộ thu gom rác thế hệ - generational garbage collection.

bộ thu gom rác thế hệ, được giới thiệu trong Ruby 2.1, tận dụng sự khác biệt về tuổi thọ của đối tượng bằng cách theo dõi số lần nó đã nhìn thấy một đối tượng. Nếu một đối tượng đã được nhìn thấy 3 lần, nó được đánh dấu là đối tượng 'cũ' và được đối xử khác với các đối tượng trẻ hơn.

Khi bạn đang sử dụng bộ thu gom rác thế hệ, bạn sẽ có nhiều phần của Ruby heap. Có một phần "new object", đây là nơi lưu trữ tất cả các cấp phát đối tượng mới. Phần này nhỏ so với toàn bộ heap và được thu gom rác thường xuyên - bộ thu gom rác như vậy được gọi là bộ thu gom rác nhỏ. Các đối tượng trong phần 'old object' được thu gom rác ít thường xuyên hơn, chỉ trong khoảng thời gian được gọi là thu gom rác đầy đủ.

Bộ thu gom rác nhỏ cũng xử lý các đối tượng mới được tham chiếu bởi một đối tượng cũ hơn cũng như các edge case khác. Đây là lý do tại sao giải thuật Ruby đôi khi được gọi là RGenGC, Restricted Generational Garbage collection - bộ thu gom rác thế hệ bị hạn chế. Không có quy tắc nào yêu cầu cả hai bộ thu gom rác phải sử dụng cùng một thuật toán, nhưng tại thời điểm này, CRuby sử dụng thuật toán đánh dấu và quét cho cả bộ thu gom rác nhỏ và lớn.

## Incremental Garbage Collection

Bộ thu gom rác thế hệ vẫn có một lỗ hổng. Bộ thu thập các đối tượng từ khu vực "new object" thì nhanh chóng, nhưng bất kỳ đối tượng nào nằm ngoài khu vực đó (trong vùng "old object" hoặc các khu vực khác để xử lý các edge case của C extension) chỉ được thu gom khi có một bộ thu gom rác đầy đủ. Có thể có nhiều đối tượng bên ngoài khu vực 'new object' và điều đó có nghĩa là việc thu gom rác đầy đủ sẽ ảnh hưởng đến hiệu suất.

Kể từ Ruby 2.2, bộ thu gom rác gia tăng (Incremental Garbage Collection) cho phép đan xen giữa việc thu gom rác đầy đủ và việc thực thi chương trình. Điều này có nghĩa là một bộ thu gom rác đầy đủ không còn có tác động lớn đến hiệu suất vì chương trình có thể thực thi cùng một lúc. Tuy nhiên, giai đoạn đánh dấu thậm chí còn trở nên phức tạp hơn.

Tất nhiên, bộ thu gom rác tăng dần cần phải cẩn thận để không thu gom rác các đối tượng được tham chiếu. Các tham chiếu có thể thay đổi trong khi nó đang chạy tăng dần. Điều này có thể xảy ra nếu một đối tượng mới được thêm vào một băm được đánh dấu là màu đen (đã được kiểm tra đầy đủ và không trỏ đến đối tượng màu trắng nào). Đối tượng mới đó sẽ được đánh dấu bằng một lá cờ trắng và có thể do bộ thu gom rác vô tình thu gom lại.

Thuật toán này giải quyết vấn đề này bằng cách sử dụng cái được gọi là 'rào cản ghi' (write barrier). 'Rào cản ghi' phát hiện bất cứ lúc nào một đối tượng màu đen tham chiếu đến một đối tượng mới hoặc màu trắng và thông báo cho bộ thu gom rác rằng những gì nó nghĩ rằng như vậy (một đối tượng màu đen sẽ không bao giờ tham chiếu đến một đối tượng màu trắng) là không đúng. Bất kỳ ai viết C extension cũng cần phải đặc biệt cẩn thận với 'rào cản viết'.

## Compaction

Tính năng nén heap đã ra mắt trong CRuby 2.7 và là thay đổi mới nhất đối với hệ thống thu gom rác. Nó sử dụng thuật toán "hai ngón tay" (two fingers) để thu gọn Ruby heap. Nén heap có một số lợi ích. Nếu bộ nhớ bị phân mảnh, một đối tượng Ruby không thể sử dụng một đoạn lớn liền kề, điều này ảnh hưởng tiêu cực đến hiệu suất truy cập. Nếu các đối tượng liên quan đến nhau nằm gần nhau trong heap, bộ đệm CPU sẽ tải chúng cùng nhau; Bộ nhớ đệm CPU nhanh hơn nhiều so với truy cập bộ nhớ chính. Nếu bạn đang sử dụng máy chủ web phân tách, việc nén bộ nhớ trước khi phân tách cũng có thể cải thiện hiệu suất ghi trên bản sao.

Đây là một video tuyệt vời về tính năng nén heap của Ruby: https://www.youtube.com/watch?v=H8iWLoarTZc

Compaction là một tính năng optional mà bạn có thể gọi thủ công qua GC.compact. Việc sử dụng compaction có thể gây ra sự cố với các C extension không được lập trình để xử lý nó, vì nó di chuyển các đối tượng xung quanh trong Ruby heap. Cần đảm bảo rằng bạn kiểm tra kỹ ứng dụng của mình nếu bạn sử dụng tính năng này.

## Cách trở thành developer thân thiện với Bộ thu gom rác

Hãy nhớ rằng, toàn bộ quan điểm của việc thu thập rác trong Ruby là bạn (1 developer) không cần phải suy nghĩ về việc sử dụng bộ nhớ. Thật không may, như đã đề cập ở trên, đôi khi bạn lại thực sự cần cân nhắc đến.

Nếu bạn đối xử tốt với bộ thu gom rác của mình, chúng sẽ đối tốt lại với bạn bằng cách thực hiện nhiệm vụ của chúng một cách nhanh chóng và hiệu quả. Dưới đây là ba cách để trở thành một Ruby developer thân thiện với gc.

### Tránh tham chiếu vòng

Khi bạn tạo các đối tượng, hãy để ý các tham chiếu vòng. Vì CRuby sử dụng thuật toán đánh dấu và quét, nếu hai đối tượng tham chiếu lẫn nhau, chúng sẽ không bao giờ được thu thập. Dưới đây là một ví dụ sử dụng [object finalizer](https://ruby-doc.org/core-2.7.1/ObjectSpace.html#method-c-define_finalizer) (còn được gọi là destructor)

```ruby
class MemoryLeak
  def initialize(name)
    ObjectSpace.define_finalizer(self, proc { puts name + " is gone" }
  end
end
```

Ở đây `proc` và `self` tham chiếu lẫn nhau vì `proc` có quyền truy cập vào các biến được xác định khi chúng được khởi tạo. Vì điều này, chúng sẽ không bao giờ được thu gom rác. Nếu bạn muốn tìm hiểu thêm về `procs` và `lambdas`, hãy xem [bài đăng này](https://scoutapm.com/blog/how-to-use-lambdas-in-ruby).


Đây là cùng một class được viết lại để tránh tham chiếu vòng:

```ruby
class NotALeak
  def initialize(name)
    ObjectSpace.define_finalizer(self, NotALeak.finalizer_proc(name))
  end

  def self.finalizer_proc(name)
    proc { puts name + " is gone" }
  end
end
```

Trong trường hợp này, `proc` được định nghĩa mà không có quyền truy cập vào đối tượng mà nó sẽ được liên kết, tránh tạo ra một tham chiếu vòng. Điều đó cho phép đối tượng sẽ được đánh dấu trong giai đoạn "đánh dấu".

### Cẩn thận với những object có tuổi thọ cao

Các biến global và biến top-level sẽ không bao giờ được thu thập rác trong suốt vòng đời của chương trình Ruby, vì vậy hãy giảm thiểu việc sử dụng chúng. Như bạn có thể đoán được, bất kỳ đối tượng nào bạn liên kết với một biến toàn cục cũng sẽ không được tự động thu thập rác, vì vậy bạn sẽ phải cắt bất cứ tham chiếu nào một cách thủ công để thu thập các đối tượng như vậy.

Điều này cũng đúng với hằng số. Ví dụ: nếu bạn tạo một mảng không đổi:

```ruby
MY_ARRAY = []
```

và thêm bất kỳ đối tượng nào vào nó, đối tượng đó sẽ tồn tại vĩnh viễn (ít nhất là khi chương trình Ruby còn đang chạy). Điều đó không sao nếu bạn chủ ý như vậy, nhưng nếu bạn không có ý định đó, bạn có thể sẽ khiến sử dụng nhiều bộ nhớ hơn dự định.

### Giám sát việc sử dụng bộ nhớ

Ngoài việc cẩn thận trong cách bạn code, theo dõi việc sử dụng bộ nhớ sẽ giúp bạn hiểu sâu hơn về cách chương trình của bạn sử dụng hay lạm dụng bộ nhớ.


_refs: https://scoutapm.com/blog/ruby-garbage-collection_
