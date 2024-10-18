import { ReactElement } from "react";

export type RouteProps = {
    children: any
}

export enum RouteType {
    'PRIVATE',
    'PUBLIC'
}

export interface ChildrenRouteElement {
    path: string;
    type: RouteType;
    component: () => Promise<(props: any) => ReactElement | React.ReactNode | null>;
    children?: Partial<ChildrenRouteElement>[];
}