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

### 2. Chỉ định các trường cho `SELECT` thay vì sử dụng `SELECT *`
`SELECT *` được sử dụng để lấy tất cả dữ liệu từ một bảng. Vì vậy, nó không nên được sử dụng trừ khi tất cả các dữ liệu thực sự cần thiết cho một điều kiện nhất định vì nó không có hiệu quả cao và còn làm chậm thời gian thực hiện của truy vấn. Sẽ tốt hơn nhiều khi sử dụng `SELECT` cùng với các trường cụ thể cần thiết để tối ưu hóa truy vấn.

*Ví dụ: Đây là truy vấn hiển thị tất cả dữ liệu trong bảng `Customers` khi chỉ yêu cầu `CustomerID` và `LastName`.*
```sql
SELECT * 
FROM Customers;
```
Tốt hơn là sử dụng câu lệnh `select` với các trường `CustomerID` và `LastName` để có được kết quả mong muốn.
```sql
SELECT CustomerID, LastName 
FROM Customers;
```

### 3. Loại bỏ các truy vấn con tương quan (correlated subquery) nếu không cần thiết
Truy vấn con tương quan là một truy vấn lồng nhau phụ thuộc vào truy vấn bên ngoài cho các giá trị của nó. Nếu có hàng triệu người dùng trong cơ sở dữ liệu, truy vấn con tương quan là không hiệu quả và mất nhiều thời gian vì nó sẽ cần phải chạy hàng triệu lần. Trong trường hợp đó, dùng `inner join` sẽ hiệu quả hơn.
*Ví dụ: Đây là truy vấn hiển thị `CustomerID` của khách hàng hiện đã đặt mua sản phẩm bằng cách sử dụng truy vấn con tương quan.*
```sql
SELECT CustomerID
FROM Customers
WHERE EXISTS (SELECT * FROM Orders
              WHERE Customers.CustomerID = Orders.CustomerID);
```
Trong trường hợp này, cũng để trả về kết quả tương tự, sẽ tốt hơn nếu ta dùng `inner join`:
```sql
SELECT DISTINCT Customers.CustomerID
FROM Customers INNER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```
*Lưu ý:* Tốt nhất là nên tránh truy vấn con tương quan nếu gần như tất cả các bản ghi từ cơ sở dữ liệu là cần thiết. Tuy nhiên, trong một số trường hợp, việc sử dụng chúng lại không thể tránh khỏi được.

### 4. Giới hạn kết quả lấy được bởi câu truy vấn
Trong trường hợp chỉ yêu cầu kết quả giới hạn, tốt nhất là sử dụng câu lệnh `LIMIT`. Câu lệnh này giới hạn các hồ sơ và chỉ hiển thị số bản ghi được chỉ định. *Ví dụ:* Nếu có một cơ sở dữ liệu lớn gồm một triệu bản ghi và chỉ yêu cầu mười bản ghi đầu tiên, tốt hơn là sử dụng câu lệnh `LIMIT` vì điều này sẽ đảm bảo rằng chỉ lấy ra các bản ghi có liên quan và không làm quá tải hệ thống.
*Ví dụ: Đây là truy vấn hiển thị chi tiết khách hàng với giới hạn là 3*
```sql
SELECT *
FROM Customers 
LIMIT 3;
```

### 5. Xoá mệnh đề `DISTINCT` nếu không cần thiết
Mệnh đề `DISTINCT` được sử dụng để lấy về các kết quả khác biệt từ một truy vấn bằng cách loại bỏ các trùng lặp. Tuy nhiên, điều này làm tăng thời gian thực hiện của truy vấn vì tất cả các trường trùng lặp được nhóm lại với nhau. Vì vậy, tốt hơn là nên tránh mệnh đề `DISTINCT` càng nhiều càng tốt. Thay thế, mệnh đề `GROUP BY` có thể được sử dụng để thu được tập kết quả khác nhau.
*Ví dụ: Đây là truy vấn hiển thị LastName riêng biệt của tất cả các khách hàng sử dụng mệnh đề DISTINCT.*
```sql
select distinct LastName
from Customers;
```
`LastName` của khách hàng cũng có thể được lấy bằng mệnh đề `GROUP BY`, được thể hiện bằng ví dụ như sau:
```sql
SELECT LastName
FROM CUSTOMERS
GROUP BY LastName;
```

### 6. Tránh sử dụng các hàm khi kiểm tra điều kiện
Các hàm trong SQL được sử dụng để thực hiện các hành động cụ thể. Tuy nhiên, chúng khá kém hiệu quả vì chúng không cho phép sử dụng các `index`, do đó làm chậm thời gian thực hiện của truy vấn. Vì vậy, tốt hơn là tránh các hàm trong một truy vấn càng nhiều càng tốt để đảm bảo tối ưu hóa của nó.
*Ví dụ: Đây là truy vấn hiển thị chi tiết về các sản phẩm có tên bắt đầu bằng 'Sha'.*
```sql
SELECT *
FROM Products
WHERE SUBSTR(ProductName, 1, 3) = 'Sha';
```
Thay vào đó, tốt hơn là tránh dùng hàm và sử dụng mệnh đề `LIKE` để có được kết quả tương tự.
```sql
SELECT *
FROM Products
WHERE ProductName LIKE 'Sha%';
```

