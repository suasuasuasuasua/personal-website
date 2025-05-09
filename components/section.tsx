type Props = {
  title: string;
  children: React.ReactNode;
};

export default function Section({ title, children }: Props) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <ul>{children}</ul>
    </div>
  );
}
