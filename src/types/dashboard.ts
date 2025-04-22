export type WidgetSize = 'small' | 'medium' | 'large';
export type WidgetType = 'create' | 'chart' | 'map' | 'trend' | 'feed';

export interface Widget {
    id: string;
    title: string;
    type: WidgetType;
    size: WidgetSize;
}
