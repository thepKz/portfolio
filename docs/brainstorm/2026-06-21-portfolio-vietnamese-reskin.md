---
title: Re-skin Portfolio sang Tiếng Việt + Dev Identity (Mai Tan Thep / thepKz)
date: 2026-06-21
status: brainstorm-complete
---

# Brainstorm — Việt hóa & Re-skin Portfolio sang Software Engineer

## 1. Problem statement

Template hiện tại = portfolio **NHIẾP ẢNH GIA** ("Shooote", San Francisco), **toàn tiếng Anh**, content hardcode + data file. Mục tiêu:

1. Đổi toàn bộ content sang **thông tin thật của Mai Tan Thep** (brand `thepKz`, `minthep.com`, Ha Noi) — định vị **Software Engineer / full-stack product builder**.
2. **Dịch sang tiếng Việt**, đảm bảo font render đủ dấu.
3. Chỉ thay chữ; thiếu thì chế thêm cho khớp ngữ cảnh dev.

## 2. Phát hiện CHẶN (critical)

**Font heading `Bebas Neue` KHÔNG có subset `vietnamese`.** Mọi `h1-h6` dùng nó → dấu (ầ, ề, ỹ, ơ...) sẽ vỡ / fallback gãy giữa chữ.
- `Poppins` (body) ✅ có vietnamese.
- `Newsreader` (serif phụ) ✅ có vietnamese.
- Fix tại 1 chỗ: `src/sass/helpers/_variables.scss` line 5 (`@import`) + line 11 (`$heading-font`).

## 3. Quyết định đã chốt (qua AskUserQuestion)

| Vấn đề | Lựa chọn |
|--------|----------|
| Font heading | **Đổi `Bebas Neue` → `Anton`** (condensed/all-caps/heavy, drop-in ~1:1, có vietnamese) |
| Phạm vi | **Re-skin TOÀN BỘ** sang dev (không thêm section mới ở phase này) |
| Projects | **4 project mạnh nhất** vào grid 4-slot, **giữ ảnh placeholder**, gắn link GitHub/preview thật |
| Ngôn ngữ | **Tiếng Việt** toàn bộ |

## 4. Mapping content (template → mới)

Tất cả content nằm ở: hardcoded JSX HOẶC `src/api/*.tsx`. Không có i18n/backend → sửa trực tiếp.

| Section | File | Đổi thành |
|---------|------|-----------|
| Header menu | `header/index.tsx:18` | Giới thiệu / Kỹ năng / Dự án / Liên hệ. Tagline → "Software Engineer · Ha Noi" |
| Hero | `hero/hero.tsx:26` | "Shoot" → từ-khóa lớn (vd "Build" / "Ship" / tên) |
| About | `about/about.tsx:19` | Bio dev (BA + full-stack, Korean Bridge Engineer là differentiator) |
| Portfolio (4) | `api/portfolio.tsx` | Genkikoi, TrustFundMe (Transparent Charity), Black Hole Magic, StudyBlog — title/category/desc + slug + link thật |
| Service (4) | `api/services.tsx` | Full-stack Web, Backend/Microservices, Mobile (Flutter), Business Analysis / Bridge |
| Why Choose Us (4) | `WhyChooseUsSection.tsx:21` | 4 điểm mạnh dev (ship thật, microservices, song ngữ Hàn, on-time) |
| Testimonial (3) | `TestimonialSection.tsx:31` | Chế 3 quote hợp ngữ cảnh (teammate/PM/client) — tiếng Việt |
| FAQ (6) | `FaqSection.tsx:19` | 6 câu hỏi dev (nhận dự án thế nào, stack, remote, timeline...) |
| Contact | `ContactSection/*.tsx` | Heading + placeholder + privacy → tiếng Việt; email thật |
| CTA | `CTASection.tsx` | "Bắt đầu dự án" thay vì photography |
| Footer | `footer/Footer.tsx` | Brand `thepKz`, copyright năm, social thật (GitHub/LinkedIn), "Đang nhận việc" |
| Blog (nếu để) | `api/blogs.tsx` | StudyBlog articles HOẶC ẩn route blog |

**Identity thật để nhúng:** Mai Tan Thep · `thepKz` · minthep.com · Ha Noi · maitanthepmrthep@gmail.com · github.com/thepKz · linkedin.com/in/thepmaitan26 · FPT University SE GPA 8.1 · FPT Software (Korean Bridge Engineer) · EN B2 / Korean TOPIK II.

## 5. Approaches đã cân nhắc

- **A. Sửa trực tiếp inline + data file (CHỌN)** — KISS, đúng cấu trúc hiện có, không over-engineer. YAGNI: chưa cần i18n.
- **B. Thêm lớp i18n (react-i18next) + tách content ra JSON** — over-engineering cho portfolio 1 ngôn ngữ. ❌
- **C. Chỉ dịch giữ concept photography** — ❌ nội dung nói "photography" không khớp dev, vô lý.

## 6. Rủi ro & lưu ý

- ⚠️ **Bilingual leftover**: dễ sót chữ Anh rải rác (button, placeholder, alt, aria-label) → cần sweep grep cuối.
- ⚠️ **Anton là all-caps display** → tiếng Việt viết hoa dài (vd "KỸ SƯ PHẦN MỀM") có thể tràn dòng ở hero size lớn → check responsive.
- ⚠️ **Ảnh placeholder** vẫn là ảnh nhiếp ảnh/người → hơi lệch dev. Chấp nhận tạm, swap sau (đổi `src` only).
- ⚠️ **Blog section** (5 bài photography) — nếu không có nội dung dev thật, nên ẩn route hoặc map sang StudyBlog articles, tránh để placeholder lạc đề.
- ⚠️ Project "Black Hole Magic" chính là kiểu template này (Next.js + GSAP migration) → có thể nhấn mạnh như meta-credential.
- ✅ Section thiếu (Tech Skills / Education / Experience / Certs) **để PHASE 2** — đã chốt không làm bây giờ. Khuyến nghị mạnh nên thêm sau vì đây là CV-portfolio dev (xem mục Future).

## 7. Success criteria

- [ ] 0 chữ tiếng Anh sót ở phần user-facing (sau grep sweep).
- [ ] Mọi heading render đủ dấu tiếng Việt (no tofu/fallback).
- [ ] 4 project = project thật + link thật bấm được.
- [ ] Identity (tên/email/social/brand) thật, đồng nhất mọi nơi.
- [ ] Build pass, responsive không tràn chữ ở hero/heading lớn.

## 8. Next steps

1. Đổi font (`_variables.scss`).
2. Sweep & thay content theo bảng mục 4.
3. Grep sweep tiếng Anh sót.
4. Build + check responsive heading.
5. (Phase 2 / Future) thêm section dev + nâng độ "hay" — xem file kế hoạch Future riêng.
