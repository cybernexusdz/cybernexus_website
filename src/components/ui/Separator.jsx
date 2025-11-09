export default function Separator({ className = "my-10" }) {
  return (
    <div
      className={`h-1 w-full rounded-full bg-secondary opacity-50 ${className}`}
    ></div>
  );
}
