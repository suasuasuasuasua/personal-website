import { IconType } from "react-icons";

export interface ComputerProps {
  [key: string]: {
    specs: ComputerSpecs;
    meta: ComputerMetaProps;
  };
}

interface ComputerSpecs {
  os: {
    icon: IconType;
    name: string;
  };
  cpu: string;
  gpu: string;
  ram: string;
}
interface ComputerMetaProps {
  name: string;
  releaseYear: number; // Date that the device came out into the market
  acquireYear: number; // Date that I personally bought/acquired the device
  description: string;
  usage: Usage;
  link: string;
}

export enum Usage {
  Daily = "daily drive",
  Often = "often",
  Sometimes = "sometimes",
  Rarely = "rarely",
}
