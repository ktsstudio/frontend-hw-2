import { Locators } from "./constants";

export enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
}
export const Loader: React.FC = () => <div data-testid={Locators.LOADER} />;
