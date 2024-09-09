import type { SidebarNavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
	name: "CA Productivity Portal",
	description:
		"CAの従業員向け生産性ポータル。最新の開発ツールやベストプラクティスを紹介し、業務効率の向上をサポートします。",
	url: "https://astro-nomy.vercel.app",
	ogImage: "https://astro-nomy.vercel.app/og.jpg",
	links: {
		twitter: "x.com/ca_developers",
		github: "https://github.com/ca-dp/productivity-discovery",
	},
};

// TODO
export const footerLinks: SidebarNavItem[] = [
	/*{
		title: "Company",
		items: [
			{ title: "About", href: "#" },
			{ title: "Enterprise", href: "#" },
			{ title: "Partners", href: "#" },
			{ title: "Jobs", href: "#" },
		],
	},
	{
		title: "Product",
		items: [
			{ title: "Security", href: "#" },
			{ title: "Customization", href: "#" },
			{ title: "Customers", href: "#" },
			{ title: "Changelog", href: "#" },
		],
	},
	{
		title: "Docs",
		items: [
			{ title: "Introduction", href: "#" },
			{ title: "Installation", href: "#" },
			{ title: "Components", href: "#" },
			{ title: "Code Blocks", href: "#" },
		],
	},*/
];
