'use client';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import BasicTabs from '@/components/BasicTabs';

export default function Page() {
  const [date, setDate] = useState<Dayjs>(dayjs());
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        width: '65%',
        maxWidth: '500px',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Basic date picker"
            format="DD/MM/YYYY"
            value={date}
            onChange={(newDate) => setDate(dayjs(newDate))}
          />
        </DemoContainer>
      </LocalizationProvider>
      <BasicTabs />
    </main>
  );
}
