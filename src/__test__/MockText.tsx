import { Locators } from "./constants";
import * as React from 'react';

const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => <span data-testid={Locators.TEXT}>{children}</span>;

export default Text;
