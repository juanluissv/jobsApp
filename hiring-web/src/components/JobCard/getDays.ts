import { differenceInDays, differenceInHours } from 'date-fns';

export default function getDays(date: string): number {
  const [year, month, day]: number[] = date.split('-').map((f) => Number(f));

  return (
    Math.floor(
      differenceInHours(new Date(year, month - 1, day), new Date()) / 24
    ) + 1
  );
}

// differenceInDays(new Date(year, month - 1, day), new Date())
