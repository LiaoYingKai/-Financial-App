import React, { useMemo } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Assets } from '@/lib/core';
import { toCurrency } from '@/lib/currency';

type AssetsListProps = {
  dataSource?: Assets[];
};

const AssetsList: React.FC<AssetsListProps> = ({ dataSource }) => {
  const groupedData = useMemo(
    () =>
      dataSource?.reduce<Assets[][]>((acc, _, index) => {
        if (index % 12 === 0) {
          acc.push(dataSource.slice(index, index + 12));
        }
        return acc;
      }, []) || [],
    [dataSource]
  );

  const renderData = (data: Assets) => {
    return (
      <div key={data.month} className="flex items-center gap-4 w-full">
        <div className="w-20">第 {data.month} 個月</div>
        <div className="flex-1">總資產：{toCurrency(data.totalAssets)}</div>
        <div className="flex-1">儲蓄金額：{toCurrency(data.totalSavings)}</div>
        <div className="flex-1">
          投資金額：{toCurrency(data.totalInvestments)}
        </div>
      </div>
    );
  };

  if (groupedData.length === 0) {
    return 'no data';
  }

  return (
    <Accordion type="single" collapsible>
      {groupedData.map((group, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>
            {renderData(group[group.length - 1])}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 px-2">{group.map(renderData)}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AssetsList;
