# Bubbling và capturing event trong Javascript
Trước hết, chúng ta hãy bắt đầu bằng một ví dụ nhé.
```html
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```

Ở ví dụ trên, chúng ta lắng nghe sự kiện `click` trên thẻ `div`. Tuy nhiên, khi chúng ta click vào thẻ `em` hoặc thẻ `code` thì hàm xử lý sự kiện cũng sẽ được thực thi.

Bạn đã bao giờ thắc mắc về điều này chưa? Trong bài viết này chúng ta sẽ cùng làm rõ cách mà Javascript xử lý event.

## Bubbling
Nguyên lý của bubbling thì rất đơn giản.

**Khi một sự kiện xảy ra trên một phần tử, đầu tiên nó sẽ chạy các event handler được gắn cho chính nó, sau đó là element cha của nó, sau đó là đến tất cả các emelent tổ tiên khác.**

Ví dụ, chúng ta có 3 phần tử lồng nhau `form` > `div` > `p` với một handler trên mỗi phần tử:
```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Bạn có thể chạy thử ở đây: https://jsfiddle.net/102dL3q4/

Khi click vào thẻ `<p>` thứ tự `onclick` được chạy sẽ là:
1. ngay trên chính thẻ `p` đó.
2. thẻ `div` bọc bên ngoài thẻ `p`
3. thẻ `form` bọc ngoài thẻ `div`
4. và cứ thế đi ra đến object `document`.

![](https://javascript.info/article/bubbling-and-capturing/event-order-bubbling.svg)

Như thế, khi ta click vào `<p>`, chúng ta sẽ thấy xuất hiện 3 alerts: `p` → `div` → `form`.

Quá trình này được gọi là "bubbling", bởi vì các sự kiện giống như "nổi bọt" từ phần tử bên trong đi qua phần tử cha giống như bọt xà phòng trong nước.

### Ngừng "bubbling"
Một sự kiện sủi bọt đi từ phần tử mục tiêu ra các phần tử bên ngoài. Thông thường, nó đi lên cho đến `<html>`, sau đó đến đối tượng `document` và một số sự kiện thậm chí còn ra đến `window`, gọi tất cả các handler trên những phần tử được duyệt qua.

Nhưng bất kỳ handler nào cũng có thể quyết định rằng sự kiện đã được xử lý đầy đủ và ngừng sự sủi bọt lên trên.

Phương thức được sử dụng chính là `event.stopPropagation()`.

Chẳng hạn, ở đây `body.onclick` sẽ không hoạt động nếu bạn click vào `<button>`:
```html
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

## Capturing
Còn có một giai đoạn khác của quá trình xử lý sự kiện được gọi là `capturing`. Thực tế thì ta hiếm khi nhìn thấy nó được sử dụng, nhưng đôi khi nó có thể thực sự sẽ hữu ích.

Các sự kiện DOM tiêu chuẩn mô tả 3 giai đoạn lan truyền sự kiện:
1. Giai đoạn bắt giữ (`capturing`) - sự kiện đi xuống các phần tử.
2. Giai đoạn mục tiêu - sự kiện chạm đến đến phần tử mục tiêu.
3. Giai đoạn nổi bọt - sự kiện nổi bọt lên các phần tử.

Sau đây là hình ảnh minh hoạ của một sự kiện click vào `<td>` bên trong `<table>`:

![](https://javascript.info/article/bubbling-and-capturing/eventflow.svg)

Có nghĩa là: khi click vào `<td>`, sự kiện trước tiên đi qua danh sách tổ tiên xuống phần tử (pha capturing), sau đó nó đến mục tiêu và kích hoạt ở đó (pha mục tiêu), sau đó nó đi lên (pha sủi bọt), gọi xử lý trên đường đi của nó.

**Trước đây chúng ta chỉ nói về nổi bọt, vì giai đoạn bắt giữ hiếm khi được sử dụng. Và thông thường nó là vô hình với chúng ta.**

Những trình xử lý được thêm bằng cách sử dụng thuộc tính `on<event>` hoặc là sử dụng JS `addEventListener(event, handler)` có hai đối số thì sẽ không động đến bất cứ điều gì về việc capturing, chúng chỉ chạy trên giai đoạn 2 và 3.

Để bắt một sự kiện trong giai đoạn bắt giữ, trong tham số thứ 3 chúng ta cần đặt option `capture` thành `true`:
```html
elem.addEventListener(..., {capture: true})
// hoặc là chỉ cần để "true" sẽ thay thế cho {capture: true}
elem.addEventListener(..., true)
```

Có hai giá trị có thể của option `capture`
- Nếu là `false` (mặc định), thì trình xử lý được đặt trên pha sủi bọt.
- Nếu là `true`, thì trình xử lý được đặt ở pha bắt giữ.

Lưu ý rằng trong khi thực tế là có 3 pha, thì pha thứ 2 (pha mục tiêu: sự kiện chạm đến phần tử) sẽ không được xử lý riêng mà các trình xử lý trên cả hai pha bắt giữ và sủi bọt sẽ kích hoạt ở pha đó.

Hãy cùng xem qua ví dụ sau để hiểu rõ hơn nhé:
```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

Chạy thử tại: https://jsfiddle.net/z28qx4do/

Đoạn code trên đặt các trình xử lý click trên mỗi phần tử để xem phần tử nào đang hoạt động.

Nếu bạn clck vào `<p>`, thì chuỗi xử lý là:
1. `HTML` → `BODY` → `FORM` → `DIV` (pha bắt giữ, dòng lắng nghe sự kiện thứ nhất)
2. `P` (pha mục tiêu, kích hoạt hai lần vì chúng ta đặt hai lần lắng nghe sự kiện: bắt giữ và sủi bọt)
3. `DIV` → `FORM` → `BODY` → `HTML` (giai đoạn sủi bọt, dòng lắng nghe sự kiện thứ hai)

