# Aura - Social Networking App
<div align="center">
  <img width="19%" alt="Image 1" src="https://github.com/user-attachments/assets/1af56595-761d-43d6-8374-9133134f14e0" />
  <img width="19%" alt="Image 2" src="https://github.com/user-attachments/assets/ea2a6d87-569f-42f0-921b-8b0ede164524" />
  <img width="19%" alt="Image 3" src="https://github.com/user-attachments/assets/68956eb9-262c-4cdc-bd73-0c78b242c13e" />
  <img width="19%" alt="Image 4" src="https://github.com/user-attachments/assets/3f577915-cf5c-4f33-8d83-5ee6cf5cdf77" />
  <img width="19%" alt="Image 5" src="https://github.com/user-attachments/assets/431a0ac9-0555-424c-a864-89f3ee6b6315" />
</div>
## Mô tả dự án

Aura là một ứng dụng mạng xã hội di động được xây dựng bằng Next.js, cho phép người dùng kết nối với bạn bè trong một trải nghiệm xã hội hiện đại và đẹp mắt. Ứng dụng bao gồm các tính năng như xem story, đăng bài, chat, tìm kiếm, và thông báo.

## Công nghệ sử dụng

- **Framework**: Next.js 16.2.0
- **Ngôn ngữ**: TypeScript
- **UI Components**: Radix UI (shadcn/ui)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Theme**: Next Themes
- **Fonts**: Plus Jakarta Sans, Geist Mono
- **Analytics**: Vercel Analytics

## Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js (phiên bản 18 trở lên)
- npm hoặc yarn

### Cài đặt dependencies

```bash
npm install
```

### Chạy ứng dụng ở chế độ phát triển

```bash
npm run dev
```

Nếu gặp lỗi Turbopack (FATAL: An unexpected Turbopack error occurred), hãy disable Turbopack:

```bash
set NEXT_DISABLE_TURBOPACK=1 && npm run dev
```

Hoặc trên Linux/Mac:

```bash
NEXT_DISABLE_TURBOPACK=1 npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`.

### Build cho production

```bash
npm run build
npm run start
```

### Lint code

```bash
npm run lint
```

## Cấu trúc thư mục

```
/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Trang chính
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── mobile-shell.tsx  # Shell chính cho mobile
│   ├── app-header.tsx    # Header của app
│   ├── bottom-navigation.tsx # Navigation dưới
│   ├── post-feed.tsx     # Feed bài đăng
│   ├── chat-screen.tsx   # Màn hình chat
│   └── ...               # Các component khác
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── public/               # Static assets
│   ├── avatars/          # Avatar images
│   └── posts/            # Post images
└── styles/               # Additional styles
```

## Tính năng chính

- **Home Feed**: Xem story và bài đăng từ bạn bè
- **Stories**: Tạo và xem stories
- **Posts**: Đăng và tương tác với bài viết
- **Chat**: Nhắn tin với bạn bè
- **Search**: Tìm kiếm người dùng và nội dung
- **Profile**: Quản lý hồ sơ cá nhân
- **Notifications**: Thông báo hoạt động
- **Dark/Light Theme**: Chuyển đổi giao diện sáng/tối

## Đưa lên GitHub

1. Tạo repository mới trên GitHub (không tạo README)

2. Thêm remote origin:

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
```

3. Push lên GitHub:

```bash
git push -u origin main
```

## Đóng góp

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## Giấy phép

Dự án này sử dụng giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.