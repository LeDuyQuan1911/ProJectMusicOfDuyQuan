// Import the necessary modules for your tests
import { getSubTotalSelected } from '../../controllers/cartController'; // Đổi đường dẫn theo file của bạn

describe('White-box testing for getSubTotalSelected', () => {
  let album1, album2, container;

  beforeEach(() => {
    // Tạo container giả lập cho các album
    container = document.createElement('div');
    document.body.appendChild(container);

    // Thêm các album giả vào container
    album1 = document.createElement('div');
    album1.classList.add('product-placeholder');
    album1.innerHTML = `
      <input class="quantity-info" value="2">
      <div class="each">$20.00</div>
    `;
    container.appendChild(album1);

    album2 = document.createElement('div');
    album2.classList.add('product-placeholder');
    album2.innerHTML = `
      <input class="quantity-info" value="3">
      <div class="each">$15.00</div>
    `;
    container.appendChild(album2);
  });

  afterEach(() => {
    // Dọn dẹp DOM sau mỗi test
    container.remove();
  });

  it('should calculate correct subtotal for selected albums', () => {
    const albums = [album1, album2];

    const result = getSubTotalSelected(albums);

    // Kiểm tra rằng tổng phụ đúng
    expect(result).toBe(2 * 20.0 + 3 * 15.0); // 40 + 45 = 85
  });

  it('should return 0 when no albums are selected', () => {
    const albums = [];

    const result = getSubTotalSelected(albums);

    // Kiểm tra rằng subtotal là 0 khi không có sản phẩm
    expect(result).toBe(0);
  });

  it('should handle negative quantity values correctly', () => {
    // Sản phẩm với quantity âm
    album1.querySelector('.quantity-info').value = '-2';
    const albums = [album1];

    const result = getSubTotalSelected(albums);

    // Kiểm tra subtotal với quantity âm
    expect(result).toBe(-2 * 20.0); // -40
  });

  it('should handle negative price values correctly', () => {
    // Sản phẩm với price âm
    album1.querySelector('.each').innerHTML = '-$20.00';
    const albums = [album1];

    const result = getSubTotalSelected(albums);

    // Kiểm tra subtotal với price âm
    expect(result).toBe(2 * -20.0); // -40
  });

  it('should return NaN if quantity is not a valid number', () => {
    // Sản phẩm với quantity không hợp lệ
    album1.querySelector('.quantity-info').value = 'not-a-number';
    const albums = [album1];

    const result = getSubTotalSelected(albums);

    // Kiểm tra rằng kết quả là NaN khi quantity không hợp lệ
    expect(result).toBeNaN();
  });

  it('should return NaN if price is not a valid number', () => {
    // Sản phẩm với price không hợp lệ
    album1.querySelector('.each').innerHTML = 'invalid';
    const albums = [album1];

    const result = getSubTotalSelected(albums);

    // Kiểm tra rằng kết quả là NaN khi price không hợp lệ
    expect(result).toBeNaN();
  });

  it('should handle multiple albums and calculate subtotal correctly', () => {
    // Thêm sản phẩm với giá trị hợp lệ
    album1.querySelector('.quantity-info').value = '2';
    album2.querySelector('.quantity-info').value = '3';
    album1.querySelector('.each').innerHTML = '$20.00';
    album2.querySelector('.each').innerHTML = '$15.00';
    
    const albums = [album1, album2];

    const result = getSubTotalSelected(albums);

    // Kiểm tra rằng tổng phụ chính xác
    expect(result).toBe(2 * 20.0 + 3 * 15.0); // 40 + 45 = 85
  });
});
