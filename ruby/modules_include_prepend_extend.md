# Include, Prepend và Extend modules trong Ruby
Module là một trong những tính năng thú vị nhất của Ruby. Bạn có thể sử dụng chúng để đính kèm các hành vi cụ thể cho các class, và để tổ chức lại code bằng cách sử dụng Composition thay vì Inheritance. Sau đây là một ví dụ đơn giản:
```ruby
module Logging
  def log(level, message)
    File.open("log.txt", "a") do |f|
      f.write "#{level}: #{message}"
    end
  end
end

class Service
  include Logging
  
  def do_something
    begin
      # do something
    rescue StandardError => e
      log :error, e.message
    end
  end
end
```

Ngoài ra, cũng có rất nhiều gem sử dụng các module để tổ chức code để có thể dễ dàng tích hợp vào ứng dụng của bạn. Ví dụ, gem `Sidekiq` cung cấp module `Sidekiq::Worker` để đính kèm hành vi cho các class tùy chỉnh và sử dụng chúng làm các workers bất đồng bộ.
```ruby
class MyWorker
  include Sidekiq::Worker
  
  def perform(args)
    # do some work
  end
end

MyWorker.perform_async {something: "useful"}
```

Mặc dù `include` là cách phổ biến nhất để nhúng code ở bên ngoài vào một class, Ruby cũng cung cấp hai cách khác để làm điều đó: `prepend` và `extend`. Tuy nhiên, chúng lại không có hành vi giống nhau, và những khác biệt đó thường bị các Ruby developers hiểu lầm.
Để hiểu cách sử dụng chúng, trước tiên chúng ta phải có cái nhìn sâu hơn về cách Ruby giải quyết các phương thức để thực thi trong thời gian chạy (runtime), bằng cách sử dụng thứ gọi là chuỗi tổ tiên (ancestors chain).


## Ancestors chain
Khi một class Ruby được tạo ra, nó chứa một danh sách các hằng số là tổ tiên của nó. Chúng là tất cả các class mà class đó đã kế thừa và các module chúng include. Ví dụ: bằng cách gọi `ancestors` từ class `String`, chúng ta có được danh sách tổ tiên của nó:
```ruby
String.ancestors
# => => [String, Comparable, Object, Kernel, BasicObject]
```

Chúng ta có thể thấy ở trên cùng của chuỗi tổ tiên là `BasicObject`, là gốc của hệ thống phân cấp đối tượng trong Ruby, và `Object`, class cha của tất cả các class, và chính nó cũng include cả module `Kernel` nữa.

