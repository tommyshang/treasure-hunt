const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const formatPrice = (price) => priceFormatter.format(price);

export default formatPrice;
