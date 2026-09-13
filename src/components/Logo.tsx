import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="RM Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}
