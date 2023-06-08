// 最低价
export const min = (data) => {
  const datas = data?.filter((vel) => {
    return vel.price !== 0;
  });
  let str =
    datas?.reduce((prev, current) => {
      if (current?.membershipPrice < prev) {
        return current?.membershipPrice;
      } else {
        return prev;
      }
    }, Infinity) || 0;
  if (str === Infinity) {
    return '';
  } else {
    return '¥' + str;
  }
};

// 最高价
export const aPrice = (sma, item) => {
  if (sma === Infinity) {
    return;
  }
  let price = sma?.replace(/[^0-9]/gi, '');
  let str = item
    ?.filter((a) => {
      return a.membershipPrice === Number(price);
    })
    .map((e) => e.referencePrice)
    .flat();
  // js 过滤空值
  let str2 = str?.filter((s) => {
    return s;
  });
  if (str2 === undefined) {
    return;
  }
  // js 最小值
  let str3 = Math.min(...str2);
  if (str3?.length === 0 || str3 === undefined || str3 === Infinity) {
    return;
  } else {
    return '¥' + str3?.toString();
  }
};
