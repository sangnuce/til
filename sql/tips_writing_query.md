## Một số lưu ý để viết câu truy vấn SQL hiệu quả hơn
Truy vấn SQL được sử dụng để truy xuất dữ liệu cần thiết từ cơ sở dữ liệu. Tuy có thể có nhiều câu truy vấn SQL mang lại kết quả giống nhau nhưng chúng lại có mức độ hiệu quả khác nhau. Một truy vấn không hiệu quả có thể làm cạn kiệt tài nguyên cơ sở dữ liệu, giảm tốc độ cơ sở dữ liệu hoặc dẫn đến mất dịch vụ cho người dùng khác. Vì vậy, điều tối quan trọng là tối ưu hóa truy vấn để có được hiệu suất tốt nhất.

Chúng ta hãy xem xét một số bảng mẫu để hiểu rõ hơn các phương thức tối ưu hóa một truy vấn nhé:
- Bảng `Customers`: chứa các chi tiết của khách hàng tiềm năng cho một cửa hàng, gồm các cột `CustomerID`, `LastName`, `FirstName`, `Address`, `Age`
- Bảng `Products`: chứa các chi tiết của các sản phẩm có sẵn trong cửa hàng, gồm các cột: `ProductID`, `ProductName`, `ProductPrice`
- Bảng `Orders`: chứa các chi tiết của các sản phẩm được đặt hàng bởi khách hàng từ các cửa hàng, gồm các cột: `CustomerID`, `ProductID`, `ProductQuantity`

Dưới đây là các cách khác nhau để tối ưu hóa truy vấn được đưa ra dưới đây sẽ áp dụng các ví dụ truy vấn từ các bảng trên nhé.

### 1. Viết đúng định dạng cho truy vấn
Điều rất quan trọng là cung cấp định dạng chính xác trong khi viết truy vấn. Điều này giúp tăng cường khả năng đọc câu truy vấn và cũng làm cho việc xem xét và xử lý sự cố dễ dàng hơn. Một số quy tắc để định dạng một truy vấn được đưa ra như sau:
- Đặt mỗi câu lệnh trong truy vấn ở một dòng mới.
- Đặt từ khóa SQL vào truy vấn bằng chữ hoa

*Ví dụ: Đây là truy vấn hiển thị `CustomerID` và `LastName` của khách hàng hiện đã đặt hàng sản phẩm và có tuổi đời dưới 50*
```sql
Select distinct Customers.CustomerID, Customers.LastName from Customers INNER join Orders on Customers.CustomerID = Orders.CustomerID where Customers.Age < 50;
```
Truy vấn trên có vẻ rất khó để có thể đọc được vì tất cả các câu lệnh nằm trong một dòng và các từ khóa ở dạng chữ thường. Vì vậy, một phiên bản tối ưu hóa được đưa ra dưới đây bằng cách sử dụng các quy tắc định dạng được chỉ định trước đó:
```sql
SELECT DISTINCT Customers.CustomerID, Customers.LastName
FROM Customers INNER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID
WHERE Customers.Age < 50;
```
