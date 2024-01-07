import {
  DataGrowthCard,
  DataGrowthCardDescription,
  DataGrowthCardHeader,
  DataGrowthCardTitle,
} from '@/components/ui/DataGrowthCard';

export default function Dashboard() {
  return (
    <div>
      <div className="flex">
        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Create project</DataGrowthCardTitle>
            <DataGrowthCardDescription>
              Deploy your new project in one-click.
            </DataGrowthCardDescription>
          </DataGrowthCardHeader>
        </DataGrowthCard>

        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Create project</DataGrowthCardTitle>
            <DataGrowthCardDescription>
              Deploy your new project in one-click.
            </DataGrowthCardDescription>
          </DataGrowthCardHeader>
        </DataGrowthCard>
        <DataGrowthCard className="m-4 w-[350px]">
          <DataGrowthCardHeader>
            <DataGrowthCardTitle>Create project</DataGrowthCardTitle>
            <DataGrowthCardDescription>
              Deploy your new project in one-click.
            </DataGrowthCardDescription>
          </DataGrowthCardHeader>
        </DataGrowthCard>
      </div>
    </div>
  );
}
