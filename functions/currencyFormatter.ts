interface Props {
  value: number | string;
  currency?: string;
  locale?: string;
  maximumSignificantDigits?: number;
  maximumFractionDigits?: number;
  approximate?: boolean;
}

const currencyFormatter = ({
  value,
  currency = "USD",
  locale = "en-US",
  maximumSignificantDigits,
  maximumFractionDigits = 3,
  approximate = false,
}: Props): string => {
  const floatValue = typeof value === "string" ? parseFloat(value) : value;

  if (Number.isNaN(floatValue)) return "--";

  const formattedValue = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
    maximumSignificantDigits,
  }).format(floatValue);

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const approximatedValue = lookup
    .slice()
    .reverse()
    .find((item) => {
      return floatValue >= item.value;
    });

  if (approximate) {
    return approximatedValue
      ? (floatValue / approximatedValue.value).toFixed(2).replace(rx, "$1") +
          approximatedValue.symbol
      : "0";
  }

  return formattedValue;
};

export default currencyFormatter;
