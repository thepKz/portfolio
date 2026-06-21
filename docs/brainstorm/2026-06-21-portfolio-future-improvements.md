---
title: Kế hoạch nâng độ "hay" cho Portfolio (Future)
date: 2026-06-21
status: future-roadmap
---

# Future Roadmap — Làm web "hay" hơn

Sắp theo **ROI**: impact cao / công thấp lên trước. (YAGNI — không làm hết, chọn theo mục tiêu.)

## Tier 0 — Phải có (bù phần re-skin bỏ qua)

1. **Section còn thiếu cho dev CV-portfolio** (impact CAO):
   - **Tech Skills grid** — group theo Languages / Frameworks / DB-Cloud / DevOps / PM (data đã có sẵn trong `portfolio-content.md`).
   - **Experience timeline** — FPT Software ×2 (Bridge Engineer).
   - **Education** — FPT University SE, GPA 8.1.
   - **Certifications** — 6 cert (Microsoft/LinkedIn/Coursera...).
   - → Đây là thứ nhà tuyển dụng/khách tìm, template photography không có. Nên là việc số 1 sau re-skin.
2. **Ảnh thật / asset đúng ngành**: thay ảnh photography placeholder bằng screenshot project, diagram kiến trúc, avatar thật. Lệch ngành là điểm trừ lớn nhất hiện tại.

## Tier 1 — Quick win, impact cao

3. **SEO + Open Graph + meta**: `<title>`, description tiếng Việt, OG image (preview khi share link), favicon riêng, `lang="vi"`. Cực rẻ, tăng độ "pro" rõ.
4. **Performance/Lighthouse**: lazy-load ảnh, preconnect Google Fonts, `font-display: swap` (đã có), nén ảnh → điểm Lighthouse + tốc độ.
5. **Accessibility pass**: alt tiếng Việt đúng nghĩa, contrast, focus ring, aria — vừa SEO vừa chuyên nghiệp.
6. **Responsive polish**: test heading Anton all-caps trên mobile (dễ tràn), spacing, tap target.

## Tier 2 — Tăng "wow" (impact cao, công vừa)

7. **Scroll-narrative / animation tinh tế**: project đã có GSAP + Lenis. Thêm reveal-on-scroll, parallax nhẹ, stagger — hợp art-direction "Deep Signal" trong content brief. ĐỪNG lạm dụng (KISS) → dễ rối/chậm.
8. **Dark/abyssal theme đúng concept "Deep Signal"** (xem brief trong portfolio-content.md): nền abyssal-blue, signal-emerge sections. Đây là differentiator visual lớn nhất nếu làm tới.
9. **Command palette (Cmd/Ctrl-K)** điều hướng — đúng vibe "product builder", gây ấn tượng với dev/recruiter.

## Tier 3 — Signature (impact rất cao, công CAO — cân nhắc)

10. **ONE 3D hero object** (three / @react-three/fiber, lazy + SSR-safe): iridescent wireframe nod tới "Black Hole Magic". Đây là moment "wow" số 1 trong brief. RỦI RO: nặng, ngốn thời gian, dễ tụt performance mobile → chỉ làm nếu Tier 0-1 đã xong và muốn điểm nhấn thật sự.
11. **Case study pages sâu**: mỗi project 1 trang kể chuyện (problem → kiến trúc → quyết định → kết quả + số liệu). Đây là thứ phân biệt portfolio "đẹp" vs portfolio "thuyết phục được người thuê".

## Tier 4 — Nice-to-have

12. Blog thật (StudyBlog 85k+ views là điểm mạnh — nên dẫn về).
13. Đa ngôn ngữ VI/EN (lúc này mới cần i18n thật — vì bạn là Bridge Engineer, EN/KO là lợi thế).
14. Form contact chạy thật (gửi mail / webhook).
15. Analytics (Vercel / Plausible) để biết ai xem.

## Khuyến nghị thứ tự

**Tier 0 → Tier 1 → chọn 1-2 món Tier 2 → (nếu còn sức) Tier 3 #10 hoặc #11.**

Lý do: portfolio dev được đánh giá trước hết bằng **content thuyết phục + sạch + nhanh + đúng ngành** (Tier 0-1), rồi mới tới hiệu ứng (Tier 2-3). Làm 3D trước khi có content đúng = đẹp mà rỗng.

## Đề xuất kế tiếp

Khi muốn triển khai, chạy `/plan` cho **Phase 1 (re-skin + việt hóa)** trước, ship xong rồi mới mở `/plan` cho Tier 0 sections. Không gộp để tránh PR khổng lồ.
