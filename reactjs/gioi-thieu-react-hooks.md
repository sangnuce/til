# Giới thiệu về React Hooks
React Hook là phần bổ sung mới nhất cho React trong phiên bản 16.8.0 và nhiều React developers rất hào hứng với phần bổ sung này. Trong bài viết này, chúng ta sẽ nói về State Hook, cho phép người dùng tạo các biến state mà không cần đến các class. Trong React thì có nhiều Hooks có sẵn, nhưng bài viết này sẽ tập trung giới thiệu vào `useState`.

![](https://miro.medium.com/max/1459/1*1nVUi8poCDxpp1CUX8aRSg.png)
Trước khi Hooks ra đời, các React components được chia thành hai loại lớn tùy thuộc vào việc component đó dựa trên class hay dựa trên function.
Các class components có khả năng xác định các thuộc tính state và các phương thức vòng đời, nhưng các functional components không thể sử dụng state cũng như truy cập các phương thức vòng đời của React. Cả hai loại component đều lấy `props` làm tham số đầu vào chứa dữ liệu được truyền từ các component cha. Vì các functional components không tạo ra các thuộc tính state riêng của chúng, chúng phụ thuộc vào component cha cho dữ liệu đầu vào, điều này biến chúng thành "Stateless components".

## Stateful Components
Chúng ta hãy xem một triển khai đơn giản của "Stateful component" bằng cách sử dụng các classes. Trong ví dụ được đưa ra dưới đây, chúng ta sẽ tạo ra một component đơn giản và thêm một số thuộc tính state vào cùng bằng cách sử dụng `this.state`.
Component định nghĩa các thuộc tính state sau ("Name", "Age", và "Designation"), và các thông tin này được hiển thị như một phần của giao diện người dùng của component. Đoạn code này cũng cung cấp cho chúng ta khả năng cập nhật biến state bằng cách sử dụng `this.setState`. Việc cập nhật state sẽ có tác động trong component và đến cả các component con. Các state được truyền đến các component con được nhận là `props`.
```javascript
class EmployeeDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Mayank",
      age: 31,
      designation: "Senior Developer"
    }
  }
  
  updateEmployeeAge = () => {
    this.setState({
      age: this.state.age + 1
    });
  }
  
  render() {
    return (
      <div>
        <p>Employee Name: {this.state.name}</p>
        <p>Employee Age: {this.state.name}</p>
        <p>Employee Designation: {this.state.designation}</p>
        <input type="button" onClick={this.updateEmployeeAge} value="Click To Update Age" />
      </div>
    )
  }
}
```
Đoạn code trên tạo ra một stateful component chứa 3 biến trạng thái: `name`, `age` và `designation`. Nó cũng chứa một function, làm giá trị của thuộc tính `age` lên 1 đơn vị. Bời vì biến state đã bị thay đổi, component mà đang hiển thị thuộc tính `age` cũng sẽ được cập nhật và thay đổi tương ứng phía giao diện người dùng.

## Làm việc với Stateless component
Một cách khác để tạo ra một component là tạo ra nó như một stateless component. Đây là các components đơn giản, lấy `props` làm tham số đầu vào của chúng và hiển thị chúng ra giao diện người dùng như chúng ta đã làm trước đây. Một stateless component không thể định nghĩa các biến state của chính nó và nó cũng không thể cập nhật bất kỳ giá trị `props` nào nhận được. Bất kỳ nỗ lực nào để cập nhật `props` sẽ dẫn đến việc xuất hiện một lỗi. Dưới đây là một ví dụ về thành phần không trạng thái đơn giản.
```javascript
function EmployeeDetails(props) {
  return (
    <div>
      <p>Employee Name: {props.name}</p>
      <p>Employee Age: {props.age}</p>
      <p>Employee Designation: {props.designation}</p>
    </div>
  )
}
```

## Làm việc cùng React Hooks
**Tạo stateful components sử dụng các function**
Bây giờ, sau khi chúng ta đã thấy cách các components được tạo ra trước phiên bản React mới nhất, hãy cùng xem xét cách chúng có thể được tạo bằng cách sử dụng State Hooks nhé.
Với sự ra đời của Hooks, chúng ta có thể tạo các stateful components mà không cần sử dụng đến các class. Chúng ta có thể sử dụng các function để tạo các stateful components. Vì chúng ta định nghĩa state bên trong function, nên chúng ta gọi các components này là "Stateful Function Components". Chúng ta có thể sử dụng hook `useState` để quản lý các thuộc tính state bên trong các functional components.
Hãy cùng xem đoạn code giống như vậy khi sử dụng hooks sẽ trông thế nào nhé:
```javascript  
import React, { useState } from "react";

export default function EmployeeDetails()  {

    const [name] = useState("Mayank");
    const [age, setAge] = useState(31);
    const [designation] = useState("Senior Developer");
    
    function updateEmployeeAge() {
      setAge(age + 1);
    }
    
    return (
      <div>
        <p>Employee Name: {name}</p>
        <p>Employee Age: {age}</p>
        <p>Employee Designation: {designation}</p>
        <input type="button" onClick={updateEmployeeAge} value="Click To Update Age" />
      </div>
    )
}
```
Đoạn code trên sử dụng hook để tạo stateful component. Chúng ta định nghĩa state của component bằng cách sử dụng từ khóa `useState`. `useState` lấy một tham số làm đầu vào xác định giá trị ban đầu cho biến state.  
Khi gọi hàm `useState` với tham số, nó thực hiện như sau:
1. Tạo một biến trạng thái mới với tên là `name`.
2. Gán giá trị mặc định là giá trị được truyền trong tham số.
3. Trả về thuộc tính state mới được tạo cùng với chức năng bộ setter.
 
Bây giờ, hãy cùng phân tích đoạn code dưới đây để hiểu hơn về hook `useState` nhé:
```javascript
const [name, setName] = useState("Mayank");
```
Hàm `useState` được gọi với một tham số mặc định, đó là một chuỗi có giá trị là "May Mayank". Hàm này tạo một thuộc tính state mới và gán giá trị mặc định cho nó. Hàm này trả về một mảng chứa các phần tử sau:
1. Yếu tố đầu tiên là giá trị cho state mới được tạo ra.
2. Yếu tố thứ hai là *hàm setter* của người dùng cho chính thuộc tính đó.

Sau đó, chúng ta sử dụng hàm hủy và gán phần tử tại vị trí đầu tiên cho biến `name` và setter được gán cho biến `setName`. Bây giờ, thuộc tính `name` này đóng vai trò là biến state (`this.state.name`) và `setName` là thuộc tính setter - nó cập nhật giá trị tương tự như những gì chúng ta sử dụng trong class component (`this.setState()`). Gọi `setName` với giá trị được cập nhật làm tham số thì sẽ cập nhật giá trị cho thuộc tính `name` trong state.
Đoạn code tương ứng ở dưới đây:
```javascript  
var stateVariableForName = useState("Mayank");

// Getter for the state value created..
var name = stateVariableForName[0];

// Setter for the state variable created..
var setName = stateVariableForName[1];
```
Một trong những lợi thế của việc sử dụng các stateful functional components là bạn không còn cần phải truy cập các thuộc tính state theo cách sau: `{this.state.name}`. Để truy cập thuộc tính state trong functional components, chúng ta chỉ cần trỏ biến state `{name}`.
Functional components cung cấp một lợi thế lớn khi chúng ta có thể loại bỏ các logic phức tạp của class và chúng ta cũng không cần phải lo lắng về việc thêm từ khóa `this` ở mọi nơi trong component. Các functional components đều được dựa trên khái niệm `closures`.
Ngoài ra, nó còn làm cho ứng dụng có tính nhất quán. Bạn không cần phải có một nửa số components được định nghĩa bằng các function và nửa còn lại thì được định nghĩa bằng class. Sử dụng các hook, tất cả các component có thể được biểu diễn dưới dạng các function. Vì vậy, nó được coi là một bước tuyệt vời để hướng tới functional programming và cung cấp tính nhất quán trên toàn ứng dụng.

## Một vài lợi ích khác của việc sử dụng Hooks
### Class phức tạp hơn
Các classes rất khó để xử lý và quản lý. Các classes thường không được minified tốt và chúng cũng khiến việc Hot reloading trở nên khó xử lý. Hooks gói gọn lập trình hàm và cho chúng ta sự đơn giản. Chúng ta không cần phải có một số component thuộc loại `class` và các components khác lại là loại `function`.
Nó cung cấp tính đồng nhất trên các React components.

### Các class component sẽ trở nên khó hiểu theo thời gian
Khi ứng dụng của chúng ta phát triển, chúng ta sẽ phải thêm rất nhiều code vào các class components, điều này tạo ra sự phức tạp. Và nó sẽ gây khó khăn cho việc chia nhỏ thành các phần có chức năng tương ứng.
Vì vậy, các class components càng ngày càng phát triển về kích thước và độ phức tạp.

**Để tìm hiểu chi tiết thêm về các React Hooks, hãy tham khảo trang web chính thức của React nhé:**
https://reactjs.org/docs/hooks-intro.html


*Bài viết tham khảo dịch từ: https://medium.com/better-programming/introduction-to-react-hooks-e0102c038bf1*
