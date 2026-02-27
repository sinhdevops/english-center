import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "vi"],
    defaultLocale: "en",
    localePrefix: "as-needed",
    pathnames: {
        // App
        "/": "/",
        "/about": {
            en: "/about",
            vi: "/ve-chung-toi",
        },
        // "/contact": {
        //     en: "/contact",
        //     vi: "/lien-he",
        // },
        "/privacy-policy": {
            en: "/privacy-policy",
            vi: "/chinh-sach-rieng-tu",
        },
        "/terms-and-condition": {
            en: "/terms-and-condition",
            vi: "/dieu-khoan-dieu-kien",
        },
        "/profile": {
            en: "/profile",
            vi: "/thong-tin-ca-nhan",
        },
        "/post": {
            en: "/post",
            vi: "/bai-viet",
        },
        "/post/[slug]": {
            en: "/post/[slug]",
            vi: "/bai-viet/[slug]",
        },
    },
});