![](https://miro.medium.com/max/1959/1*efhDcstGlM9KS_hZwaNfQw.jpeg)

Khi chúng ta gọi phương thức, ví dụ `object_id` trên đối tượng `String` (hoặc bất kỳ class nào khác), Ruby sẽ tìm kiếm qua các class trong chuỗi tổ tiên của class đó để tìm phương thức `object_id` và cuối cùng sẽ tìm thấy nó được định nghĩa trong class `Object`.
Khi gọi một phương thức mà chưa được định nghĩa ở bất cứ đâu, Ruby sẽ không tìm thấy phương thức đó trong bất kỳ class hoặc module  nào trong chuỗi tổ tiên và sẽ kết thúc việc gọi `method_missing` của `BasicObject`, tạo ra cơ hội cuối cùng cho developers thực thi code dự phòng.
Sau khi biết những điều cơ bản về chuỗi tổ tiên của các class trong Ruby, bây giờ chúng ta đã có thể xem xét các cách khác nhau để nhúng module vào class.

## Include
`include` là cách được sử dụng nhiều nhất và đơn giản nhất để nhúng code của module. Khi gọi nó trong khi định nghĩa class, Ruby sẽ chèn module vào chuỗi tổ tiên của class, ngay sau class cha của nó. Quay trở lại ví dụ đầu tiên của chúng ta:
```ruby
module Logging
  def log(level, message)
    File.open("log.txt", "a") do |f|
      f.write "#{level}: #{message}"
    end
  end
end

class Service
  include Logging
  
  def do_something
    begin
      # do something
    rescue StandardError => e
      log :error, e.message
    end
  end
end
```

Nếu chúng ta nhìn vào chuỗi tổ tiên của class `Service`, chúng ta có thể thấy rằng module `Logging` có mặt ngay giữa chính class đó và class cha trực tiếp của nó, đó là `Object`.
```ruby
Service.ancestors
# => [Service, Logging, Object, ...]
```

Đó là lý do tại sao chúng ta có thể gọi các phương thức được định nghĩa trong module trên các thể hiện của class. Nếu không tìm thấy các phương thức này trên class, Ruby sẽ đi lên một bước trên chuỗi để tìm chúng trên module.

![](https://miro.medium.com/max/2000/1*LnR9-BIJEs3aDHNPSMla9Q.jpeg)

Ngoài ra, điều đáng chú ý là, khi include hai module trở lên, cái include cuối cùng sẽ luôn được chèn vào ngay giữa class và phần còn lại của chuỗi:
```ruby
module Logging
  def log(message)
    # log in a file
  end
end

module Debug
  def log(message)
    # debug output
  end
end

class Service
  include Logging
  include Debug
end

p Service.ancestors # [Service, Debug, Logging, Object, ...]
```

Vì vậy, trong trường hợp có xung đột phương thức như trong ví dụ này, module đầu tiên phản hồi trong chuỗi tổ tiên sẽ là module được include cuối cùng: `Debug`.

## Prepend
Có mặt từ Ruby 2, `prepend` ít được biết đến bởi Rubyists hơn hai người bạn khác của nó. Nó thực sự hoạt động như `include`, ngoại trừ việc thay vì chèn module giữa class và class cha của nó trong chuỗi, nó sẽ chèn module ở dưới cùng của chuỗi, ngay cả trước chính class đó.
Điều đó có nghĩa là khi gọi một phương thức trên một thể hiện của class, Ruby sẽ xem xét các phương thức module trước khi nhìn vào class. Sự khác biệt về hành vi này cho phép bạn "trang trí" các class hiện có bằng các module và triển khai hệ thống "around" logic:
```ruby
module ServiceDebugger
  def run(args)
    puts "Service run start: #{args.inspect}"
    result = super
    puts "Service run finished: #{result}" 
  end
end

class Service
  prepend ServiceDebugger
  
  # perform some real work
  def run(args)
    args.each do |arg|
      sleep 1
    end
    {result: "ok"}
  end
end
```

Sử dụng tính năng `pprepend`, module `ServiceDebugger` hiện được chèn ở dưới cùng của chuỗi tổ tiên.

![](https://miro.medium.com/max/2000/1*I3Y9uEshTDUHUrMcD92xxw.jpeg)

Bạn có thể tự xác minh lại bằng cách gọi `Service.ancestors`:
```ruby
Service.ancestors
# => [ServiceDebugger, Service, Object, ...]
```

Việc gọi `run` trên một thể hiện của `Service` trước tiên sẽ thực hiện phương thức được xác định trong module `ServiceDebugger`. Chúng ta có thể sử dụng `super` để gọi cùng một phương thức trên tổ tiên trực tiếp trong chuỗi, chính là class `Service`. Chúng ta đã tận dụng hành vi này để "trang trí" cho việc triển khai `Service` một cách rất đơn giản và sáng sủa.

## Extend
Sử dụng `extend` trên một lớp sẽ thực sự nhúng các phương thức của module làm class methods. Nếu chúng ta sử dụng `extend` thay vì `include` trong ví dụ của mình, module `Logging` sẽ không được chèn vào chuỗi tổ tiên của class `Service`. Vì vậy, chúng ta không thể gọi phương thức `log` trên bất kỳ thể hiện nào của `Service`.
Thay vào đó, Ruby sẽ chèn module vào chuỗi tổ tiên của `singleton_class` của class `Service`. Cái gọi là `singleton class` này (được đặt tên là `#Service`) chính là nơi mà các class methods của class `Service` được định nghĩa. Các phương thức của module `Logging` sẽ có sẵn như là các class methods của class `Service`.

![](https://miro.medium.com/max/2000/1*tINNfzNK99H6L5LZauQktA.jpeg)

Sau đó, chúng ta có thể gọi phương thức như thế này:
```ruby
Service.log :info, "Something happened"
```

Đôi khi, bạn sẽ muốn sử dụng một module để nhúng các instance methods cho một class, nhưng đồng thời để định nghĩa các class methods. Thông thường thì bạn sẽ phải sử dụng hai module khác nhau, một module `include` để nhập các instance methods và một module khác có `extend` để định nghĩa các class methods.
Một cách phổ biến để đạt được điều đó bằng cách sử dụng một module duy nhất là sử dụng phương thức hook `included` của `Module`, để nhập các class methods khi chạy:
```ruby
module Logging
  module ClassMethods
    def logging_enabled?
      true
    end
  end
  
  def self.included(base)
    base.extend(ClassMethods)
  end
  
  def log(level, message)
    # ...
  end
end
```

Bây giờ, khi chúng ta include module vào class `Service`, các phương thức của module sẽ được nhập dưới dạng các instance methods của class. Phương thức `included` cũng được gọi, với class đang include làm đối số. Sau đó, chúng ta có thể gọi `extend` trên nó để nhập các phương thức của submodule `ClassMethods` làm class methods. Tất cả chỉ có vậy...

## Tham khảo
https://medium.com/@leo_hetsch/ruby-modules-include-vs-prepend-vs-extend-f09837a5b073
