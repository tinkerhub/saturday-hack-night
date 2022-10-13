const colors = ['#FC6565', '#527D77', '#FFCE51', '#AD78FF', '#00B3E6', '#FF781E'];

export const getColor = () => colors[Math.floor(Math.random() * (colors.length - 1 + 1)) + 1];
