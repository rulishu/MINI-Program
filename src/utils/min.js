import Taro from '@tarojs/taro';
// 最低价
export const min = (data) => {
  const datas = data?.filter((vel) => {
    return vel.price !== 0;
  });
  let str =
    datas?.reduce((prev, current) => {
      if (current?.membershipPrice) {
        if (current?.membershipPrice < prev) {
          return current?.membershipPrice;
        } else {
          return prev;
        }
      } else {
        if (current?.activityStock < prev) {
          return current?.activityStock;
        } else {
          return prev;
        }
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
  let price = sma?.replace('¥', '');
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

// js 截取url参数
export function getRequest(item) {
  if (item.indexOf('?') != -1) {
    //判断是否有参数
    let str = item.substr(1);
    //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
    let strs = str.split('=');
    //用等号进行分隔
    //（因为知道只有一个参数 所以直接用等号进分隔
    //如果有多个参数 要用&号分隔 再用等号进行分隔）
    return strs[1];
    //直接弹出第一个参数 （如果有多个参数 还要进行循环的）
  }
}

// 获取当前时间
export const getCurTimes = () => {
  const nowDate = new Date();
  const date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate(),
  };
  const newmonth = date.month < 10 ? '0' + date.month : date.month;
  const day = date.date > 10 ? date.date : '0' + date.date;
  const hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
  const mm = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
  const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
  return date.year + '-' + newmonth + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
};

// 时间格式转化
export function changeStr(data) {
  if (data < 10) {
    return '0' + data;
  } else {
    return data;
  }
}

export function changeDate(date) {
  if (date) {
    const d = new Date(date);
    return changeStr(d.getMonth() + 1) + '月/' + d.getFullYear();
  }
}

// 转base64
export const fileToBase64 = (filePath) => {
  return new Promise((resolve) => {
    let fileManager = Taro.getFileSystemManager();
    fileManager.readFile({
      filePath,
      encoding: 'base64',
      success: (e) => {
        resolve(`data:image/jpg;base64,${e.data}`);
      },
      fail: () => {
        return;
      },
    });
  });
};
