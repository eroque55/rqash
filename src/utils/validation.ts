import { addYears, isValid, parse, subYears } from 'date-fns';

export const validateDate = (
  date: string,
  minimumDate?: Date,
  maximumDate?: Date,
): boolean => {
  if (!date || !date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
    return false;
  }

  const parsedDate = parse(date, 'dd/MM/yyyy', new Date());

  if (!isValid(parsedDate)) {
    return false;
  }

  const minDate = minimumDate || subYears(new Date(), 100);
  const maxDate = maximumDate || addYears(new Date(), 100);

  if (parsedDate <= minDate) {
    return false;
  }

  if (parsedDate >= maxDate) {
    return false;
  }

  return true;
};
