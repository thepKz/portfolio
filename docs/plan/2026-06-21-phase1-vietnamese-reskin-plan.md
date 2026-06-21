---
title: Plan Phase 1 — Việt hóa & Re-skin Portfolio (dev identity)
date: 2026-06-21
status: pending
source: docs/brainstorm/2026-06-21-portfolio-vietnamese-reskin.md
---

# Plan — Phase 1: Việt hóa + Re-skin sang Software Engineer

Mục tiêu: đổi template nhiếp ảnh "Shooote" → portfolio dev **Mai Tan Thep / thepKz**, tiếng Việt, font render đủ dấu, 4 project thật, identity thật. Chỉ thay chữ + đổi font; giữ layout/ảnh placeholder.

---

## Step 0 — Font (CHẶN, làm trước tiên)

**File:** `src/sass/helpers/_variables.scss`
- Line 5: đổi `@import` Google Fonts → thay `Bebas+Neue` bằng `Anton` (Anton có subset vietnamese mặc định).
  - Mới: `family=Anton&family=Newsreader:...&family=Poppins:...`
- Line 11: `$heading-font: "Anton";`

**Verify:** grep `Bebas` toàn repo để chắc không còn ref cứng nào. Build SCSS (Vite tự compile) → mở 1 heading có dấu xem không vỡ.

⚠️ Anton all-caps + tiếng Việt hoa dài → check hero/heading lớn không tràn (Step 8).

---

## Step 1 — Header (`src/components/header/index.tsx`)

- Lines 18-23 menu: `About→Giới thiệu`, `Service→Dịch vụ`, `Work→Dự án`, `Hire Me→Liên hệ` (giữ link `#about/#service/#portfolio/#contact`).
  - ⚠️ Line 174 check `item.title === "Hire Me"` để gắn class `hire-me` → đổi sang so sánh `item.id === 4` hoặc `"Liên hệ"` cho khớp.
- Line 142-143: `"Designer & Photographer"→"Software Engineer"`, `"Based in San Francisco"→"Ha Noi, Viet Nam"`.

## Step 2 — Hero (`src/components/hero/hero.tsx`)

- Line 26 `"Shoot"` → **"Minthep"** (đã chốt). Anton size lớn — check không tràn ở Step 8.

## Step 3 — About (`src/components/about/about.tsx`)

- Lines 19-27 `<h2>`: thay 4 dòng bio photography → bio dev (BA + full-stack product builder, Korean Bridge Engineer là điểm khác biệt). Giữ cấu trúc `<br/>` 4 dòng.
  - Bản nháp: "Tôi là kỹ sư phần mềm full-stack / tự design, build và ship sản phẩm thật / từ web, microservices tới mobile / với lợi thế làm hơn 30+ Projects riêng với khách hàng.

## Step 4 — Portfolio data (`src/api/portfolio.tsx`)

- 4 item (giữ nguyên `col`, `image` placeholder, các `singleimage*`):
  1. **Genkikoi** — cat "Full-Stack · Team Lead" — des1 "Nền tảng thú y full-stack." — desc theo content.md. slug `genkikoi`.
  2. **TrustFundMe** (Transparent Charity) — cat "Microservices · Team Lead" — "Hệ thống thiện nguyện minh bạch." slug `trustfundme`.
  3. **Black Hole Magic** — cat "Next.js 15 · GSAP" — "Migrate eSports platform sang Next.js 15." slug `black-hole-magic`.
  4. **StudyBlog** — cat "Solo · Content" — "Blog chia sẻ kiến thức 85k+ views." slug `studyblog`.
- ⚠️ Đổi `slug` → phải khớp route `portfolio-single/:slug`; PortfolioSinglePage sẽ hiện desc cũ → kiểm tra trang single không vỡ (chấp nhận desc tiếng Việt, ảnh placeholder).
- Gắn link GitHub/preview thật ở đâu? Template single page chưa có field link → để Step 9 (optional) hoặc thêm field `github`/`preview` nếu trang single render.

