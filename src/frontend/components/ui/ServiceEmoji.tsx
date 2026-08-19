import { getServiceEmojiUrl } from "@shared/data/services";

type Props = {
  icon: string;
  size?: number;
  alt?: string;
  className?: string;
};

export default function ServiceEmoji({
  icon,
  size = 48,
  alt = "",
  className,
}: Props) {
  return (
    <img
      src={getServiceEmojiUrl(icon)}
      width={size}
      height={size}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
