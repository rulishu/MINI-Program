import { View } from '@tarojs/components';
import React, { useEffect } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Infiniteloading, Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const InfiniteUlStyle = {
  height: '100vh',
  width: '100%',
  padding: '0',
  overflowY: 'auto',
  overflowX: 'hidden',
};

export default ({ request, params, renderItem }) => {
  const [state, setState] = useSetState({
    pageNum: 1,
    pageSize: 20,
    dataSource: [],
    total: 0,
    refreshHasMore: false,
  });
  const { pageNum, pageSize, dataSource, total, refreshHasMore } = state;

  const { run } = useRequest(request, {
    manual: true,
    onSuccess: ({ code, result }) => {
      if (code && code === 200) {
        setState({
          total: result.total, // you had 'result.result' here, changed to 'result.total' assuming 'total' is the correct property name
          dataSource:
            pageNum === 1 ? result.records || [] : [...dataSource, ...(result.records || [])],
          refreshHasMore: pageNum === 1 ? false : [...dataSource, ...data].length === total,
        });
        Taro.hideLoading();
      }
    },
  });

  useEffect(() => {
    setState({ pageNum: 1, dataSource: [] });
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: pageNum,
      pageSize: pageSize,
      ...params,
    });
  }, [params]);

  // 上拉加载更多
  const loadMore = (done) => {
    if (dataSource.length < total) {
      setState({ pageNum: pageNum + 1 });
      done?.();
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: pageNum,
        pageSize: pageSize,
        ...params,
      });
    }
  };

  // 下拉刷新
  const refresh = (done) => {
    setState({ pageNum: 1, dataSource: [] });
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: pageNum,
      pageSize: pageSize,
      ...params,
    });
    done?.();
  };

  return (
    <View style={InfiniteUlStyle}>
      <Infiniteloading
        hasMore={refreshHasMore}
        threshold={100}
        isOpenRefresh
        loadTxt="loading"
        onLoadMore={loadMore} // 上拉加载更多
        onRefresh={refresh} // 下拉刷新
        pullIcon={null}
      >
        {dataSource.length === 0 ? (
          <Empty style={{ background: 'F5F5F5' }} description="暂无数据" />
        ) : (
          dataSource.map((item, index) => renderItem(item, index))
        )}
      </Infiniteloading>
    </View>
  );
};
