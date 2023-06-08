import { ScrollView, Text } from '@tarojs/components';
import React, { Fragment, useEffect, useImperativeHandle } from 'react';
import { useSetState, useRequest } from 'ahooks';
import { Empty } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const InfiniteUlStyle = {
  height: '100vh',
  width: '100%',
  padding: '0',
  overflowY: 'auto',
  overflowX: 'hidden',
};

export default React.forwardRef(({ request, params, style, renderList }, ref) => {
  const [state, setState] = useSetState({
    pageNum: 1,
    pageSize: 20,
    dataSource: [],
    total: 0,
    refreshHasMore: false,
  });
  const { pageNum, pageSize, dataSource, total, refreshHasMore } = state;

  const { run, loading } = useRequest(request, {
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
    refresh();
  }, [params]);

  // 上拉加载更多
  const loadMore = () => {
    if (dataSource.length < total) {
      setState({ pageNum: pageNum + 1 });
      Taro.showLoading({ title: '加载中...', mask: true });
      run({
        pageNum: pageNum,
        pageSize: pageSize,
        ...params,
      });
    }
  };

  // 下拉刷新
  const refresh = () => {
    setState({ pageNum: 1, dataSource: [] });
    Taro.showLoading({ title: '加载中...', mask: true });
    run({
      pageNum: pageNum,
      pageSize: pageSize,
      ...params,
    });
  };

  useImperativeHandle(ref, () => {
    return {
      refresh: refresh,
    };
  });
  return (
    <ScrollView
      style={InfiniteUlStyle}
      scrollY
      scrollWithAnimation
      refresherEnabled
      lowerThreshold={50}
      refresherTriggered={loading}
      onScrollToLower={loadMore}
      onRefresherRefresh={refresh}
      {...style}
    >
      {dataSource.length === 0 ? (
        <Empty style={{ background: 'F5F5F5' }} description="暂无数据" />
      ) : (
        <Fragment>
          {renderList?.(dataSource)}
          {refreshHasMore && <Text>无更多数据</Text>}
        </Fragment>
      )}
    </ScrollView>
  );
});