### 7. Tránh sử dụng `AND`, `OR`, `NOT` nếu có thể
Rất có khả năng các `index` không được sử dụng khi các toán tử `OR`, `AND`, `NOT` được sử dụng. Trong trường hợp cơ sở dữ liệu lớn, tốt hơn là tìm các thay thế cho những cơ sở dữ liệu này để tăng tốc thời gian thực hiện truy vấn.
*Ví dụ 1: Đây là truy vấn hiển thị chi tiết của khách hàng với CustomerID 73001, 73004 và 73005 bằng toán tử `OR`.*
```sql
SELECT * 
FROM Customers
WHERE CustomerID = 73001
OR CustomerID = 73004
OR CustomerID = 73005;
```
Tốt hơn là sử dụng toán tử `IN` trong trường hợp này để có được kết quả tương tự.
```sql
SELECT * 
FROM Customers
WHERE CustomerID IN (73001, 73004, 73005);
```

*Ví dụ 2: Đây là truy vấn hiển thị chi tiết của khách hàng có độ tuổi từ 25 đến 50 bằng cách sử dụng toán tử `AND`.*
```sql
SELECT * 
FROM Customers
WHERE age >= 25 AND age <= 50;
```
Tốt hơn là sử dụng toán tử `BETWEEN` trong trường hợp này để có được kết quả tương tự.
```sql
SELECT * 
FROM Customers
WHERE age BETWEEN 25 AND 50;
```

### 8. Sử dụng mệnh đề `WHERE` thay vì mệnh đề `HAVING` bất cứ khi nào có thể
Mệnh đề `HAVING` được sử dụng với mệnh đề `GROUP BY` để thực thi các điều kiện vì mệnh đề `WHERE` không thể được sử dụng với các hàm tổng hợp. Tuy nhiên, mệnh đề `HAVING` không cho phép sử dụng các `index`, làm chậm thời gian thực hiện truy vấn. Vì vậy, tốt hơn là sử dụng mệnh đề `WHERE` thay vì mệnh đề `HAVING` bất cứ khi nào có thể.
*Ví dụ: Đây là truy vấn hiển thị FirstNames của khách hàng với số lượng khách hàng có họ cho các khách hàng ở độ tuổi trên 25. Điều này được thực hiện bằng cách sử dụng mệnh đề `HAVING`.*
```sql
SELECT FirstName, COUNT(*)
FROM Customers
GROUP BY FirstName
HAVING Age > 25;
```
Tốt hơn là sử dụng mệnh đề `WHERE` trong trường hợp này vì nó áp dụng điều kiện cho các hàng riêng lẻ thay vì mệnh đề `HAVING` áp dụng điều kiện cho kết quả từ mệnh đề `GROUP BY`.
```sql
SELECT FirstName, COUNT(*)
FROM Customers
where Age > 25
GROUP BY FirstName;
```

### 9. Sử dụng `INNER JOIN` thay vì mệnh đề `WHERE` để tạo các phép join
Sử dụng mệnh đề `WHERE` để để tạo phép join sẽ tạo ra một tích Đề-các, trong đó số lượng hàng là tích của số hàng của hai bảng. Điều này rõ ràng là có vấn đề đối với các cơ sở dữ liệu lớn vì cần nhiều tài nguyên cơ sở dữ liệu hơn. Vì vậy, sẽ tốt hơn nhiều khi sử dụng `INNER JOIN` vì chỉ kết hợp các hàng từ cả hai bảng thỏa mãn điều kiện cần thiết.
*Ví dụ: Đây là truy vấn hiển thị CustomerID của khách hàng hiện đã đặt mua sản phẩm bằng mệnh đề WHERE.*
```sql
SELECT DISTINCT Customers.CustomerID
FROM Customers, Orders
WHERE Customers.CustomerID = Orders.CustomerID;
```
Tốt hơn là sử dụng inner join trong trường hợp này để có được kết quả tương tự.
```sql
SELECT DISTINCT Customers.CustomerID
FROM Customers INNER JOIN Orders
ON Customers.CustomerID = Orders.CustomerID;
```

### 10. Tránh sử dụng các kí tự wildcards ở đầu pattern của mệnh đề `LIKE`
Các ký tự đại diện như `%` và `_` được sử dụng để lọc kết quả của mệnh đề `LIKE`. Tuy nhiên, chúng không nên được sử dụng ở đầu pattern vì điều này làm cho cơ sở dữ liệu không thể sử dụng các `index`. Trong trường hợp đó, cần phải quét toàn bộ bảng để khớp với pattern, việc này tiêu tốn nhiều tài nguyên cơ sở dữ liệu hơn. Vì vậy, tốt hơn là tránh các ký tự đại diện ở đầu pattern và chỉ sử dụng chúng ở cuối nếu có thể.
*Ví dụ:*
```sql
SELECT * FROM Customers
WHERE FirstName LIKE '%A%'
```
Truy vấn trên không hiệu quả vì nó sử dụng ký tự đại diện `%` ở đầu pattern. Một phiên bản hiệu quả hơn của truy vấn tránh điều này được đưa ra dưới đây:
```sql
SELECT * FROM Customers
WHERE FirstName LIKE 'A%'
```
Tất nhiên là trong những trường hợp bất khả kháng cần phải dùng wildcards ở đầu pattern thì ta nên xem xét đến việc có nên sử dụng một số công cụ hỗ trợ khác như Elastic Search không.
