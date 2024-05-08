import { Badge, BadgeLogo, BadgeText } from "./Badge";

const pancakeSwapLogo = "https://riposoconcept.com/wp-content/uploads/2024/04/BST-Trading-logo-01.png";

interface PancakeSwapBadgeProps {
  whiteText?: boolean;
  compact?: boolean;
}

export const PancakeSwapBadge: React.FC<React.PropsWithChildren<PancakeSwapBadgeProps>> = ({ whiteText, compact }) => {
  return (
    <Badge
      logo={<BadgeLogo src={pancakeSwapLogo} alt="pancakeSwapLogo" />}
      text={compact ? null : <BadgeText color={whiteText ? "#ffffff" : "#090909"}>PancakeSwap</BadgeText>}
    />
  );
};
