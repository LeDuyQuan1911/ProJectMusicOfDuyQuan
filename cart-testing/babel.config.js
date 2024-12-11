module.exports = {
    presets: [
      '@babel/preset-env', // Chuyển đổi mã ES6 trở về mã tương thích với môi trường hiện tại
      '@babel/preset-react' // Nếu bạn đang sử dụng React
    ],
    plugins: [
      '@babel/plugin-transform-modules-commonjs' // Đảm bảo module ES6 được chuyển đổi sang CommonJS
    ]
  };
  