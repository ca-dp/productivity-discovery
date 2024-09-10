import type * as React from "react";
import { Icon } from '@iconify/react';

import { Badge } from "@/components/ui/badge";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navMenuConfig } from "@/config/nav-menu";
import { Icons } from "@/icons";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";

const links = navMenuConfig.links;
const pages = []; //navMenuConfig.pagesNav[0];
const examples = []; //navMenuConfig.examplesNav[0];

const iconMap = {
	FaCode: 'fa6-solid:code',
	FaPaintBrush: 'fa6-solid:paintbrush',
	FaBriefcase: 'fa6-solid:briefcase',
};

export function MainNavigationMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				{links ? (
					links.map((link) => {
						const iconName = iconMap[link.icon as keyof typeof iconMap];
						return (
							<NavigationMenuItem key={link.title}>
								{link.href ? (
									<a
										href={link.href}
										className={cn(
											navigationMenuTriggerStyle(),
											"flex items-center space-x-2",
											link.color
										)}
										{...(link.forceReload ? { "data-astro-reload": true } : {})}
									>
										<Icon icon={iconName} className="w-4 h-4" />
										<span>{link.title}</span>
										{link.comingSoon && (
											<Badge variant="outline" className="ml-2 text-[0.6rem] px-1 py-0 leading-tight">
												Coming<br />Soon
											</Badge>
										)}
									</a>
								) : (
									<span
										className={cn(
											navigationMenuTriggerStyle(),
											"flex items-center space-x-2 cursor-not-allowed opacity-50",
											link.color
										)}
									>
										<Icon icon={iconName} className="w-4 h-4" />
										<span>{link.title}</span>
										{link.comingSoon && (
											<Badge variant="outline" className="ml-2 text-[0.6rem] px-1 py-0 leading-tight">
												Coming<br />Soon
											</Badge>
										)}
									</span>
								)}
							</NavigationMenuItem>
						);
					})
				) : null}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem: React.FC<MenuItem> = ({
	title,
	href,
	description,
	launched,
	disabled,
	external,
	forceReload,
}) => {
	const target = external ? "_blank" : undefined;

	return (
		<li>
			<a
				target={target}
				href={disabled ? undefined : href}
				{...(forceReload ? { "data-astro-reload": true } : {})}
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					disabled
						? "text-muted-foreground hover:bg-transparent hover:text-muted-foreground"
						: "",
				)}
			>
				<div className="flex items-center text-sm font-medium leading-none">
					<span className="mr-2">{title}</span>
					{disabled ? (
						<Badge
							variant="secondary"
							radius="sm"
							className="h-5 px-1.5 text-xs font-medium"
						>
							SOON
						</Badge>
					) : null}
					{launched ? (
						<Badge
							radius="sm"
							className="h-5 px-1.5 text-xs font-medium bg-[#ebf5ff] hover:bg-[#ebf5ff] text-[#0068d6]"
						>
							NEW
						</Badge>
					) : null}
				</div>
				<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
					{description}
				</p>
			</a>
		</li>
	);
};
ListItem.displayName = "ListItem";
