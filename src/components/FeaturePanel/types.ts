export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'active' | 'disabled';
}

export interface FeaturePanelProps {
  items: FeatureItem[];
  loading?: boolean;
  error?: string;
  onSelect?: (item: FeatureItem) => void;
  initialFilter?: {
    query?: string;
    status?: 'all' | 'active' | 'disabled';
  };
  className?: string;
}
