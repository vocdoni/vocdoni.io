import { usePageContext } from "vike-react/usePageContext";
import { cn } from "@/lib/utils";

export function Link({ href, children }: { href: string; children: string }) {
  const pageContext = usePageContext();
  const { urlPathname } = pageContext;
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
  return (
    <a
      href={href}
      className={cn(
        "text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline",
        isActive && "text-primary font-medium",
      )}
    >
      {children}
    </a>
  );
}
