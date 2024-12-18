import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AssetsList from '@/components/AssetsList';
import FormCalendar from '@/components/FormCalendar';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Assets, calculateSemiAnnualCompoundAssets } from '@/lib/core';

const FormSchema = z.object({
  birthday: z.date(),
  startDate: z.date(),
  retirementAge: z.string(),
  monthlySavings: z.string(),
  monthlyInvestment: z.string(),
  annualReturnRate: z.string(),
});

function App() {
  const [result, setResult] = useState<Assets[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      birthday: new Date(),
      startDate: new Date(),
      retirementAge: '65',
      monthlySavings: '1000',
      monthlyInvestment: '1000',
      annualReturnRate: '5',
    },
  });

  const getAge = (birthday: Date, currentDate: Date): number => {
    const birthYear = birthday.getFullYear();
    const birthMonth = birthday.getMonth();
    const birthDay = birthday.getDate();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    let age = currentYear - birthYear;

    // 如果當前日期在生日之前，則年齡減一
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      age--;
    }

    return age;
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const age = getAge(data.birthday, data.startDate);
    setResult(
      calculateSemiAnnualCompoundAssets(
        age,
        parseInt(data.retirementAge),
        parseInt(data.monthlySavings),
        parseInt(data.monthlyInvestment),
        parseInt(data.annualReturnRate)
      )
    );
  };

  return (
    <Layout>
      <div className="w-full h-full flex items-start justify-center gap-6  max-w-screen-xl mx-auto px-4">
        <div className="w-96 flex-shrink-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormCalendar
                    value={field.value}
                    onChange={field.onChange}
                    label="生日"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormCalendar
                    value={field.value}
                    onChange={field.onChange}
                    label="開始投資日期"
                  />
                )}
              />

              <FormField
                control={form.control}
                name="retirementAge"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      退休年齡
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="65" {...field} />
                    </FormControl>
                    歲
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthlySavings"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      每月儲蓄金額
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    元
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyInvestment"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      每月投資金額
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="1000" {...field} />
                    </FormControl>
                    元
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualReturnRate"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel className="flex-shrink-0 w-24">
                      年化報酬率
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="5" {...field} />
                    </FormControl>
                    %
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="flex-1 overflow-y-scroll h-[calc(100vh-100px)]">
          <AssetsList dataSource={result} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
