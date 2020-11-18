# React router
- Mô hình dynamic routing thay vì static routing: việc điều hướng sẽ diễn ra trong quá trình render
- Các loại thành phần chính:
+ routers: như <BrowserRouter> và <HashRouter>, là cốt lõi của mọi ứng dụng React Routers, thực hiện việc lưu trữ URL, phải khai báo ở top level
+ route matchers: như <Route> và <Switch>, chỉ định component được render tương ứng với URL
+ navigation: như <Link>, <NavLink> và <Redirect>, tạo link / điều hướng người dùng đến 1 route nào đó

# React hooks
## useState
- useState là cho phép thêm state vào các function components
- useState nhận vào 1 tham số làm giá trị khởi tạo cho state và trả về mảng gồm 2 biến là state và setter cho state đó.

## useEffect
- useEffect cho phép thực hiện side-effects bên trong functional components
- có thể hiểu useEffect giống như kết hợp 3 lifecycle methods: componentDidMount, componentDidUpdate, và componentWillUnmount
- useEffect nhận tham số là 1 function (được gọi là effect), sẽ được chạy sau mỗi lần render.
- effect function có thể return về 1 function (được gọi là cleanup function), function này sẽ được thực thi khi component unmount
- useEffect còn nhận tham số thứ 2 là 1 mảng, gọi là dependencies, nếu sau mỗi lần render, các biến trong mảng có thay đổi thì sẽ chạy lại useEffect. nếu muốn useEffect giống như componentDidUpdate và componentWillUnmout thì truyền vào mảng rỗng.

## useContext
- Context trong React là một cách để một component con truy cập một giá trị trong một component cha.
- Nhận tham số là một đối tượng Context (được trả về bởi React.createContext) và trả về giá trị context hiện tại cho Context đó
- Giá trị context hiện tại được xác định bởi giá trị prop của <MyContext.Provider> gần nhất bên ngoài component đó trong component tree.
- createContext() nhận một tham số, nó sẽ là giá trị mặc định trả về khi gọi useContext() mà không có giá trị.

## useMemo
- Nhận 2 tham số là 1 hàm xử lý và 1 mảng dependency. Hàm được gọi khi bất kỳ giá trị nào của mảng bị thay đổi. Nếu không có mảng nào được cung cấp, một giá trị mới sẽ được tính mỗi khi render.
- useMemo chạy trong khi render.

## useCallback
- tương tự như useMemo, cũng nhận 2 tham số là 1 hàm callback và 1 mảng dependency.
- trả về 1 memoized callback, chứ không phải là memoized value như useMemo()
- useCallback(callbackFunc, deps) <=> useMemo(() => callbackFunc, deps)

## useReducer
- Một dạng khác của useState()
- Thường được dùng khi khi có logic state phức tạp bao gồm nhiều sub values hoặc khi state tiếp theo phụ thuộc vào state trước đó
- Nếu trả về cùng một giá trị từ reducer như state hiện tại, React sẽ dừng mà không render children hoặc thực thi effects.

## useRef
- Tương tự như createRef()
- Trả về một đối tượng ref có thể thay đổi có thuộc tính .current được khởi tạo bằng đối số được truyền vào useRef()
- useRef sẽ trả về cùng một đối tượng ref trên mỗi lần render, còn nếu thay bằng createRef() thì mỗi lần render sẽ trả về 1 instance mới.
- dùng useRef thì ref sẽ được tạo sau khi component được mounted
- 2 công dụng chính: accessing dom nodes và keeping a mutable variable.
- Khi dùng như 1 mutable variable, dù có thay đổi giá trị thì cũng sẽ không re-render

# Redux, Redux-Saga
## Tại sao lại cần phải quản lý state?
- Quản lý state làm cho state của ứng dụng hữu hình dưới dạng cấu trúc dữ liệu mà ta có thể đọc và ghi vào. Nó làm cho các trạng thái ‘vô hình’ hiển thị rõ ràng để có thể theo dõi và thao tác.
- Thay vì nhìn vào DOM và suy luận ra state dựa trên những gì có và những gì không có, một cấu trúc dữ liệu rõ ràng sẽ dễ hiểu hơn nhiều.
- Khi các ứng dụng JavaScript ngày càng lớn hơn và phức tạp hơn, việc có dữ liệu rõ ràng để làm việc theo cách có thể dự đoán được sẽ giúp ích không nhỏ.

## Kiến trúc của Redux
### Store
- Lưu giữ toàn bộ state tree của ứng dụng.
- Cách duy nhất để thay đổi state là thực hiện dispatch
- store không phải là một class. Nó chỉ là một object với một vài method kèm theo.
- Để tạo ra 1 store, cần truyền rootReducer vào createStore.

### Action
- là payload chứa thông tin gửi dữ liệu từ ứng dụng đến store.
- là nguồn thông tin duy nhất cho store, có thể gửi đến store bằng cách dùng store.dispatch().

### Reducer
- chỉ định cách state của ứng dụng thay đổi theo các actions được gửi đến store.
- các actions chỉ mô tả những gì đã xảy ra, nhưng không mô tả state của ứng dụng thay đổi như thế nào, việc đó phụ thuộc vào reducer xử lý.

### Redux flow
- gọi store.dispatch(action) - truyền vào 1 action nào đó
- store sẽ gọi ra reducer được truyền vào lúc khởi tạo
- reducer sẽ nhận action và xử lý trả về state mới cho store cập nhật vào, khi đó, UI sẽ được render lại

## Nhiệm vụ của middleware Redux-saga trong Redux
- middleware cho phép chúng ta can thiệp vào giữa thời điểm dispatch một action và thời điểm action đến được reducer
- redux-saga là một thư viện nhằm mục đích làm cho các side-effects của ứng dụng (tức là những tác vụ bất đồng bộ như fetch dữ liệu và những thứ impure như truy cập bộ nhớ cache của trình duyệt) dễ quản lý hơn, thực thi hiệu quả hơn, dễ kiểm tra và xử lý lỗi tốt hơn.
- Có thể hình dùng một saga giống như một thread riêng biệt trong ứng dụng, chỉ chịu trách nhiệm về các side-effects. redux-saga là một middleware của redux, có nghĩa là thread có thể được bắt đầu, tạm dừng và hủy bỏ từ ứng dụng chính bằng các action bình thường, nó cũng có quyền truy cập vào state và nó cũng có thể dispatch các action.

## Function generator (ES6)
- là các functions có thể thoát ra và quay lại xử lý tiếp sau đó. Context của chúng (variable bindings) sẽ được lưu qua các lần truy cập lại.
- Một câu lệnh return trong generator khi được thực thi sẽ kết thúc generator.
