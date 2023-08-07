
const currencyFormater = new Intl.NumberFormat(undefined , 
    {
        currency:"USD" ,
        style: "currency"
    })
const FormatCurrency = (number) => {
  return (
    currencyFormater.format(number)
  );
}

export default FormatCurrency;
