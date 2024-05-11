import styles from './index.module.scss';

interface TagProps {
  title: string;
  color: string;
}

export function Tags({ title, color }: TagProps) {
  return (
    <div className={styles['tag']} style={{ background: `${color}` }}>
      {title}
    </div>
  );
}
