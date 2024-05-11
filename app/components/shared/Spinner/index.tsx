import styles from './index.module.scss';

interface SpinnerProps {
  color: string;
  size: string;
}
export function Spinner({ color, size }: SpinnerProps) {
  const sizeClass = () => {
    switch (size) {
      case 'sm':
        return 'load-sm';
        break;
      default:
        return 'load';
    }
  };
  return (
    <div
      className={styles[sizeClass()]}
      style={{
        border: `5px solid ${color}`,
      }}
    ></div>
  );
}
