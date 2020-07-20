# Access Token Lifetime

Khi dịch vụ của bạn cung cấp access tokens, bạn sẽ cần đưa ra một số quyết định về việc access tokens của mình sẽ tồn tại bao lâu. Thật không may là không có giải pháp cố định áp dụng cho mọi dịch vụ. Có nhiều sự đánh đổi khác nhau đi kèm với các lựa chọn khác nhau, vì vậy bạn nên chọn một (hoặc kết hợp nhiều) lựa chọn sao cho phù hợp nhất với ứng dụng của bạn cần.

## Access tokens ngắn hạn và refresh tokens dài hạn

Một phương pháp phổ biến thường được dùng để cấp access tokens là sử dụng kết hợp access tokens và refresh tokens giúp tối đa độ bảo mật và linh hoạt.

Thông thường các dịch vụ sử dụng phương pháp này sẽ phát hành access tokens kéo dài trong khoảng từ vài giờ đến vài tuần. Khi dịch vụ phát hành access tokens, nó cũng tạo ra một refresh token không bao giờ hết hạn và đồng thời trả về token đó trong response.

Khi access token hết hạn, ứng dụng có thể sử dụng refresh token để lấy được access token mới. Việc này có thể được thực hiện ngầm bên trong và không có sự tham gia của người dùng, do đó, nó sẽ giúp người dùng có một quy trình xử lý liền mạch.

Lợi ích chính của phương pháp này là dịch vụ có thể sử dụng access token tự mã hoá, có thể xác thực mà không cần truy cập vào database. Tuy nhiên, điều này có nghĩa là không có cách nào để làm hết hạn các access token đó một cách trực tiếp, vì vậy, thay vào đó, các access tokens được cấp với thời gian hết hạn ngắn để ứng dụng buộc phải liên tục làm mới chúng, cho phép dịch vụ có cơ hội thu hồi quyền truy cập ứng dụng nếu cần.

Từ quan điểm của nhà phát triển bên thứ ba, thường rất khó chịu khi phải xử lý các refresh tokens. Các nhà phát triển thường ưa chuộng các access tokens mà không bao giờ hết hạn, vì như vậy sẽ ít phải code hơn để xử lý. Để giúp giảm thiểu những lo ngại này, các dịch vụ thường sẽ xây dựng logic làm mới access tokens vào SDK của họ, để quá trình này được minh bạch cho các nhà phát triển.

Tóm lại, **nên sử dụng access tokens ngắn hạn và refresh tokens dài hạn khi:**
- bạn muốn sử dụng access tokens tự mã hóa
- bạn muốn hạn chế rủi ro nếu access tokens bị rò rỉ
- bạn sẽ cung cấp SDK có thể xử lý logic làm mới một cách minh bạch cho các nhà phát triển.

## Access tokens ngắn hạn và không có refresh tokens

Nếu bạn muốn đảm bảo người dùng biết về các ứng dụng đang truy cập vào tài khoản của họ, dịch vụ có thể phát hành các access tokens tương đối ngắn hạn mà không cần đến refresh tokens. Access tokens có thể kéo dài bất kể bao lâu, từ phiên làm việc của ứng dụng hiện tại hay cho đến một vài tuần. Khi access token hết hạn, ứng dụng sẽ buộc phải đăng nhập lại để người dùng biết rằng người dùng liên tục tham gia vào việc ủy quyền lại ứng dụng.

Thông thường, tùy chọn này được sử dụng bởi các dịch vụ có nguy cơ bị thiệt hại cao nếu ứng dụng của bên thứ ba vô tình hoặc cố tình làm rò rỉ access tokens. Bằng cách yêu cầu người dùng liên tục ủy quyền lại ứng dụng, dịch vụ có thể đảm bảo rằng thiệt hại tiềm ẩn được hạn chế nếu kẻ tấn công đánh cắp được access tokens từ dịch vụ.

Bằng cách không phát hành refresh tokens, điều này khiến các ứng dụng không thể sử dụng access tokens liên tục mà không có người dùng ở phía trước màn hình. Các ứng dụng cần truy cập để liên tục đồng bộ hóa dữ liệu sẽ không thể thực hiện theo phương pháp này.

Từ góc độ người dùng, đây là tùy chọn có khả năng làm mọi người thất vọng nhất, vì có vẻ như người dùng sẽ phải liên tục ủy quyền lại ứng dụng.

Tóm lại, **sử dụng access tokens ngắn hạn mà không có refresh tokens khi:**
- bạn muốn bảo vệ tốt nhất trước nguy cơ rò rỉ access tokens
- bạn muốn buộc người dùng nhận thức được quyền truy cập của bên thứ ba mà họ đang cấp
- bạn không muốn ứng dụng của bên thứ ba có quyền truy cập ngoại tuyến vào dữ liệu của người dùng

## Access tokens không hết hạn
Access tokens không hết hạn là phương pháp dễ nhất cho nhà phát triển. Nếu bạn chọn tùy chọn này, điều quan trọng là phải xem xét sự đánh đổi mà bạn đang thực hiện.

Nó sẽ không phù hợp khi sử dụng access tokens tự mã hóa nếu bạn muốn có thể thu hồi chúng tùy ý. Như vậy, bạn sẽ cần lưu trữ các access tokens này trong một số loại cơ sở dữ liệu để chúng có thể bị xóa hoặc đánh dấu là không hợp lệ khi cần.

Lưu ý rằng ngay cả khi dịch vụ có ý định phát hành access tokens không hết hạn cho các trường hợp sử dụng bình thường, bạn vẫn sẽ cần cung cấp cơ chế để hết hạn trong các trường hợp đặc biệt, chẳng hạn như nếu người dùng rõ ràng muốn thu hồi quyền truy cập của ứng dụng hoặc nếu tài khoản người dùng bị xóa.

Các access tokens không hết hạn giúp các nhà phát triển dễ dàng hơn nhiều để thử nghiệm các ứng dụng của riêng họ. Bạn thậm chí có thể tạo trước một hoặc nhiều access tokens không hết hạn cho nhà phát triển và hiển thị cho họ trên màn hình chi tiết ứng dụng. Bằng cách này, họ có thể ngay lập tức bắt đầu thực hiện các API request bằng access tokens đó và không cần bận tâm về việc thiết lập luồng OAuth chỉ để test API của bạn.

Tóm cái váy lại, **sử dụng access tokens không hết hạn khi:**
- bạn có cơ chế thu hồi access tokens tùy ý
- bạn không có rủi ro lớn nếu access tokens bị rò rỉ
- bạn muốn cung cấp một cơ chế xác thực dễ dàng cho các nhà phát triển của bạn
- bạn muốn các ứng dụng của bên thứ ba có quyền truy cập ngoại tuyến vào dữ liệu của người dùng

*Tham khảo: https://www.oauth.com/oauth2-servers/access-tokens/access-token-lifetime/*
