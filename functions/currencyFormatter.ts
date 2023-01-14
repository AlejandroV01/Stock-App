interface Props {
  value: number | string;
  currency?: string;
  locale?: string;
  maximumSignificantDigits?: number;
  maximumFractionDigits?: number;
}

const currencyFormatter = ({
  value,
  currency = "USD",
  locale = "en-US",
  maximumSignificantDigits,
  maximumFractionDigits = 3,
}: Props): string => {
  const floatValue = typeof value === "string" ? parseFloat(value) : value;

  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    maximumSignificantDigits,
  }).format(floatValue);

  return formattedValue;
};

export default currencyFormatter;
