export type IVisaStepsProps = {
  id: string;
  title: string;
  description: string;
};

export interface IVisaProcessProps {
  type: string;
  value: string;
  image: string;
  steps: IVisaStepsProps[];
}
