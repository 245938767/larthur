import { getPostCurrentTotalNum } from '@/api/postsApi';
import { AtomIcon } from '@/assets';

import { Container } from '@/components/ui/Container';
import {
  DataGrowthCard,
  DataGrowthCardContent,
  DataGrowthCardFooter,
  DataGrowthCardHeader,
  DataGrowthCardIcon,
  DataGrowthCardTitle,
} from '@/components/ui/DataGrowthCard';

export default async function Dashboard() {
  const { currentMonthCount, lastMonthCount } = await getPostCurrentTotalNum();
  return (
    <Container className="mt-10">
      <div className="flex">
        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Site Visits</DataGrowthCardTitle>
            <DataGrowthCardIcon>
              <AtomIcon />
            </DataGrowthCardIcon>
          </DataGrowthCardHeader>
          <DataGrowthCardContent>+1000</DataGrowthCardContent>
          <DataGrowthCardFooter>0%&ensp;from last month</DataGrowthCardFooter>
        </DataGrowthCard>

        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Article Count</DataGrowthCardTitle>
            <DataGrowthCardIcon>
              <AtomIcon />
            </DataGrowthCardIcon>
          </DataGrowthCardHeader>
          <DataGrowthCardContent>+{currentMonthCount}</DataGrowthCardContent>
          <DataGrowthCardFooter>
            {((currentMonthCount - lastMonthCount) / currentMonthCount || 0) ??
              0}
            %&ensp;from last month
          </DataGrowthCardFooter>
        </DataGrowthCard>
        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Create project</DataGrowthCardTitle>
            <DataGrowthCardIcon>
              <AtomIcon />
            </DataGrowthCardIcon>
          </DataGrowthCardHeader>
          <DataGrowthCardContent>+1000</DataGrowthCardContent>
          <DataGrowthCardFooter>0%&ensp;from last month</DataGrowthCardFooter>
        </DataGrowthCard>
      </div>
    </Container>
  );
}