## Step 5 — Services data + section

**`src/api/services.tsx`** (4 item, giữ ảnh):
1. "Phát triển Web Full-Stack" — "React/Next.js + Node/Spring Boot, end-to-end."
2. "Backend & Microservices" — "API Gateway, Spring Cloud, kiến trúc mở rộng."
3. "Mobile (Flutter)" — "App iOS/Android real-time chat & quản lý."
4. "Business Analysis & Bridge" — "Phân tích yêu cầu, cầu nối kỹ thuật Hàn–Việt."
- ⚠️ slug đổi → khớp `service-single/:slug`.

**`src/components/ServiceSection/index.tsx`:**
- Line 54 `"Capture"→"Kiến tạo"`; line 58 `"Storytelling"→"Sản phẩm"`; lines 75-79 `"Let's"/"Work Together"→"Cùng"/"Hợp tác"`; line 87-88 `"With"/"Clients"→"Với"/"Khách hàng"` (hoặc "Đối tác").
- ⚠️ Line 75 dùng `'` (’) — giữ encoding tiếng Việt UTF-8.

## Step 6 — Các section hardcode còn lại (đọc + sửa khi implement)

- **WhyChooseUs** `WhyChooseUsSection.tsx` (lines 21-53 + header 65 + marquee 144): 4 điểm mạnh dev + "Ship sản phẩm thật" + marquee "Nhận việc remote toàn cầu".
- **Testimonial** `TestimonialSection.tsx` (31-55, header 67): chế 3 quote tiếng Việt (teammate/PM/khách) + tên VN, header "Nhận xét".
- **FAQ** `FaqSection.tsx` (19-56, header 71, intro 78): 6 Q&A dev (nhận dự án, stack, remote, timeline, song ngữ, custom). Header "Hỏi đáp".
- **Contact** `ContactSection.tsx`: heading + 4 placeholder (Họ tên / Email / Số điện thoại / Nội dung) + privacy + email thật.
- **CTA** `CTASection.tsx`: "Start"/"Your Project"→"Bắt đầu"/"Dự án"; mô tả → dev.
- **Footer** `footer/Footer.tsx`: menu, copyright "thepKz" + năm, social GitHub/LinkedIn thật, "Currently Available For Work"→"Đang nhận việc".

## Step 7 — Blog (quyết định)

- `api/blogs.tsx` 5 bài photography. Phương án: **map sang StudyBlog articles** (SE + Japanese learning) HOẶC ẩn link blog ở header/footer nếu không có nội dung. Mặc định: dịch tiêu đề sang chủ đề dev + đổi author/date, giữ route. (Xác nhận lúc implement.)

## Step 8 — Sweep & verify

1. `grep -ri` các chuỗi Anh sót: Photography, Shoot, Clients, San Francisco, "Hire Me", Weddings, Portraits... toàn `src/`.
2. Kiểm tra `lang` trong `index.html` → đổi `lang="vi"`.
3. `npm run build` pass (không TS error).
4. Chạy dev, check responsive: hero Anton + heading có dấu không vỡ/không tràn mobile.
5. Click 1 project-single + service-single không crash.

## Step 9 — (Optional, nhỏ) Link thật cho project

- Nếu PortfolioSinglePage có chỗ render link → thêm field `github`/`preview` vào `PortfolioItem` + data. Nếu không, để Future.

---

## Thứ tự thực thi
0 (font) → 8.1-8.2 (lang/grep baseline) → 1→2→3→4→5→6→7 → 8 (verify đầy đủ).

## Định nghĩa "xong" Phase 1
- [ ] Font Anton, heading có dấu không vỡ.
- [ ] 0 chuỗi Anh user-facing sót (grep sạch).
- [ ] 4 project + 4 service thật, tiếng Việt.
- [ ] Identity thật đồng nhất (tên/email/social/brand).
- [ ] `npm run build` pass; single pages không crash; responsive ổn.
