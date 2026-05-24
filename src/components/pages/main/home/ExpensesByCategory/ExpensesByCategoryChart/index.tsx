import { PieChart, pieDataItem } from 'react-native-gifted-charts';

type Props = {
  data: pieDataItem[];
};

const ExpensesByCategoryChart = ({ data }: Props) => {
  return <PieChart data={data} radius={60} />;
};

export default ExpensesByCategoryChart;
