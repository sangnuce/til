# JSX & React components
* JSX:
  - Là cú pháp mở rộng của JS, cuối cùng cũng sẽ được dịch ra thành code JS

* Component:
  - Là các thành phần hoạt động độc lập, trả về mã HTML qua hàm `render()`
  - Có 2 loại là Function Component và Class Component

# Props and state
* Props:
  - Là các thuộc tính được truyền vào component
  - Không nên thay đổi props từ trong component vì có thể gây ra việc không nhất quán data ở các component

* State:
  - Là thuộc tính của bản thân component
  - Thay đổi bằng cách dùng `setState()` hoặc hàm setter được trả về từ `useState()` để re-render component

# Lifecycle methods
Có thể group các phương thức lifecycle ra 3 nhóm, ứng với 4 giai đoạn của component: Mounting, Updating, Unmounting, Error Handling

* Mounting: Tạo và gắn component vào DOM
  - constructor()
  - static getDerivedStateFromProps()
  - render()
  - componentDidMount()

* Updating: Re-render lại component, xảy ra khi có thay đổi props hoặc state
  - static getDerivedStateFromProps()
  - shouldComponentUpdate()
  - render()
  - getSnapshotBeforeUpdate()
  - componentDidUpdate()

* Unmounting: Loại bỏ component ra khỏi DOM
  - componentWillUnmount()

* Error Handling: Được gọi khi có lỗi xảy ra trong quá trình render, trong 1 lifecycle method, hay trong constructor của component con nào đó
  - static getDerivedStateFromError()
  - componentDidCatch()

* Biểu đồ minh hoạ: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

# Handling Events
- Event đặt tên dạng camelCase
- Truyền function vào như là event handler thay vì là string

# Conditional Rendering
- Cú pháp `if else`
- Cú pháp ternary operator `condition ? true : false`
- Inline if với `toán tử logical &&`

# Lists and Keys
- cần thêm prop key vào các item đc sinh ra bởi `map()`
- key để định danh item, nhận biết sự thay đổi, thêm xóa phần tử khỏi list.
- key trong cùng 1 list cần phải unique

# Refs
- Cho phép tương tác với DOM nodes hoặc React class component elements được sinh ra khi render.

# Cơ chế render trong React?
- Lần đầu gọi ReactDOM.render(), React chỉ duyệt qua React element được cung cấp và tạo các DOM nodes tương ứng vào node mà bạn đã truyền vào.
- React DOM so sánh phần tử và phần tử con của nó với phần tử trước đó và chỉ thực hiện các thay đổi DOM cần thiết để đưa DOM về trạng thái mong muốn.

# Thế nào Virtual DOM?
- Virtual DOM (vDOM) là một khái niệm trong đó một biểu diễn "ảo" của UI được lưu trong bộ nhớ và được đồng bộ hóa với DOM “thực” thông qua một thư viện như ReactDOM
