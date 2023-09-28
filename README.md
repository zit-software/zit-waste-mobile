# ZIT WASTE MOBILE

## Cài đặt

### Môi trường

-   Nodejs 18+ (https://nodejs.org/en/ hoặc https://github.com/nvm-sh/nvm)
-   npm 9+

### Biến môi trường

Sao chép file `.env.example` và đổi tên thành `.env.local`

```sh
cp .env.example .env.local
```

Các biến môi trường:

| Tên                 | Giải thích       | Mặc định              |
| ------------------- | ---------------- | --------------------- |
| EXPO_PUBLIC_API_URL | Địa chỉ host API | http://localhost:8080 |

> Một máy chủ đã được deploy sẵn ở địa chỉ https://zitwasteapi.azurewebsites.net. Tuy nhiên có thể phải đợi một lúc khi kết nôi lần đầu để máy chủ khởi động.

### Dev

Để chạy ứng dụng trong chế độ development, chạy lệnh sau:

```sh
npm start
```

Hoặc (nếu muốn test qua mạng bằng ứng dụng Expo Go)

```sh
npm start -- --go
```

> Tải ứng dụng Expo Go tại https://expo.io/client

Lưu ý: nếu bạn không phải thành viên của zitsoftware trên expo.dev. Hãy xóa file `app.json` để expo cli tự gen ra file khác.

### Build

#### Eas cli

Tham khảo: https://docs.expo.dev/eas-update/introduction/

-   Cài đặt eas cli

    ```sh
    npm i -g eas-cli
    ```

-   Đăng nhập vào tài khoản expo
    ```sh
    eas login
    ```
-   Build

    ```sh
    eas build
    ```

    Mặc định sẽ sử dụng máy chủ của expo để build điều này có thể dẫn đến việc phải đợi khá lâu. Để build ở local, chạy lệnh sau:

    ```sh
    eas build --local
    ```

### React native cli

Tham khảo: https://reactnative.dev/docs/environment-setup

-   Prebuild

    ```sh
    npx expo prebuild
    ```

-   Build

    ```sh
    npx react-native buil-android
    ```
