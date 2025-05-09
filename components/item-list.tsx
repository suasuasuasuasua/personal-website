type Props<T> = {
  items: Record<string, T>;
  renderItem: (item: T, key: string) => React.ReactNode;
  className?: string;
};

export default function ItemList<T>({
  items,
  renderItem,
  className = "",
}: Props<T>) {
  return (
    <ul className={className}>
      {Object.entries(items).map(([key, item]) => (
        <li key={key}>{renderItem(item, key)}</li>
      ))}
    </ul>
  );
}
